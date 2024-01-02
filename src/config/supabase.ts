import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://kvqassbuiawuchclcpwn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2cWFzc2J1aWF3dWNoY2xjcHduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNDIyODIsImV4cCI6MjAxODcxODI4Mn0.ZHURB-DxZ65vB_bfWCc4OzrcEm-pOohVtlrPktcdeog")

type UploadFileReturnType = 
    | {
        data: { path: string }
        error: null
      }
    | {
        data: null
        error: Error
      }

const uploadFile = async (
  storage: string, 
  path: string, 
  fileBody: File | Blob
): Promise<UploadFileReturnType>  => {
    const { data, error } = await supabase
      .storage
      .from(storage)
      .upload(path, fileBody, {
        cacheControl: "3600",
        upsert: true
      });

    if (error) {
      return {
        data: null,
        error: new Error(error.message)
      }
    }
    return {
      data: data,
      error: null
    }
}

type CreateImageURLReturnType = 
    | {
        data: { signedUrl: string }
        error: null
      }
    | {
        data: null
        error: Error
      }

const createImageURL = async (
  storage: string, 
  path: string, 
  expiresIn: number = 365 * 24 * 60 * 60
) : Promise<CreateImageURLReturnType> => {
    const { data, error } = await supabase
      .storage
      .from(storage)
      .createSignedUrl(path, expiresIn);

    if (error) {
      return {
        data: null,
        error: new Error(error.message)
      }
    }
    return {
      data: data,
      error: null
    }

}

export default supabase
export {
  uploadFile,
  createImageURL
}
