import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import handleError from "./handleError";

type Props = {
  url: string;
  headers?: AxiosRequestHeaders;
};

export default async function fetchData<T>({
  url,
  headers,
}: Props): Promise<AxiosResponse<T, unknown> | void> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      headers,
    });

    console.log(res.data);

    return res;
  } catch (error: unknown) {
    handleError(error);
  }
}
