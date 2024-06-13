const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const addKey = require("./api");
const keys= require("./apiKeys.json");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(1234);

app.get("/", (req, res) => {
  res.send({
    msg: "Welcome to Mailer Api",
    status: true,
    required: "API Key",
    bodyFormat:{
      senderName:"string",
      receiverEmail:"Email Address",
      subject:"Subject of Mail",
      text:"Text of Mail",
      body:"html body",
    }
  });
});
app.post("/mail",async (req, res) => {
  const key =await req.query.key;
  if (keys.keys.includes(key)) {
    const senderName =await req.body.senderName;
    
    const receiverEmail =await req.body.receiverEmail;
    const subject =await req.body.subject;
    const text =await req.body.text;
    const body =await req.body.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mailer.api.provider@gmail.com",
        pass: "bptx ertl remv rupi",
      },
    });
    const sMail = async () => {
      const info = await transporter.sendMail({
        from: `'${senderName}' <'mailer.api.provider@gmail.com'>`,
        to: `${receiverEmail}`,
        subject: `${subject}`,
        text: `${text}`,
        html: `${body}`,
      });
      res.send(info);
    };
    sMail();
  }else{
    res.send("Sorry")
  }
});
app.get("/addKey",async (req,res)=>{
    const mainKey =await req.query.key;
    if (mainKey=="6752"){
        function generateRandomString() {
            const length = 10;
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
        
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        
            return result;
        }
        const key = generateRandomString();
        addKey(key)
        res.send({key})
    }else{
        res.send("Sorry Invalid Access")
    }
})