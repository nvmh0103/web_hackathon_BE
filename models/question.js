const mongoose=require('mongoose');

const questionSchema= new mongoose.Schema({
    tenDe:{
        type: String,
    },
    maDe:{
        type: String,
    },
    cauHoi:[{
        tenCauHoi:{
        type: String,
        },
        dsDapAn:[{
            tenDapAn:{
                type: String,
            },
            moTa:{
                type: String,
            }
        }
        ],
        dapAnDung:{
            type: String,
        },
        diem:{
            type: Number,
        }
    }],
    

})



const Question= mongoose.model('Question',questionSchema);
module.exports = Question;