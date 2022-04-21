// const magnet_path = "magnet:?xt=urn:btih:";
// import webtor from "@webtor/platform-sdk-js";
export const getVidByTorrent = async ({
  magnet,
  poster,
  subtitlesSRC,
  title,
}) => {
  console.log(subtitlesSRC);
  window.webtor = window.webtor || [];
  const obj = {
    id: "player",
    magnet,
    on: function (e) {
      if (e.name === window.webtor.TORRENT_FETCHED) {
        console.log("Torrent fetched!", e.data);
      }
      if (e.name === window.webtor.TORRENT_ERROR) {
        console.log("Torrent error!");
      }
    },
    poster,
    lang: "en",
    i18n: {
      en: {
        common: {
          "prepare to play": "Preparing Video Stream... Please Wait...",
        },
        stat: {
          seeding: "Seeding",
          waiting: "Client initialization",
          "waiting for peers": "Waiting for peers",
          from: "from",
        },
      },
    },
    title,
  };
  if (subtitlesSRC) {
    obj.subtitles = [
      {
        srclang: "vi",
        label: "Vietnamese",
        src: subtitlesSRC,
        default: true,
      },
    ];
  }
  console.log(obj)
  window.webtor.push(obj);
};
