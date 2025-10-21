import { error } from "console";
import { supabase } from "./client";

export async function SupabaseBucket(file: File) {
  if (!file) {
    throw new Error("No file provided");
  }
  try{
    const filePath = `public/${Date.now()}-${file.name}`;
    const { data: image, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });
      
        if (uploadError) throw uploadError;
        if (image){
          console.log(image);
        }
        const { data: publicData } = supabase.storage.from("avatars").getPublicUrl(filePath);
        return publicData.publicUrl;
  } catch (err){
    console.log(err);
  }

}
