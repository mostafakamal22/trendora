import axios, { AxiosRequestHeaders } from "axios";

type Props = {
  url: string;
  headers?: AxiosRequestHeaders;
};

export default async function fetchData<T>({
  url,
  headers,
}: Props): Promise<T> {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    headers,
  });

  console.log(res.data);

  return res?.data;
}
