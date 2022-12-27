import payload from "payload";
import { FieldHook } from "payload/types";

export const populateCompany: FieldHook = async ({
  siblingData,
  value,
  operation,
}) => {
  if (operation === "create") {
    const site = await payload.findByID({
      collection: "sites",
      id: siblingData.site,
    });

    return site.mine.company.id;
  }
  return value;
};
