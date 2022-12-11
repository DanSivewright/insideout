import { CollectionConfig } from "payload/types";
import { isCompanyEditor } from "../access/isCompanyEditor";
import slug from "../fields/slug";
import { Company } from "../payload-types";

const Sites: CollectionConfig = {
  slug: "sites",
  admin: {
    useAsTitle: "name",
  },
  access: {
    // read: isCompanyEditor("mine", "company"),
    read: async ({ req: { user, payload } }) => {
      if (!user) return false;
      if (user.role === "admin") return true;
      const company: Company = await payload.findByID({
        collection: "companies",
        id: user.company,
      });
      if (!company) return false;

      return {
        mine: {
          // @ts-ignore
          equals: company.mines?.[0],
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
