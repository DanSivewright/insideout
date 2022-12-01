import { CollectionConfig } from "payload/types";
import slug from "../fields/slug";

const Mines: CollectionConfig = {
  slug: "mines",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
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
      name: "sites",
      label: "Sites",
      type: "relationship",
      relationTo: "sites",
      hasMany: true,
      admin: {
        isSortable: true,
      },
    },
    slug,
  ],
};

export default Mines;
