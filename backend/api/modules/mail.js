const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const { devConfig } =require("../config/env/development");

module.exports.sendEmail = options => {
    return new Promise((resolve,reject)=>{
        const transporter = nodemailer.createTransport({
            host: devConfig.ethereal.host,
            port: devConfig.ethereal.port,
            auth: {
                user: devConfig.ethereal.userName,
                pass: devConfig.ethereal.password
            }
        });
        // const text = htmlToText(options.html, {
        //     wordwrap:130
        // })
        const mail =  {
            from: '"Sushant Gupta" <noreply@fullstackdeveloper.com>',
            to: options.email,
            subject:options.subject,
            html:options.html
        }

        transporter.sendMail(mail,(error,info)=>{
            if(error) {
                return reject(error)
            }
            console.log('Message Id ' , info.messageId);
            console.log('Preview URL' , nodemailer.getTestMessageUrl(info));
            return resolve({message:'Reset Email Has Been Sent To Your Inbox'});
        })
    })
};
