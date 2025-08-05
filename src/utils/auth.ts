import { Storage } from "./storage";
import { AUTH_KEYS } from "@/constants";
export class Auth {
    static getAccessToken(): string {
        const isRememberMe = Storage.get<boolean>(AUTH_KEYS.REMEMBER_ME, false);

        return isRememberMe ? Storage.get(AUTH_KEYS.ACCESS_TOKEN, '') : Storage.sessionGet(AUTH_KEYS.ACCESS_TOKEN, '');
    }
}