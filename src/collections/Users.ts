import { CollectionConfig } from "payload/types";
import { isAdminFieldLevel } from "../access/isAdmin";
import { isEditorOrSelf } from "../access/isEditorOrSelf";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    depth: 0,
  },
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isEditorOrSelf(),
  },
  fields: [
    {
      type: "row",
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
      ],
    },
    {
      label: "Full Name",
      name: "name",
      type: "text",
      admin: {
        condition: () => false,
      },
      hooks: {
        beforeChange: [
          ({ data, originalDoc }) => {
            const first = data.firstName || originalDoc.firstName;
            const last = data.lastName || originalDoc.lastName;

            return `${first} ${last}`;
          },
        ],
      },
    },
    {
      name: "role",
      saveToJWT: true,
      type: "select",
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
      name: "company",
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
    {
      name: "mine",
      saveToJWT: true,
      type: "relationship",
      relationTo: "mines",
      admin: {
        description: "This field sets which mine that this user has access to.",
      },
    },
    {
      name: "sites",
      saveToJWT: true,
      type: "relationship",
      relationTo: "sites",
      hasMany: true,
      admin: {
        description: "This field sets which mine that this user has access to.",
      },
    },
  ],
};

export default Users;
