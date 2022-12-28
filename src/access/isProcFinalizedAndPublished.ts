import { FieldAccess } from "payload/types";
import { User } from "../payload-types";

export const isProcFinalizedAndPublished: FieldAccess<
  { id: string; _status: string; state: string },
  unknown,
  User
> = ({ doc: { _status, state } = {} }) => {
  if (_status === "published" && state === "finalized") {
    return true;
  }
  return false;
};
