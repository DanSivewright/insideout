import { CollectionConfig } from "payload/types";
import { isCompanyEditor } from "../access/isCompanyEditor";
import slug from "../fields/slug";

const Mines: CollectionConfig = {
  slug: "mines",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isCompanyEditor("company"),
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
