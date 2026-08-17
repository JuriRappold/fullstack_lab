import type {userDTO} from "@fullstack-lab/utils";

export type fullUser = Omit<Required<userDTO>, 'password'>;
export type halfUser = Omit<fullUser, 'token'>;
