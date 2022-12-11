import { Access } from "payload/config";
import { User } from "../payload-types";

export const isEditorOrSelf =
  (collectionKey: string = "company"): Access<any, User> =>
  ({ req: { user } }) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "editor") {
      return {
        or: [
          {
            [collectionKey]: {
              equals: user.company,
            },
          },
          {
            id: {
              equals: user.id,
            },
          },
        ],
      };
    }
    return false;
  };
