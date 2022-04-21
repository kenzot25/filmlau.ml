export const fillerData = (data) => {
  console.log("data in fillterData", data);
  return data.filter((e) => e.attributes.language === "vi");
};
export const fillterVesion = (data) => {
  console.log("data in fillterVesion", data);
  const V720 = data.filter((e) => e["attributes"].release.includes("720p"))[0];
  const V1080 = data.filter((e) =>
    e["attributes"].release.includes("1080p")
  )[0];
  console.log(V720, V1080);
  const obj = {};
  if (V720) {
    obj[720] = {
      id: V720.attributes.files[0].file_id,
    };
  }
  if (V1080) {
    obj[1080] = {
      id: V1080.attributes.files[0].file_id,
    };
  }
  return {
    ...obj,
  };
};
const MOVIE_ID_TYPE = {
  28: "Action",
  12: "Adventure",
  16: "Animation: ",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
const TV_ID_TYPE = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};
export const findCategoryOfMovieByGenreID = (type, ids) => {
  let category = [];

  if (type === "tv") {
    ids.forEach((id) => {
      category.push(TV_ID_TYPE[id]);
    });
  } else if (type === "movie") {
    ids.forEach((id) => {
      category.push(MOVIE_ID_TYPE[id]);
    });
  }
  return category;
};
export function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}
