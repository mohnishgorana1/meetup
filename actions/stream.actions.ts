'use server'

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;     // API KEY:- used to authenticate your application with the Stream API.
const apiSecret = process.env.STREAM_SECRET_KEY            // API SECRET: -used to sign tokens and secure API requests. It is essential for creating user-specific tokens that authenticate individual users with the Stream API. 

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error('User is not logged in');
    if (!apiKey) throw new Error('NO API KEY');
    if (!apiSecret) throw new Error('NO API SECRET');

    const client = new StreamClient(apiKey, apiSecret)

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;  
    const issued = Math.floor(Date.now() / 1000) - 60;  

    const token = client.createToken(user?.id, exp, issued);

    return token;
    
}
