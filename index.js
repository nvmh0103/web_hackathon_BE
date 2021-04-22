const express= require('express');
require('./db/mongoose');
const userRouter=require('./routers/user');
const { ReplSet } = require('mongodb');
const { response } = require('express');
const cors=require('cors');
const app=express();
const port= process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

app.use(userRouter);

app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
})
