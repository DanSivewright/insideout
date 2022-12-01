import { CollectionConfig } from "payload/types";
import slug from "../fields/slug";

const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Company Name",
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
      label: "Company Feature Images",
      fields: [
        {
          name: "featureImage",
          label: "Company Feature Image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "logo",
      label: "Company Logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "mines",
      label: "Mines",
      type: "relationship",
      relationTo: "mines",
      hasMany: true,
      admin: {
        isSortable: true,
      },
    },
    slug,
  ],
};

export default Companies;
