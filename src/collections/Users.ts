import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../access/isAdmin";
import { isAdminOrSelf } from "../access/isAdminOrSelf";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "roles",
      saveToJWT: true,
      type: "select",
      hasMany: true,
      defaultValue: ["user"],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "User",
          value: "user",
        },
      ],
    },
    {
      name: "companies",
      saveToJWT: true,
      type: "relationship",
      relationTo: "companies",
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        description:
          "This field sets which company that this user has access to.",
      },
    },
  ],
};

export default Users;
