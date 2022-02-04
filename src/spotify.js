export const client_secret = "718ede135a544ad781004897bf6d0e64";
export const client_id = "3379b41787bf4903b57dbbf703f48016";
export const redirect_uri = "https://spotifyclonereact.vercel.app";
const scopes = [
  "streaming",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "user-follow-modify",
  "user-follow-read",
];
export const getAccessToken = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const login_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes.join(
  "%20"
)}&show_dialog=true`;
