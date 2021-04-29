const Question = require('../models/question');

class questionController{
    async createDe( req, res){
        const question = new Question(req.body);
        try{
            await question.save();
            res.status(200).json({message:"create success!"})
        } catch (e){
            res.status(400).send(e);
        }
    }
    async getDe(req, res){
        const maDe=req.body.maDe;
        const question= await Question.find({maDe});
        try{
            if (!question){
                res.status(404).json({error:"khong tim thay de"});
            }
            res.status(200).send(question);
        }catch(e){
            res.status(200).json({error:"something wrong happened"});
        }
    }  
    async getMark(req, res){
        try{

            const maDe=req.body.maDe;
            const question= await Question.findOne({maDe});
            const dapAn=req.body.dapAn;
            let diem=0;
            dapAn.forEach(cautl => {
                
                question.cauHoi.forEach(dapAntl =>{
                    console.log(dapAntl);
                    if ((cautl.cauHoi==dapAntl.tenCauHoi) && (cautl.cauTraLoi==dapAntl.dapAnDung)){
                        console.log(dapAntl.diem);
                        diem+=dapAntl.diem;
                        console.log(diem);
                        console.log("here1");
                    }
                })
            })
            res.status(200).json({diem});
        } catch (e){
            res.status(400).json({error:"something happened"});
        }
    }
}


module.exports= new questionController();
