import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import { env } from "../env/env";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Platform } from "react-native";
import { StorageKeys } from "@/hooks/storage";
import { Session } from "@/context/authContext";

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

let isRefreshing = false;

export const configureAxios = () => {
  axios.defaults.baseURL = env.api.baseUrl;

  axios.interceptors.request.use(async (config) => {
    const tokens = await getTokensFromStorage();

    if (!config.headers) config.headers = new AxiosHeaders();
    if (tokens) config = addAuthHeader(config, tokens);

    config.headers.Accept = "application/vnd.api+json";

    return config;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error: AxiosError) {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest && !isRefreshing) {
        isRefreshing = true;

        const tokens = await refreshTokens().finally(
          () => (isRefreshing = false),
        );

        if (!tokens) {
          router.push("/login");
          return Promise.reject(error);
        }

        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        console.log("retrying request with new tokens...", originalRequest);
        return axios(originalRequest);
      }

      return Promise.reject(error);
    },
  );
};

const getTokensFromStorage = async (): Promise<Tokens | null> => {
  const sessionString =
    Platform.OS === "web"
      ? localStorage.getItem(StorageKeys.Session)
      : SecureStore.getItem(StorageKeys.Session);

  return sessionString ? (JSON.parse(sessionString) as Tokens) : null;
};

const addAuthHeader = (
  config: InternalAxiosRequestConfig<unknown>,
  tokens: Tokens,
): InternalAxiosRequestConfig<unknown> => {
  const { accessToken } = tokens;

  if (!config.headers) config.headers = new AxiosHeaders();
  if (!config.headers.Authorization)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

const refreshTokens = async (): Promise<Session | void> => {
  const sessionString = await SecureStore.getItemAsync(StorageKeys.Session);

  if (!sessionString) return router.replace("/login");

  const session: Session = JSON.parse(sessionString);

  return await axios
    .request({
      method: "POST",
      url: `${env.api.baseUrl}/auth/tokens`,
      headers: {
        Authorization: `Bearer ${session.refreshToken}`,
      },
    })
    .then(async (response) => {
      const newSession: Session = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      if (Platform.OS === "web") {
        localStorage.setItem(StorageKeys.Session, JSON.stringify(newSession));
      } else {
        await SecureStore.setItemAsync("session", JSON.stringify(newSession));
      }

      return newSession;
    })
    .catch(async (error) => {
      console.log(
        "An error occurred when making a request to the api",
        error.response.data,
      );

      await SecureStore.deleteItemAsync("session");
      return router.replace("/login");
    });
};
