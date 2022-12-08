import { Access } from "payload/config";
import React from "react";
import { User } from "../payload-types";

export const hasCompanyAccess =
  (collectionKey: string = "company"): Access<any, User> =>
  ({ req: { user } }) => {
    // console.log(user.companies.mines);
    if (!user) return false;
    if (user.roles.includes("admin")) return true;
    if (user.roles.includes("editor")) {
      return {
        or: [
          {
            [collectionKey]: {
              in: user.company,
            },
          },
          {
            [collectionKey]: {
              exists: false,
            },
          },
        ],
      };
    }

    return false;
  };
