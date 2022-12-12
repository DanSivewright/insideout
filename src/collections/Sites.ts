import { CollectionConfig } from "payload/types";
import { isCompanyEditor } from "../access/isCompanyEditor";

const Sites: CollectionConfig = {
  slug: "sites",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isCompanyEditor("company"),
  },
  fields: [
    {
      name: "name",
      label: "Site Name",
      type: "text",
      required: true,
    },
    {
      name: "company",
      label: "Company",
      type: "relationship",
      relationTo: "companies",
      required: true,
    },
    {
      name: "mine",
      label: "Mine",
      type: "relationship",
      relationTo: "mines",
      required: true,
      validate: async (val, args) => {
        const { data, siblingData, payload } = args;

        let mine;
        if (payload && siblingData.company && val) {
          mine = await payload.findByID({
            collection: "mines",
            id: val,
          });
        }

        if (mine) {
          if (mine?.company?.id === siblingData.company) {
            return true;
          } else {
            return "The mine you selected does not belong to that company";
          }
        }
      },
    },
  ],
};
export default Sites;
