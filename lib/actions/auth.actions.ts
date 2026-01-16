"use server"

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../Inngest/client";

export const signUpWithEmail=async({email, password, username}:SignUpFromData)=>{
    try {
        const response=await auth.api.signUpEmail({
            body:{
                email,
                password,
                name:username,
            }
        })
        if(response){
            await inngest.send({
                name:"app/user.created",
                data:{
                    email,
                    name:username

                }
            })
        }
        return {success:true,data:response}
    } catch (error) {
        console.log(error);
        let message = "Sign up failed";
        if (error instanceof Error) {
            if (error.message.includes("email already exists") || error.message.includes("already in use")) {
                message = "**This email already exists in the database. Please use a different email.**";
            } else {
                message = error.message;
            }
        }
        return {success:false,message}
        
    }
}
export const signInWithEmail=async({email, password}:SignInFromData)=>{
    try {
        const response=await auth.api.signInEmail({
            body:{
                email,
                password,
                
            }
        })
   
        return {success:true,data:response}
    } catch (error) {
        console.log(error);
        let message = "Sign In failed";
        if (error instanceof Error) {
            if (error.message.includes("invalid") || error.message.includes("not found") || error.message.includes("incorrect")) {
                message = "**Email or password is incorrect. Please try again.**";
            } else {
                message = error.message;
            }
        }
        return {success:false,message}
        
    }
}

export const SignOut=async()=>{
     try {
        await auth.api.signOut({headers:await headers()})
     } catch (error) {
        console.log(error);
     }
}
