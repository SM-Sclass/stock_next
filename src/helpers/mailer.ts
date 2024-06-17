// import nodemailer from 'nodemailer'
const nodemailer = require('nodemailer')
export const sendEmail = async({email , emailType , userId}:string | any)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:"smtp.forwardemail.net",
            port:465,
            secure:true,
            auth:{
                user:"REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
                pass:"REPLACE-WITH-YOUR-GENRATED-PASSWORD",
            },
        });
        const mailOptions = {
            from :'',
            to:email,
            subject:emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text:'',
            html:"",

        }
        const mailResponse = await transporter.sendEmail(mailOptions)
        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}