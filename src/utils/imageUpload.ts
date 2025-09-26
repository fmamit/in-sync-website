import { supabase } from "@/integrations/supabase/client";

export const uploadBlogImage = async (file: File): Promise<string | null> => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Unexpected error uploading image:', error);
    return null;
  }
};

export const processQuillImages = async (content: string): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const images = doc.querySelectorAll('img');
  
  let processedContent = content;
  
  for (const img of images) {
    const src = img.getAttribute('src');
    if (src && src.startsWith('blob:')) {
      try {
        // Convert blob URL to file
        const response = await fetch(src);
        const blob = await response.blob();
        const file = new File([blob], 'blog-image.jpg', { type: blob.type });
        
        // Upload to storage
        const uploadedUrl = await uploadBlogImage(file);
        if (uploadedUrl) {
          processedContent = processedContent.replace(src, uploadedUrl);
        }
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  }
  
  return processedContent;
};