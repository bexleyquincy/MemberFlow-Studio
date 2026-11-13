/**
 * Reads an image file from disk and returns a compact base64 Data URL
 * suitable for storing cleanly in browser localStorage and previewing immediately.
 */
export function processUploadedImage(
  file: File,
  maxWidth = 1280,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please select a valid image file (PNG, JPG, WebP, or GIF).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode selected image.'));
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const targetWidth = Math.round(img.width * scale);
        const targetHeight = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const outputMime =
          file.type === 'image/png' && file.size < 350_000
            ? 'image/png'
            : 'image/jpeg';
        resolve(canvas.toDataURL(outputMime, quality));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
