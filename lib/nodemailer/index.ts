import { email } from "better-auth";
import { Type } from "lucide-react";
import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";



export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail=async({email,name,intro}:WelcomeEmailData)=>{
    const htmltemplate=WELCOME_EMAIL_TEMPLATE.replace("{{name}}",name).replace("{{intro}}",intro);
    const mailOptions={
        from:"SafeShelf <"+process.env.NODEMAILER_EMAIL+">",
        to:email,
        subject:"Welcome to SafeShelf!- Get Started with Organizing Your Warranties",
        text:"Thanks for joining SafeShelf! You can now keep all your warranties organized and accessible.",
        html:htmltemplate
    };
    await transporter.sendMail(mailOptions);

}