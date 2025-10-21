import { MongoClient } from "mongodb";
import client from "../mongodb/client";

export default async function usernameGenerator(name: string) {

    const db = client.db()
    const baseUsername = name.toLowerCase().replace(/\s+/g, "");
    let username = baseUsername;
    const usernameExist = await db.collection('profile').findOne({ username })

    let exists = usernameExist;
    let suffix = 1;

    while (exists) {
        username = `${baseUsername}${suffix}`;
        exists = usernameExist;
        suffix++;
    }

  return username;
}
