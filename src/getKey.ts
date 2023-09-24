import { getUser } from "./getUser";
import { getAppName } from "./getAppName";

export const getKey = async () : Promise<string> => {
  const user = await getUser();
  return `${user?.email || user.uid}-${getAppName()}`;
};