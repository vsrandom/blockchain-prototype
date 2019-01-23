const Blockchain=require('./blockchain')
const bitcoin = new Blockchain();

const previousBlockHash='FW^RWTUGWVHCGUYDYE*&T&^&&*&'
const nonce=100
const currentBlockData=[
    {
        amount:10,
        sender:'RTR&^&FFVHGHFTGYJG768',
        recipent:'HHSGJSHHS676897979'
    },
    {
        amount:100,
        sender:'RTR&^&FdksnkdG768',
        recipent:'HHSGJdsdsgSHHS676897971'
    },
    {
        amount:1000,
        sender:'RTR&djdfhjhGHFTGYJG768',
        recipent:'HHSGdfjjdhfjhdk676897979'
    }
]



console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce))