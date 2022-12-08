import { CollectionConfig } from "payload/types";
import { hasCompanyAccess } from "../access/hasCompanyAccess";
import { isAdmin } from "../access/isAdmin";
import slug from "../fields/slug";

const Mines: CollectionConfig = {
  slug: "mines",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: hasCompanyAccess("company"),
    update: hasCompanyAccess("company"),
    delete: isAdmin,
    create: hasCompanyAccess("company"),
  },
  fields: [
    {
      name: "name",
      label: "Mine Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "richText",
      required: true,
    },
    {
      name: "featureImages",
      type: "array",
      label: "Feature Images",
      fields: [
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "company",
      label: "Company",
      type: "relationship",
      relationTo: "companies",
      required: true,
      defaultValue: ({ user }) => {
        if (!user.roles.includes("admin") && user.company.id) {
          return user.company.id;
        }
      },
    },
    slug,
  ],
};

export default Mines;
