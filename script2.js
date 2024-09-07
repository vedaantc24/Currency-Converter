
let p1 = new Promise((resolve, reject) =>{
  setTimeout(()=>{
    console.log("Resolved after 2 seconds")
    resolve(56)
  }, 2000)
  // resolve(56)

})

p1.then((value)=>{
  setTimeout(()=>{
    console.log(value)
  }, 2000)
  // console.log(value)
}) 



