import * as fs from 'node:fs';
import nodemailer from 'nodemailer';

function sendReminderEmail(subject = "Subject not implimented", text = "Text not implimented") {
    const creds = getCredentials();
    const myEmail = creds[0];
    const myPassword = creds[1];

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: myEmail,
          pass: myPassword
        }
    });

    var mailOptions = {
      from: myEmail,
      to: myEmail,
      subject: subject,
      text: text
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            console.log("data:", data, "err", err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

function getCredentials () {
    return fs.readFileSync('./Data/Credentials/creds.txt', 'ascii').split('`');
}

export default sendReminderEmail;