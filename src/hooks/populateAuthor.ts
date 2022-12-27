import { FieldHook } from "payload/types";

export const populateAuthor: FieldHook = async ({
  req: { user },
  value,
  operation,
}) => {
  if (operation === "create") {
    return user?.id;
  }

  return value;
};
