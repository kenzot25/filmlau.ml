import axios from "axios";
import { fillerData, fillterVesion } from "./helper";

export async function getDataFromAxios(url, config) {
  try {
    const { data: response } = await axios.get(url, config); //use data destructuring to get data from the promise object
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getSub(files, version) {
  console.log(files);
  var myHeaders = new Headers();
  myHeaders.append("Api-Key", process.env.REACT_APP_KEY_API_OPENSUB);
  var formdata = new FormData();
  formdata.append("file_id", files[version].id);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };
  return await fetch(
    "https://api.opensubtitles.com/api/v1/download",
    requestOptions
  )
    .then((response) => {
      // console.log(response);
      if (response.ok) return response.json();
      else throw new Error("...");
    })
    .then((result) => {
      // console.log(result["link"]);
      return result["link"];
    })
    .catch((error) => {});
}

async function findFileSubID(id) {
  const options = {
    method: "GET",
    url: "https://api.opensubtitles.com/api/v1/subtitles",
    params: { tmdb_id: id },
    headers: {
      "Content-Type": "application/json",
      "Api-Key": process.env.REACT_APP_KEY_API_OPENSUB,
    },
  };
  return await axios
    .request(options)
    .then(function (response) {
      console.log("res in fetch data in findFileSubID", response.data);
      const fulldata = fillerData(response.data.data);
      console.log("and", fulldata);
      const allVersion = fillterVesion(fulldata);
      return allVersion;
    })
    .catch(function (error) {
      console.error(error);
    });
}
export async function getConfigSubtitle(id) {
  const res = await findFileSubID(id);
  console.log("Res in getConfigSubtitle", res);
  let data1;
  let data2;

  if (res[720]) {
    data1 = await getSub(res, 720);
  }
  if (res[1080]) {
    data2 = await getSub(res, 1080);
  }
  const srtobj = {
    720: {
      link: data1,
      id: res[720]?.id,
    },
    1080: {
      link: data2,
      id: res[1080]?.id,
    },
  };
  console.log("Last srtobj", srtobj);
  
  return await srtobj;
}

