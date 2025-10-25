import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GoogleProvider from "next-auth/providers/google"
import client from "../mongodb/client"
import usernameGenerator from "../generator/usernameGenerator"
import { Profile } from "@/models/Profile"
import { connectDB } from "../mongodb/connect"

  export const authOptions = {
    adapter:  MongoDBAdapter(client),
    providers: [
      GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
    ],
    session: { strategy: "jwt" as const},
    secret: process.env.NEXTAUTH_SECRET!,
    callbacks: {
       async jwt({ token, user }:{token:any,user:any}) {
        if (user) {
          token.id = user.id || user._id || null

          await connectDB()
          const profile = await Profile.findOne({ userId: token.id }).lean() as any

          if (profile) {
            token.profile = {
            username: profile.username,
            name: profile.name,
            image: profile.image
            }
          }
        }
        return token;
      },
      async session({ session, token }:{session:any, token:any}) {
        if (session?.user) {
          session.user.id = token.id
          session.user.profile = token.profile
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
              _id: user.id,
              name:user.name,
              username: username
            })
          }
      },
      
    }
    
  }