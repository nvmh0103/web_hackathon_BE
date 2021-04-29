const express= require('express');
require('./db/mongoose');
const userRouter=require('./routers/user');
const groupRouter=require('./routers/group');
const postRouter= require('./routers/post');
const questionRouter=require('./routers/question');
const { ReplSet } = require('mongodb');
const { response } = require('express');
const cors=require('cors');
const app=express();
const port= process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

app.use(userRouter);

app.use(groupRouter);

app.use(postRouter);

app.use(questionRouter);

app.listen(port,()=>{
    console.log(`Server is up at ${port}`);
})
