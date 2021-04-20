const express= require('express');
require('./db/mongoose');
const userRouter=require('./routers/user');
const { ReplSet } = require('mongodb');
const { response } = require('express');

const app=express();
const port=3000;


app.use(express.json());

app.use(userRouter);

app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
})
