import axios from 'axios';
import join from 'url-join';

const NETWORK_CONNECTION_MESSAGE =
  'Cannot connect to server, Please try again.';
const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK';
const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const apiUrl = import.meta.env.VITE_BASE_URL_API;

axios.defaults.withCredentials = true;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
axios.interceptors.request.use(async (config: any) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    config.url = join(apiUrl, config.url);
  }
  config.timeout = 10000;
  return config;
});
axios.interceptors.request.use(
  (res) => {
    return res;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.res) {
      return Promise.reject({
        code: NOT_CONNECT_NETWORK,
        message: NETWORK_CONNECTION_MESSAGE,
      });
    }
    return Promise.reject(error);
  },
);

export const httpClient = axios;
