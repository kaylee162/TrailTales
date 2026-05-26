export async function compressImage(file: File): Promise<string> {
  const image = await loadImage(file)

  const canvas = document.createElement('canvas')
  const maxWidth = 900
  const scale = Math.min(1, maxWidth / image.width)

  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Could not compress image')
  }

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  return canvas.toDataURL('image/jpeg', 0.68)
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const url = URL.createObjectURL(file)

    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }

    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not load image'))
    }

    image.src = url
  })
}