import { Access } from "payload/config";
import { FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const belongsToCompanyAndAuthored =
  (collectionKey: string = "company"): Access<any, User> =>
  ({ req: { user } }) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "editor") {
      return {
        [collectionKey]: {
          equals: user.company,
        },
      };
    }
    if (user.role === "user") {
      return {
        and: [
          {
            [collectionKey]: {
              equals: user.company,
            },
          },
          {
            author: {
              equals: user.id,
            },
          },
        ],
      };
    }
    return false;
  };
