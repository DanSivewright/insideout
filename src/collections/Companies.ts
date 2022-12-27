import { CollectionConfig } from "payload/types";
import { belongsToCompany } from "../access/belongsToCompany";
import { isAdmin } from "../access/isAdmin";
import { isCompanyEditor } from "../access/isCompanyEditor";

const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "name",
    preview: () => null,
    group: "Admin",
  },
  access: {
    read: belongsToCompany("id"),
    update: isCompanyEditor("id"),
    delete: isAdmin,
    create: isAdmin,
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
  ],
};

export default Companies;
