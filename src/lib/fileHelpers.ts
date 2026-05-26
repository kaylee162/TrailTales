export function filesToDataUrls(files: FileList | null): Promise<string[]> {
  if (!files?.length) return Promise.resolve([])

  return Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(String(reader.result))
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
    )
  )
}
