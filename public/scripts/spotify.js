export async function getSpotifyToken() {
    const id = import.meta.env.SPOTIFY_CLIENT_ID;
    const secret = import.meta.env.SPOTIFY_CLIENT_SECRET;

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(id + ":" + secret)}`,
        },
        body: "grant_type=client_credentials",
    });

    const data = await response.json();

    return data.access_token;
}

export async function getLatestSongs(id, amount = 3) {
  const token = await getSpotifyToken();

  const response = await fetch(
  `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
  );

  const data = await response.json();

  return data.tracks.slice(0, amount).map((track) => ({
    name: track.name,
    artists: track.artists.map((artist) => artist.name).join(", "),
    release_date: track.album.release_date,
    image: track.album.images[0]?.url || "",
    url: track.external_urls.spotify,
  }));
}