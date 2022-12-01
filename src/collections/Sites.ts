import { CollectionConfig } from "payload/types";
import slug from "../fields/slug";

const Sites: CollectionConfig = {
  slug: "sites",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      label: "Site Name",
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
    slug,
  ],
};

export default Sites;
