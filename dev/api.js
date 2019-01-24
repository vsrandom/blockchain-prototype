const express=require('express')
const bodyParser=require('body-parser')
const Blockchain=require('./blockchain')
const bitcoin= new Blockchain();
const uuid=require('uuid')
const nodeAddress=uuid().split('-').join('');
const port=process.argv[2]
const rp=require('request-promise')

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/blockchain',(req,res)=>{
    res.send(bitcoin)
})

app.post('/transaction/broadcast',(req,res)=>{
    const newTransaction=bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipent)
    bitcoin.addTransactionToPendingTransactions(newTransaction)
    //broadcast this transaction to all nodes in the network
    const requestPromises=[]
    bitcoin.networkNodes.forEach(networkNodeUrl=>{
        const requestOptions={
            uri:networkNodeUrl+'/transaction',
            method:'POST',
            body:newTransaction,
            json:true
        }
        requestPromises.push(rp(requestOptions))//pushing all the requests in an array
    })
    //Now running all those requests.
    Promise.all(requestPromises)
    .then(data=>{
        res.json({note:'Transaction created and broadcasted successfully !'})
    })
})


app.post('/transaction',(req,res)=>{
    const newTransaction=req.body
    const blockIndex=bitcoin.addTransactionToPendingTransactions(newTransaction)
    res.json({note:`Transaction will be added in block ${blockIndex}`})    
})
//

app.get('/mine',(req,res)=>{
    const lastBlock=bitcoin.getLastBlock()  //getting the lastblock of blockchain
    const previousBlockHash=lastBlock['hash'] //this will be the previous hash for our new block which will be mined
    const currentBlockData={
        transactions: bitcoin.pendingTransactions,   //all the pending transactions
        index:lastBlock['index']+1                   //just another parameter, we can add more parameters as well
    }

    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData)  //generating a nonce for this new block to be mined 
    const blockHash=bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce) //its hash is calculated with above calc nonce and hence it must be starting with "0000"
    const newBlock=bitcoin.createNewBlock(nonce,previousBlockHash,blockHash) //mining the newblock
    const requestPromises=[]
    bitcoin.networkNodes.forEach(networkNodeUrl=>{
        const requestOptions={
            uri:networkNodeUrl+'/receive-new-block',
            method:'POST',
            body:{ newBlock: newBlock },
            json:true
        }
        //rp(requestOptions) returns a promise and we are storing all these promises in array
        requestPromises.push(rp(requestOptions))
    })
    Promise.all(requestPromises)
    .then(data=>{
        const requestOptions={
            uri:bitcoin.currentNodeUrl+'/transaction/broadcast',
            method:'POST',
            body:{
                amount:12.5,
                sender:"00",
                recipent:nodeAddress
            },
            json:true
        }
        return rp(requestOptions)
    })
    .then(data=>{
        res.json({
            note:"New Block Mined and Broadcasted Sucessfully.",
            block: newBlock
        })
    })
});

app.post('/receive-new-block',(req,res)=>{
    const newBlock=req.body.newBlock
    const lastBlock = bitcoin.getLastBlock();
    const correctHash=lastBlock.hash === newBlock.previousBlockHash
    const correctIndex=lastBlock['index']+1 === newBlock['index']
    if(correctHash && correctIndex){
        bitcoin.chain.push(newBlock)
        bitcoin.pendingTransactions=[]
        res.json({
            note:'New Block recieved and accepted',
            newBlock:newBlock
        })
    }
    else{
        res.json({
            note:'New Block rejected',
            newBlock: newBlock
        })
    }
})

//node which wants to register will hit below end point on any of hosted node,this node
//will broadcast registering node url to all nodes on /register-node endpoint and
//later the parent node will send a request on /register-nodes-bulk endpoint sending list
//of all nodes in blockchain and hence all nodes will be part of decentralised network.

app.post('/register-and-broadcast-node',(req,res)=>{
    const newNodeUrl=req.body.newNodeUrl
    if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1){
        bitcoin.networkNodes.push(newNodeUrl)
    }
    const regNodesPromises=[]
    bitcoin.networkNodes.forEach(networkNodeUrl=>{
        const requestOptions={
            uri:networkNodeUrl+'/register-node',
            method:'POST',
            body:{ newNodeUrl:newNodeUrl },
            json:true
        };
        //basically the below line will be asynchronous since we are making requests to
        //outer nodes and hence we don't know how much time it is going to take and hence,
        //we are putting all the requests in an array and we will later run it    
        regNodesPromises.push(rp(requestOptions))
    })
    //running all the requests are completed we process the data which get returned!
    Promise.all(regNodesPromises)
    .then(data=>{
        const bulkRegisterOptions={
            uri:newNodeUrl+'/register-nodes-bulk',
            method:'POST',
            body: { allNetworkNodes:[...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
            json:true
        }
        return rp(bulkRegisterOptions);
    })
    .then(data=>{
        res.json({note:'New Node registered with Network Sucessfully'})
    })
})

app.post('/register-node',(req,res)=>{
    const newNodeUrl=req.body.newNodeUrl
    const nodeNotAlreadyPresent=bitcoin.networkNodes.indexOf(newNodeUrl) == -1
    const notCurrentNode=bitcoin.currentNodeUrl !== newNodeUrl
    if(nodeNotAlreadyPresent && notCurrentNode){
        bitcoin.networkNodes.push(newNodeUrl)
    }
    res.json({note:'New Node registerred Sucessfully!'})

})

app.post('/register-nodes-bulk',(req,res)=>{
    const allNetworkNodes=req.body.allNetworkNodes
    allNetworkNodes.forEach(networkNodeUrl=>{
        const nodeNotAlreadyPresent=bitcoin.networkNodes.indexOf(networkNodeUrl) == -1
        const notCurrentNode=bitcoin.currentNodeUrl !== networkNodeUrl
        if(nodeNotAlreadyPresent && notCurrentNode){
            bitcoin.networkNodes.push(networkNodeUrl)
        }
    })
    res.json({note:'Bulk Registeration successful !'})
})

//
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})