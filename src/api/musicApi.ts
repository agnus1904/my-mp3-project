import axiosClient from "./axiosClient";

const baseURL: string = 'music/';

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
}

export default musicApi;