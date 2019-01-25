const Blockchain=require('./blockchain')
const bitcoin=new Blockchain()

const bc1={
    "chain": [
    {
    "index": 1,
    "timestamp": 1548410646544,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1548410730840,
    "transactions": [],
    "nonce": 18140,
    "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    "previousBlockHash": "0"
    },
    {
    "index": 3,
    "timestamp": 1548410765308,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipent": "f358b4a7df464b1491d06716ebcd0d77",
    "transactionId": "b10076083a394741bbada947650c454f"
    },
    {
    "amount": 10,
    "sender": "HYFJHFHF5656565658FHFH",
    "recipent": "VFFJFGCHGCHG5656JHFJ",
    "transactionId": "ef24ad65bf874697bd20a153dde5a14b"
    },
    {
    "amount": 20,
    "sender": "HYFJHFHF5656565658FHFH",
    "recipent": "VFFJFGCHGCHG5656JHFJ",
    "transactionId": "132c6bb7f6394443b96e61aa050d581d"
    },
    {
    "amount": 30,
    "sender": "HYFJHFHF5656565658FHFH",
    "recipent": "VFFJFGCHGCHG5656JHFJ",
    "transactionId": "1d07ef0cc799453b81fae205d6f0689e"
    }
    ],
    "nonce": 418933,
    "hash": "0000a9af7611b3bd647f27f26a4e93f7e7f14c160c7e885fe5f7c1856d8d4662",
    "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    "index": 4,
    "timestamp": 1548410816335,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipent": "f358b4a7df464b1491d06716ebcd0d77",
    "transactionId": "76fc9244100940bf9d8c9f080a73cc7f"
    },
    {
    "amount": 40,
    "sender": "HYFJHFHF5656565658FHFH",
    "recipent": "VFFJFGCHGCHG5656JHFJ",
    "transactionId": "cdf0a484dbe44ef3aa473b4de9fcc8b4"
    },
    {
    "amount": 50,
    "sender": "HYFJHFHF5656565658FHFH",
    "recipent": "VFFJFGCHGCHG5656JHFJ",
    "transactionId": "fb8ff35dbc8a4a53aee79317d62c725f"
    },
    {
    "amount": 60,
    "sender": "HYFJHFHF5656565658FHFH",
    "recipent": "VFFJFGCHGCHG5656JHFJ",
    "transactionId": "2a91e8bd7aee4f909d85834195308479"
    }
    ],
    "nonce": 71742,
    "hash": "0000fd58ff2697468f408abb24deb21d75539f2b8af5208052cd21b5b3aaf93c",
    "previousBlockHash": "0000a9af7611b3bd647f27f26a4e93f7e7f14c160c7e885fe5f7c1856d8d4662"
    },
    {
    "index": 5,
    "timestamp": 1548410819917,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipent": "f358b4a7df464b1491d06716ebcd0d77",
    "transactionId": "36c16d6d47b74195803bd88e1d86f717"
    }
    ],
    "nonce": 19337,
    "hash": "000076a5f81f4905b591524eccf25de3e63378c0094f3fb49f6a318ef3b98af7",
    "previousBlockHash": "0000fd58ff2697468f408abb24deb21d75539f2b8af5208052cd21b5b3aaf93c"
    },
    {
    "index": 6,
    "timestamp": 1548410822036,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipent": "f358b4a7df464b1491d06716ebcd0d77",
    "transactionId": "3f5fc9dde7084cbfa10d741a4fa86c22"
    }
    ],
    "nonce": 60056,
    "hash": "00009989882652b7f0dcd0c489831a5684ded78290b94bd3ff7a6ec6dd880ec6",
    "previousBlockHash": "000076a5f81f4905b591524eccf25de3e63378c0094f3fb49f6a318ef3b98af7"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipent": "f358b4a7df464b1491d06716ebcd0d77",
    "transactionId": "475fbfdbec2348f1b3442c9b7efbf19a"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

    console.log(bitcoin.chainIsValid(bc1.chain))