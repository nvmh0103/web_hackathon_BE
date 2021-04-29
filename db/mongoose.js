const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hackathon-BE',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(message =>{
    console.log("connect successfully")
}).catch(e => {
    console.log(e);
})
// mongodb+srv://hackathonBE:Sockboy9xx@cluster0.wbp9f.mongodb.net/hackathonBE?retryWrites=true&w=majority