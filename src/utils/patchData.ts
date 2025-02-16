import axios from "axios";

type Props = {
  url: string;
  data: object;
  token?: string;
};

export default async function patchData<T>({
  url,
  data,
  token,
}: Props): Promise<T> {
  axios.defaults.headers.common["token"] = token;

  const res = await axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}${url}`,
    data
  );

  return res.data;
}
