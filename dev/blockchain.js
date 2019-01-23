const sha256=require('sha256')


function Blockchain() { 
    this.chain=[]; //all the blocks that will be created will be stored in this array as a chain  
    this.pendingTransactions=[]; //store all the new transactions before they are stored in blocks and mined.
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

Blockchain.prototype.getLastBlock=function(){
    return this.chain[this.chain.length-1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender,recipent){
    const newTransaction={
        amount:amount,
        sender:sender,
        recipent:recipent
    };

    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()['index']+1;

}

Blockchain.prototype.hashBlock=function(previousBlockHash,currentBlockData,nonce){
    const dataAsString=previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash=sha256(dataAsString)
    return hash; 
}




module.exports = Blockchain; //this "Blockchain" is actually the constructor function we are importing
