import { getUser } from "../getUser";
import { Logger } from "rn-logging";

export const getKey = async (): Promise<string> => {
  try {
    Logger.info("Fetching user...");

    const user = await getUser();

    Logger.info(`Fetched user with UID: ${user?.uid}`);
    return `${user?.uid}`;
  } catch (err) {
    Logger.error("Failed to fetch user:", err);
    throw err; 
  }
};
