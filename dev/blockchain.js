const sha256=require('sha256') //hashing function 
const currentNodeUrl=process.argv[3];
const uuid=require('uuid')

function Blockchain() { 
    this.chain=[]; //all the blocks that will be created will be stored in this array as a chain  
    this.pendingTransactions=[]; //store all the new transactions before they are stored in blocks and mined.
    this.currentNodeUrl=currentNodeUrl //now blockchain knows onto which url it is being hsoted on
    //we want each node to know what other nodes are present in the network
    this.networkNodes=[] //url of all nodes in network
    this.createNewBlock(100,'0','0') //Genesis Block with random parameters
}

Blockchain.prototype.createNewBlock=function(nonce,previousBlockHash,hash){
    const newBlock={                       //block to be added to blockchain
        index:this.chain.length+1,
        timestamp:Date.now(),
        transactions:this.pendingTransactions,
        nonce: nonce,  //proof of work related
        hash: hash,   
        previousBlockHash: previousBlockHash
    };

    this.pendingTransactions=[];
    this.chain.push(newBlock);
    return newBlock;
}

//return the last block of blockchain
Blockchain.prototype.getLastBlock=function(){
    return this.chain[this.chain.length-1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender,recipent){
    const newTransaction={
        amount:amount,
        sender:sender,
        recipent:recipent,
        transactionId:uuid().split('-').join('')
    };
    return newTransaction
}


Blockchain.prototype.addTransactionToPendingTransactions=function(transactionObj){
    this.pendingTransactions.push(transactionObj)
    return this.getLastBlock()['index']+1;
}

//this function generates a random string from a block using previos block random string
//current block data(transactions array) and a nonce value
Blockchain.prototype.hashBlock=function(previousBlockHash,currentBlockData,nonce){
    const dataAsString=previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash=sha256(dataAsString)
    return hash; 
}

/*
Note on proof of work:
Now we want that each block in our blockchain should be legit that is the transactions in it
should be legitimate, if it is not legitimate than any one can create fake transactions and fake
no of bitcoins he has. Its the proof of work that makes blockchains like bitcoin, etherium 
so secure. Hence everytime we create a new block we have to make sure it is a legitimate
block by mining it through proof of work. 

So what does proof of work method do?
Basically using previousBlockHash and currentBlockData we keep on changing the nonce value
until we get a string that is something like this "0000FHGHKH.." i.e starting with 4 zeros.

*/

Blockchain.prototype.proofOfWork=function(previousBlockHash,currentBlockData){
    let nonce=0;
    let hash=this.hashBlock(previousBlockHash,currentBlockData,nonce)
    while(hash.substring(0,4)!=='0000'){
        nonce++;
        hash=this.hashBlock(previousBlockHash,currentBlockData,nonce)
    }
    return nonce;
}

Blockchain.prototype.chainIsValid=function(blockchain){
    let validChain=true;
    for(var i=1;i<blockchain.length;i++){
        const currentBlock=blockchain[i];
        const prevBlock=blockchain[i-1]
        const blockHash=this.hashBlock(prevBlock['hash'],{ transactions:currentBlock['transactions'],index:currentBlock['index']},currentBlock['nonce'])
        if(blockHash.substring(0,4)!=='0000'){
            validChain=false;
        }
        if(currentBlock['previousBlockHash'] !== prevBlock['hash']){
            validChain=false;
        }
    };

    //checking if Genesis Block is Valid or Not
    const genesisBlock=blockchain[0]
    const correctNonce=genesisBlock['nonce']===100;
    const correctPreviousBlockHash=genesisBlock['previousBlockHash']==='0'
    const correctHash=genesisBlock['hash']==='0'
    const correctTransactions=genesisBlock['transactions'].length === 0
    if(!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions){
        validChain=fasle;
    }
    return validChain;
}

module.exports = Blockchain; //this "Blockchain" is actually the constructor function we are importing
