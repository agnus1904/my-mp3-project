import axiosClient from "./axiosClient";

const baseURL: string = 'music/';

const data = [
  {
    "music_id": "1",
    "music_name": "Hãy Trao Cho Anh",
    "music_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/mp3/hay-trao-cho-anh.wav",
    "music_singer": "Sơn Tùng",
    "music_avatar_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/img/hay+trao+cho+anh.jpeg",
    "music_baner_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/img/hay+trao+cho+anh+banner+2.jpeg"
  },
  {
    "music_id": "2",
    "music_name": "Nơi Này Có Anh",
    "music_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/mp3/NO%CC%9BI+NA%CC%80Y+CO%CC%81+ANH+_+OFFICIAL+MUSIC+VIDEO+_+SO%CC%9BN+TU%CC%80NG+M-TP.mp3",
    "music_singer": "Sơn Tùng",
    "music_avatar_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/img/noi+nay+co+anh+avatar.jpeg",
    "music_baner_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/img/noi+nay+co+anh.jpeg"
  },
  {
    "music_id": "3",
    "music_name": "Muộn Rồi Sao Mà Còn",
    "music_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/mp3/SO%CC%9BN+TU%CC%80NG+M-TP+_+MUO%CC%A3%CC%82N+RO%CC%82%CC%80I+MA%CC%80+SAO+CO%CC%80N+_+OFFICIAL+MUSIC+VIDEO.mp3",
    "music_singer": "Sơn Tùng",
    "music_avatar_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/img/nu-chinh-trong-mv-muon-roi-ma-sao-con-cua-son-tung-m-tp-la-ai-1619750538-8.webp",
    "music_baner_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/mp3/Screen+Shot+2021-05-18+at+9.05.53+PM.png"
  },
  {
    "music_id": "4",
    "music_name": "Âm Thầm Bên em",
    "music_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/mp3/A%CC%82m+Tha%CC%82%CC%80m+Be%CC%82n+Em++-+So%CC%9Bn+Tu%CC%80ng+M+TP.mp3",
    "music_singer": "Sơn Tùng",
    "music_avatar_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/img/am+tham+ben+em+avatar.jpeg",
    "music_baner_url": "https://my-mp3-dev.s3-ap-southeast-1.amazonaws.com/img/am+tham+ben+em.jpeg"
  },
  {
    "music_id": "5",
    "music_name": "music_name 5",
    "music_url": "music_url 5",
    "music_singer": "music_singer 5",
    "music_avatar_url": "music_avatar_url 5",
    "music_baner_url": "music_baner_url 5"
  },
  {
    "music_id": "6",
    "music_name": "music_name 6",
    "music_url": "music_url 6",
    "music_singer": "music_singer 6",
    "music_avatar_url": "music_avatar_url 6",
    "music_baner_url": "music_baner_url 6"
  },
  {
    "music_id": "7",
    "music_name": "music_name 7",
    "music_url": "music_url 7",
    "music_singer": "music_singer 7",
    "music_avatar_url": "music_avatar_url 7",
    "music_baner_url": "music_baner_url 7"
  },
  {
    "music_id": "8",
    "music_name": "music_name 8",
    "music_url": "music_url 8",
    "music_singer": "music_singer 8",
    "music_avatar_url": "music_avatar_url 8",
    "music_baner_url": "music_baner_url 8"
  },
  {
    "music_id": "9",
    "music_name": "music_name 9",
    "music_url": "music_url 9",
    "music_singer": "music_singer 9",
    "music_avatar_url": "music_avatar_url 9",
    "music_baner_url": "music_baner_url 9"
  },
  {
    "music_id": "10",
    "music_name": "music_name 10",
    "music_url": "music_url 10",
    "music_singer": "music_singer 10",
    "music_avatar_url": "music_avatar_url 10",
    "music_baner_url": "music_baner_url 10"
  }
]

const musicApi = {
  getAll: () => {
    const url = baseURL;
    return axiosClient.get(url);
  },

  get: (id : string) => {
    const url = baseURL+id;
    return axiosClient.get(url);
  },

  getPageLimit: (page : string, limit: string) => {
    const url = baseURL+'?page='+page+'&limit='+limit;
    return axiosClient.get(url);
  },

  getPageLimitLocal: (page : number, limit: number) => {
    const result = {
        data : data.slice((page - 1) * limit, page * limit)
    };
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(result);
        }, 500);
    })
    }
}

export default musicApi;