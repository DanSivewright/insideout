import { CollectionConfig } from "payload/types";
import { hasCompanyAccess } from "../access/hasCompanyAccess";
import { isAdmin } from "../access/isAdmin";
import slug from "../fields/slug";

const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "name",
    preview: () => null,
  },
  access: {
    create: isAdmin,
    read: hasCompanyAccess("id"),
    update: hasCompanyAccess("id"),
    delete: isAdmin,
  },
  versions: {
    drafts: true,
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
      name: "logo",
      label: "Logo",
      type: "upload",
      relationTo: "media",
    },
    slug,
  ],
};

export default Companies;