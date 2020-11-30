import { createTransport } from "nodemailer";

const MAIL_SENDING_E_MAIL = "chandankr.js.dev@gmail.com";
const MAIL_SENDING_MAIL_PASSWORD = "ckpassforgmail";

const transportOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: MAIL_SENDING_E_MAIL,
    pass: MAIL_SENDING_MAIL_PASSWORD,
  },
};

const mailTransport = createTransport(transportOptions);

export const SEND_EMAIL_WITH_OTP = (first_name, email, otp) => {
  // console.log("forgot pass for email sender called");
  let html = null;

  html = `
    <div style="background: #81ecec">
      <center>
          <h1>Welcome to MY_WAY </h1>

          <h5>Hey <span style="color: blue">${first_name}</span> Here Is Your OTP To Move Ahead</h5>
          <h5> OTP for ${email} is <br/> <span style="color: red">${otp}</span> </h5>
          
          <br/>

          <h4>And This OTP Is Valid For Only 2 Minute So Hurry Up</h4>
          
          <h1> THANK YOU ONCE AGAIN FOR BEING WITH US </h1>

    </center> 
    </div>
      `;

  try {
    var mailOptions = {
      from: MAIL_SENDING_E_MAIL,
      to: email,
      subject: "OTP request from you FOR Activating your Account ",
      html,
    };

    mailTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Message sent to : ", info.envelope.to);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
