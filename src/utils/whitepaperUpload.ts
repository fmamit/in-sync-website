import { supabase } from "@/integrations/supabase/client";
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface WhitepaperData {
  title: string;
  description: string;
  category: string;
  author: string;
  tags: string[];
  publicationDate: string;
}

export const uploadWhitepaperPDF = async (file: File): Promise<string | null> => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `whitepapers/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('whitepapers')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading PDF:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('whitepapers')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Unexpected error uploading PDF:', error);
    return null;
  }
};

export const generatePDFThumbnail = async (file: File): Promise<string | null> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    // Get the first page
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 2.0 });
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
      canvas: canvas
    };
    
    await page.render(renderContext).promise;
    
    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          uploadThumbnailToSupabase(blob).then(resolve);
        } else {
          resolve(null);
        }
      }, 'image/jpeg', 0.8);
    });
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error);
    return null;
  }
};

const uploadThumbnailToSupabase = async (blob: Blob): Promise<string | null> => {
  try {
    const fileName = `thumbnail_${Math.random().toString(36).substring(2)}_${Date.now()}.jpg`;
    const filePath = `thumbnails/${fileName}`;

    const { data, error } = await supabase.storage
      .from('whitepaper-thumbnails')
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading thumbnail:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('whitepaper-thumbnails')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading thumbnail to Supabase:', error);
    return null;
  }
};

export const getPDFPageCount = async (file: File): Promise<number> => {
  try {
    console.log('Starting PDF page count extraction for file:', file.name, 'Size:', file.size);
    
    // Check if file is actually a PDF
    if (!file.type.includes('pdf')) {
      console.error('File is not a PDF:', file.type);
      return 0;
    }
    
    const arrayBuffer = await file.arrayBuffer();
    console.log('PDF file loaded into arrayBuffer, size:', arrayBuffer.byteLength);
    
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const pageCount = pdf.numPages;
    console.log('Successfully extracted page count:', pageCount);
    return pageCount;
  } catch (error) {
    console.error('Error getting PDF page count:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Try a fallback approach using a simple byte estimation
    try {
      const fallbackCount = await estimatePageCountFromSize(file);
      console.log('Using fallback page count estimation:', fallbackCount);
      return fallbackCount;
    } catch (fallbackError) {
      console.error('Fallback page count estimation also failed:', fallbackError);
      return 1; // Return 1 instead of 0 so the whitepaper still shows as having content
    }
  }
};

// Fallback function to estimate page count based on file size
const estimatePageCountFromSize = async (file: File): Promise<number> => {
  // Very rough estimation: average PDF page is about 50-100KB
  // For a more accurate estimation, we could analyze the PDF structure
  const avgPageSizeKB = 75; // Conservative estimate
  const fileSizeKB = file.size / 1024;
  const estimatedPages = Math.max(1, Math.round(fileSizeKB / avgPageSizeKB));
  
  console.log(`Estimating pages from file size: ${fileSizeKB}KB ÷ ${avgPageSizeKB}KB = ~${estimatedPages} pages`);
  return estimatedPages;
};

export const createWhitepaper = async (
  whitepaperData: WhitepaperData,
  pdfFile: File
): Promise<boolean> => {
  try {
    // Upload PDF
    const pdfUrl = await uploadWhitepaperPDF(pdfFile);
    if (!pdfUrl) {
      throw new Error('Failed to upload PDF');
    }

    // Generate thumbnail
    const thumbnailUrl = await generatePDFThumbnail(pdfFile);
    
    // Get page count and file size
    const pageCount = await getPDFPageCount(pdfFile);
    const fileSizeMB = parseFloat((pdfFile.size / (1024 * 1024)).toFixed(2));

    // Insert into database
    const { error } = await supabase
      .from('whitepapers')
      .insert({
        title: whitepaperData.title,
        description: whitepaperData.description,
        category: whitepaperData.category,
        author: whitepaperData.author,
        tags: whitepaperData.tags,
        pages: pageCount,
        pdf_url: pdfUrl,
        thumbnail_url: thumbnailUrl,
        file_size_mb: fileSizeMB,
        publication_date: whitepaperData.publicationDate,
        download_count: 0
      });

    if (error) {
      console.error('Error inserting whitepaper:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error creating whitepaper:', error);
    return false;
  }
};

export const updateWhitepaper = async (
  id: string,
  whitepaperData: Partial<WhitepaperData>,
  pdfFile?: File
): Promise<boolean> => {
  try {
    let updateData: any = {
      title: whitepaperData.title,
      description: whitepaperData.description,
      category: whitepaperData.category,
      author: whitepaperData.author,
      tags: whitepaperData.tags,
      publication_date: whitepaperData.publicationDate
    };

    if (pdfFile) {
      // Upload new PDF
      const pdfUrl = await uploadWhitepaperPDF(pdfFile);
      if (!pdfUrl) {
        throw new Error('Failed to upload PDF');
      }

      // Generate new thumbnail
      const thumbnailUrl = await generatePDFThumbnail(pdfFile);
      
      // Get new page count and file size
      const pageCount = await getPDFPageCount(pdfFile);
      const fileSizeMB = parseFloat((pdfFile.size / (1024 * 1024)).toFixed(2));

      updateData = {
        ...updateData,
        pdf_url: pdfUrl,
        thumbnail_url: thumbnailUrl,
        pages: pageCount,
        file_size_mb: fileSizeMB
      };
    }

    const { error } = await supabase
      .from('whitepapers')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating whitepaper:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error updating whitepaper:', error);
    return false;
  }
};

export const deleteWhitepaper = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('whitepapers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting whitepaper:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting whitepaper:', error);
    return false;
  }
};

export const fetchWhitepapers = async () => {
  try {
    const { data, error } = await supabase
      .from('whitepapers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching whitepapers:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching whitepapers:', error);
    return [];
  }
};

export const fixWhitepaperPageCounts = async (): Promise<{ success: boolean; fixed: number; errors: string[] }> => {
  try {
    console.log('Starting whitepaper page count fix...');
    
    // Get all whitepapers with 0 pages or null pages
    const { data: whitepapers, error: fetchError } = await supabase
      .from('whitepapers')
      .select('*')
      .or('pages.is.null,pages.eq.0');

    if (fetchError) {
      console.error('Error fetching whitepapers to fix:', fetchError);
      return { success: false, fixed: 0, errors: [fetchError.message] };
    }

    if (!whitepapers || whitepapers.length === 0) {
      console.log('No whitepapers found with 0 pages');
      return { success: true, fixed: 0, errors: [] };
    }

    console.log(`Found ${whitepapers.length} whitepapers to fix`);
    
    let fixedCount = 0;
    const errors: string[] = [];

    for (const whitepaper of whitepapers) {
      try {
        console.log(`Processing whitepaper: ${whitepaper.title}`);
        
        if (!whitepaper.pdf_url) {
          console.warn(`Whitepaper ${whitepaper.title} has no PDF URL, skipping`);
          errors.push(`Whitepaper "${whitepaper.title}" has no PDF URL`);
          continue;
        }

        // Fetch the PDF file from the URL
        const response = await fetch(whitepaper.pdf_url);
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }

        const blob = await response.blob();
        const file = new File([blob], `${whitepaper.title}.pdf`, { type: 'application/pdf' });
        
        // Get the correct page count
        const pageCount = await getPDFPageCount(file);
        
        if (pageCount > 0) {
          // Update the whitepaper with the correct page count
          const { error: updateError } = await supabase
            .from('whitepapers')
            .update({ 
              pages: pageCount,
              updated_at: new Date().toISOString()
            })
            .eq('id', whitepaper.id);

          if (updateError) {
            throw new Error(`Failed to update whitepaper: ${updateError.message}`);
          }

          console.log(`✅ Fixed ${whitepaper.title}: ${pageCount} pages`);
          fixedCount++;
        } else {
          console.warn(`⚠️ Could not determine page count for ${whitepaper.title}`);
          errors.push(`Could not determine page count for "${whitepaper.title}"`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${whitepaper.title}:`, error);
        errors.push(`Error processing "${whitepaper.title}": ${error.message}`);
      }
    }

    console.log(`✅ Page count fix completed. Fixed: ${fixedCount}, Errors: ${errors.length}`);
    
    return {
      success: true,
      fixed: fixedCount,
      errors
    };
    
  } catch (error) {
    console.error('Fatal error in fixWhitepaperPageCounts:', error);
    return {
      success: false,
      fixed: 0,
      errors: [error.message]
    };
  }
};