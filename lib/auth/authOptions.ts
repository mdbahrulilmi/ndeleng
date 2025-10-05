import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import client from "../client"
import usernameGenerator from "../generator/usernameGenerator"
import { Profile } from "@/models/Profile"
import { connectDB } from "../connect"

  export const authOptions = {
    adapter:  MongoDBAdapter(client),
    providers: [
      GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
       async jwt({ token, user }:{token:any,user:any}) {
        if (user) {
          token.id = user.id || user._id || null
        }
        return token;
      },
      async session({ session, token }:{session:any, token:any}) {
        if (session?.user) {
          session.user.id = token.id
        }
        return session
      },
       async signIn({ user }:{user:any}) {
        return true
      },
    },
    events:{
      async signIn({user}:{user:any}){
        await connectDB();
        const existing = await Profile.findOne({ userId: user.id })
        if (!existing) {
            const username = await usernameGenerator(user.name);
            await Profile.create({ 
              userId: user.id,
              name:user.name,
              username: username
            })
          }
      },
      
    }
    
  }