import axios from "axios";

type Props = {
  url: string;
  token?: string;
};

export default async function fetchData<T>({ url, token }: Props): Promise<T> {
  axios.defaults.headers.common["token"] = token;

  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${url}`);

  return res?.data;
}
