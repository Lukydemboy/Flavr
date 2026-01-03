import { User } from "@/context/authContext";
import { Visibility } from "../enums/visibility";

export type Group = {
  id: string;
  name: string;
  description: string | null;
  visibility: Visibility;
  createdAt: Date;
  members: User[];
  owner: User;
};
