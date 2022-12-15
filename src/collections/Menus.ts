import { CollectionConfig } from "payload/types";
import link from "../fields/link";

const Menus: CollectionConfig = {
  slug: "menus",
  admin: {
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
};

export default Menus;
