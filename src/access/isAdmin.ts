import { Access } from "payload/config";
import { FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isAdmin: Access<any, User> = ({ req: { user } }) => {
  return Boolean(user?.roles?.includes("admin"));
};

export const isAdminFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({
  req: { user },
}) => {
  return Boolean(user?.roles?.includes("admin"));
};
