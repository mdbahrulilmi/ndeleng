export default async function Tmbd(path:string) {

    const url = "https://api.themoviedb.org/3";
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER_KEY}`
    }
    };

     try {
    const res = await fetch(`${url}${path}`, options)

    if (!res?.ok) return null;

    const data = await res.json()
    return data // <- ini yang dipakai di page
  } catch (err) {
    console.error("Error fetching TMDB:", err)
    return { results: [] } // fallback biar ga error di UI
  }
}