const express= require('express');
const app=express();
const port=3000;

app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
})
app.get('/',(req,res) => {
    res.send("hello ");
})