interface CloudResp {
  secure_url: string;
}

export const fileUpload = async (file: File): Promise<string> => {
  if (!file) throw new Error("No file to upload");
  const cloudURL = import.meta.env.VITE_CLOUD_URL;

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudURL, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) {
      throw new Error("Could not upload image");
    }

    const cloudResp = (await resp.json()) as CloudResp;

    return cloudResp.secure_url;
  } catch (error: unknown) {
    throw new Error((error as Error).message);
  }
};
