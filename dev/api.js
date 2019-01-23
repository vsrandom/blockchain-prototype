const express=require('express')
const bodyParser=require('body-parser')
const Blockchain=require('./blockchain')
const bitcoin= new Blockchain();
const uuid=require('uuid')

const nodeAddress=uuid().split('-').join('');

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/blockchain',(req,res)=>{
    res.send(bitcoin)
})

app.post('/transaction',(req,res)=>{
    const blockIndex=bitcoin.createNewTransaction(req.body.amount,
        req.body.sender,req.body.recipent)
    res.json({note:`Transaction will be added in block ${blockIndex}`});    
})


app.get('/mine',(req,res)=>{
    const lastBlock=bitcoin.getLastBlock()  //getting the lastblock of blockchain
    const previousBlockHash=lastBlock['hash'] //this will be the previous hash for our new block which will be mined
    const currentBlockData={
        transactions: bitcoin.pendingTransactions,   //all the pending transactions
        index:lastBlock['index']+1                   //just another parameter, we can add more parameters as well
    }

    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData)  //generating a nonce for this new block to be mined 
    const blockHash=bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce) //its hash is calculated with above calc nonce and hence it must be starting with "0000"
    bitcoin.createNewTransaction(12.5,"00",nodeAddress)  //giving 12.5 bitcoins to the miner of this block
    const newBlock=bitcoin.createNewBlock(nonce,previousBlockHash,blockHash) //mining the newblock
    res.json({
        note:"New Block Mined Sucessfully.",
        block: newBlock
    })

});



app.listen(3000,()=>{
    console.log('Listening on port 3000')
})