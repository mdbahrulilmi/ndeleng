import { getSession } from "next-auth/react";

export default async function getSessionHandler(){
    try{
        const session = await getSession();
        return session?.user.id;
    }catch(err){
        return null;
    }
}