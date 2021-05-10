import axiosClient from "./axiosClient";

const baseURL: string = 'music';

const musicApi = {
  getAll: () => {
    const url = baseURL;
    return axiosClient.get(url);
  },

  get: (id : string) => {
    const url = baseURL+'?music_id='+id;
    return axiosClient.get(url);
  },
}

export default musicApi;