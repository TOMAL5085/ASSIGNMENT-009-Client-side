export default async function uploadImageToImgbb(file) {
  const apiKey = import.meta.env.VITE_IMGBB_KEY;

  if (!apiKey) {
    throw new Error("ImgBB key is missing. Add VITE_IMGBB_KEY to the client-side Vercel project and redeploy.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || "ImgBB upload failed.");
  }

  return result.data.display_url;
}
