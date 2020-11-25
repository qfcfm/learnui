import { User } from "./DataInterface";

export const LOGIN_CHANGE = "LOGIN_CHANGE"

export interface Action_login{
    type: string,
    user: User,
}
