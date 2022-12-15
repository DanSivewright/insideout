import { Access } from "payload/config";
import { FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const belongsToCompany =
  (collectionKey: string = "company"): Access<any, User> =>
  ({ req: { user } }) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "editor" || user.role === "user") {
      return {
        [collectionKey]: {
          equals: user.company,
        },
      };
    }
    return false;
  };
