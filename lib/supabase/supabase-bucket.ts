import { error } from "console";
import { supabase } from "./client";

export async function SupabaseBucket(file: File, oldFilePath? : string) {
  if (!file) {
    throw new Error("No file provided");
  }
  try{
    if (oldFilePath) {
    await supabase.storage.from("avatars").remove([oldFilePath]);
    }
    const filePath = `public/${file.name}`;
    const { data: image, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });
      
        if (uploadError) throw uploadError;
        const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(filePath);
        return { publicUrl: publicData.publicUrl, filePath };
  } catch (err){
    console.log(err);
  }

}
