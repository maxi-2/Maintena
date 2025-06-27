// components/EquipmentImageUpload.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

export default function ImageUpload({ machineId } : {machineId: string}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient()

  const router = useRouter()

  const handleUpload = async () => {
    if (!file || !machineId) return;

    const { data: {user: {id}} } = await supabase.auth.getUser()
    
    console.log(id)

    const fileExt = file.name.split('.').pop();
    const fileName = `${machineId}-${Date.now()}.${fileExt}`;
    const filePath = `${id}/${fileName}`;

    setUploading(true);
    setFile(null)

    const { error: uploadError } = await supabase.storage
      .from('machine-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      setUploading(false);
      return;
    }

    // Update DB with the image path
    const { error: dbError } = await supabase
      .from('Machine')
      .update({ image_path: filePath })
      .eq('id', machineId);

    if (dbError) console.error("DB update error:", dbError.message);

    setUploading(false);
    router.refresh()
  };

  return (
    <div>
      {!file && 
      
      <label htmlFor="imageUpload" className="bg-primary-teal cursor-pointer hover:brightness-80 transition duration-300 inline-flex items-center gap-2 text-neutral-white px-5 py-2 rounded-[0.625rem]">
        <p>Upload Image</p>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />
      </label>
      }
      
      {file && <button className="bg-primary-teal cursor-pointer hover:brightness-80 transition duration-300 flex items-center gap-2 text-neutral-white px-5 py-2 rounded-[0.625rem]"
      onClick={handleUpload}
      disabled={uploading}>
        {uploading ? "Uploading..." : "Submit Image"}
      </button>}
      
    </div>
  );
}
