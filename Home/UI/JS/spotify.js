let ACCESS_TOKEN = "BQD5x8i5CjklgSRPDacYP1RQuDjSw91fRkX3HQUZTz6NAWkXpFchdi9YBBTBmYn1_cdqr1SKA_k6ex-svTBhU2Q7b-NWAw6lhyyBMyIgMmmFYsPt-IIZr4TmcX172_wW8p9z31tLD1v7mOhaFJ5a2YhJoRveNnY115D5IfqLfRqfn2TLg2gbdN02-KLAPhOTp67B3tOxsDFjZT-pqjf1mQGQZTu0Guh4T5sGYYhbgQ";
let REFRESH_TOKEN = "AQDWiQUO3ETAYI54L88OY6NviUut87-l7Gb0wbrWiQDjLT9pNHOZc8nSh3av3-Pn6RwEtbCA6B8IvYWrABk8B3J4IaiSo2CMM1GWJhwxa7KqLuS-AxxI2qlpqIeVHKeKGQI";

const CLIENT_ID = "8282ae5ea7fb4a038a271b716cf7d076";
const CLIENT_SECRET = "b6e2ec9c8f5e40ddaa5e3675e0125f4d";

async function refreshAccessToken() {
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${credentials}`
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: REFRESH_TOKEN
        }),
    });

    const data = await response.json();
    if (data.access_token) {
        ACCESS_TOKEN = data.access_token;
        console.log("Access token refreshed:", ACCESS_TOKEN);
    } else {
        console.error("Failed to refresh access token:", data);
    }
}


async function getCurrentTrack() {
    const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET",
        headers: { "Authorization": `Bearer ${ACCESS_TOKEN}` },
    });

    if (response.status === 401) {
        await refreshAccessToken();
        return getCurrentTrack();
    }

    if (response.status === 204) {
        document.getElementById("trackName").innerText = "Nothing's playing right now";
        document.getElementById("artistName").querySelector("span").innerText = "There could be a great artist here";
        document.getElementById("albumCover").src = "https://img.icons8.com/?size=100&id=EHtxO8ZmA602&format=png&color=bbbbbb";
        return;
    }

    const data = await response.json();
    if (data?.item) {
        const { name: trackName, artists, album, explicit } = data.item;
        const releaseYear = new Date(album.release_date).getFullYear();
        const explicitIcon = explicit ? `<img src='https://img.icons8.com/?size=100&id=ulh6TDZUXojQ&format=png&color=ffffff' alt='Explicit' style='width:15px; height:15px;'>` : "";
        const trackDisplayName = `${trackName} ${explicitIcon}`;
        const artistNames = artists.map(artist => artist.name).join(", ");
        const fullArtistInfo = `${artistNames} • ${releaseYear}`;

        const truncateText = (text, maxLength) => {
            const parts = text.split(" • ");
            let namePart = parts[0]; 
            const yearPart = parts[1];

            if (namePart.length > maxLength) {
                namePart = namePart.substring(0, maxLength) + "";
            }

            return `${namePart} • ${yearPart}`;
        };

        const artistDisplayInfoTruncated = truncateText(fullArtistInfo, 37);
        const progressPercent = (data.progress_ms / data.item.duration_ms) * 100;

        document.getElementById("trackName").innerHTML = trackDisplayName;
        document.getElementById("artistName").querySelector("span").innerText = artistDisplayInfoTruncated;
        document.getElementById("albumCover").src = album.images[0]?.url;
        document.getElementById("progressBar").style.width = `${progressPercent}%`;
        document.getElementById("currentTime").innerText = formatTime(data.progress_ms);
        document.getElementById("totalTime").innerText = formatTime(data.item.duration_ms);
    }
}

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

setInterval(refreshAccessToken, 60000);
setInterval(getCurrentTrack, 1000);
getCurrentTrack();
