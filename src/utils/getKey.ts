import { getUser } from "../getUser";

export const getKey = async () : Promise<string> => {
  const user = await getUser();
  return `${user.uid}`;
};