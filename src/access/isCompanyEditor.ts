import { Access } from "payload/config";
import { FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isCompanyEditor =
  (collectionKey: string = "company", subKey?: string): Access<any, User> =>
  ({ req: { user } }) => {
    console.log(user);
    if (!user) return false;
    if (user.role === "admin") return true;
    if (user.role === "editor") {
      return {
        [collectionKey]: {
          equals: user.company,
        },
        // [collectionKey]: {
        //   [subKey]: {
        //     in: user.company.mines,
        //   },
        // },
      };
    }
    return false;
  };
