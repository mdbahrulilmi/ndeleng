export default async function Tmpfiles(base64: string) {
  const blob = await (await fetch(base64)).blob()
  const formData = new FormData()
  formData.append("file", blob, "image.png")

  const res = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: formData,
  })
  const data = await res.json()
  
  return data.data.url
}
