import { defineStore } from 'pinia';
import {store} from '@/store';
import { loginApi } from '@/api/auth';
import { LoginData } from '@/api/auth/types';
import { UserInfo } from '@/api/user';

export const useUserStore = defineStore('user', () => {
    const user = ref<UserInfo>({
        roles: [],
        perms: []
    });

    return {user};
});

function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
        loginApi(loginData).then((response) => {
            const {tokenType, accessToken} = response.data;
            // token.value = tokenType + ' ' + accessToken;
            resolve();
        }).catch(error => {
            reject(error);
        });
    });
}

/**
 * 在组件外部使用UserStore的钩子函数
 */
export function useUserStoreHook() {
    return useUserStore(store);
}