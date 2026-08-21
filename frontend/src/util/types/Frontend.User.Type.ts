import type {userDTO} from "@fullstack-lab/utils";

export type full_user = Omit<Required<userDTO>, 'password'>;
export type halfUser = Omit<full_user, 'token'>;

