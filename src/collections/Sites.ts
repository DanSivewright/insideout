import { CollectionConfig } from "payload/types";
import { hasCompanyAccess } from "../access/hasCompanyAccess";
import slug from "../fields/slug";

const Sites: CollectionConfig = {
  slug: "sites",
  admin: {
    useAsTitle: "name",
  },
  access: {
    // read: hasCompanyAccess("mine"),
    read: ({ req: { user } }) => {
      console.log(user);
      return {
        mine: {
          in: user.companies.mines,
        },
      };
    },
  },
  fields: [
    {
      name: "name",
      label: "Site Name",
      type: "text",
      required: true,
    },
    {
      name: "mine",
      label: "Mine",
      type: "relationship",
      relationTo: "mines",
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
    slug,
  ],
};

export default Sites;
