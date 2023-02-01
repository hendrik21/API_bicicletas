const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mia.wolf11@ethereal.email',
        pass: 'e1b9SFFvpyW4hz7jY5'
    }
});

module.export = nodemailer.createTransport(transporter);