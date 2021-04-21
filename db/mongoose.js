const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://hackathonBE:Sockboy9xx@cluster0.wbp9f.mongodb.net/hackathonBE?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})