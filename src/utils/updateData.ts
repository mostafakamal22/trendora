import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import handleError from "./handleError";

type Props = {
  url: string;
  data: object;
  headers?: AxiosRequestHeaders;
};

export default async function updateData<T>({
  url,
  data,
  headers,
}: Props): Promise<AxiosResponse<T, unknown> | void> {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}${url}`,
      data,
      {
        headers,
      }
    );

    console.log(res.data);

    return res;
  } catch (error: unknown) {
    handleError(error);
  }
}
