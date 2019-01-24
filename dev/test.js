//using callbacks
/*
function http(url,method,sucesscallback,errhandler){
    setTimeout(()=>{
        var data="Yo Yo";
        if(data){
            sucesscallback(data)
        }
        else{
            errhandler('No data found')
        }
    },1000);
}


http('https://google.com','GET',function(data){
    console.log(data);
},function(err){
    console.log(err)
})
*/

//using promises

function http(url,method){
    var promise= new Promise(function(resolve,reject){
        setTimeout(function(){
            var data='sjajhksh';
            if(data){
                resolve(data)
            }
            else{
                reject('No data')
            }
        },1000)
    })
    return promise;
}


http('https://google.com','GET')
.then(function(data){
    console.log(data)
})
.catch(function(err){
    console.log(err)
})