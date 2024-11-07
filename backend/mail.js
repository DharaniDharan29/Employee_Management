
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'dharanidharanp.22cse@kongu.edu', 
        pass: 'keccse249',
    },
});

function sendMail(to, sub, msg) {
    transporter.sendMail({
        from: 'dharanidharanp.22cse@kongu.edu', 
        to: to,
        subject: sub,
        html: msg,
    }, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Email sent:', info.response);
    });
}

sendMail('boomeshp.22cse@kongu.edu', 'thalaivare', 'tappangu tappangu thalaivare');
