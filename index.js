const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(1234);

app.get("/", (req, res) => {
  res.send({
    msg: "Welcome to Mailer Api",
    status: true,
    required: "Free Api (No data consumed E2E Encrypted)",
    bodyFormat: {
      senderName: "string",
      receiverEmail: "Email Address",
      subject: "Subject of Mail",
      text: "Text of Mail",
      body: "html body",
    },
  });
});
app.post("/mail", async (req, res) => {
  const senderName = await req.body.senderName;
  const receiverEmail = await req.body.receiverEmail;
  const subject = await req.body.subject;
  const text = await req.body.text;
  const body = await req.body.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mailer.api.provider@gmail.com",
      pass: "App key",
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
});
