const sha256=require('sha256') //hashing function 
const currentNodeUrl=process.argv[3];

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
        recipent:recipent
    };

    this.pendingTransactions.push(newTransaction); //push this new transaction in pending transactions and this transaction will be added to blockchain when a block will be mined.
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

module.exports = Blockchain; //this "Blockchain" is actually the constructor function we are importing
