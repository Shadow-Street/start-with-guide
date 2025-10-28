/**
 * Integration Utilities
 * File uploads, email, and other integrations
 */
import { supabase } from '@/integrations/supabase/client';

// File Upload Integration
export const UploadFile = async ({ file }) => {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `profile-images/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { file_url: publicUrl };
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Email Integration (simplified for OTP)
export const SendEmail = async ({ to, subject, body }) => {
  // For now, just log to console since we don't have email configured
  console.log('Email would be sent:', { to, subject, body });
  // In production, this would use Supabase Edge Functions or a service like SendGrid
  return { success: true };
};

// Placeholder for Core integrations
export const Core = {
  InvokeLLM: null,
  SendEmail,
  UploadFile,
  GenerateImage: null,
  ExtractDataFromUploadedFile: null,
  CreateFileSignedUrl: null,
  UploadPrivateFile: null,
};

export const InvokeLLM = Core.InvokeLLM;
export const GenerateImage = Core.GenerateImage;
export const ExtractDataFromUploadedFile = Core.ExtractDataFromUploadedFile;
export const CreateFileSignedUrl = Core.CreateFileSignedUrl;
export const UploadPrivateFile = Core.UploadPrivateFile;
