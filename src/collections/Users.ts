import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      label: "Fist Name",
      name: "firstName",
      type: "text",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
    },
    {
      name: "roles",
      saveToJWT: true,
      type: "select",
      defaultValue: ["user"],
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
      name: "company",
      saveToJWT: true,
      type: "relationship",
      relationTo: "companies",
      admin: {
        description:
          "This field sets which company that this user has access to.",
      },
    },
  ],
};

export default Users;
