import axiosClient from "./axiosClient";

const baseURL: string = 'https://mp3-project.herokuapp.com/';

const musicApi = {
  getAll: () => {
    const url = baseURL;
    return axiosClient.get(url);
  },

  get: (id : string) => {
    const url = baseURL;
    return axiosClient.get(url);
  },
}

export default musicApi;