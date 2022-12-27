import { CollectionConfig } from "payload/types";
import { belongsToCompany } from "../access/belongsToCompany";
import { isCompanyEditor } from "../access/isCompanyEditor";

const Mines: CollectionConfig = {
  slug: "mines",
  admin: {
    useAsTitle: "name",
    group: "Admin",
  },
  access: {
    delete: isCompanyEditor("company"),
    update: isCompanyEditor("company"),
    create: isCompanyEditor("company"),
    read: belongsToCompany("company"),
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
      defaultValue: ({ user }) => user.company,
    },
  ],
};

export default Mines;
