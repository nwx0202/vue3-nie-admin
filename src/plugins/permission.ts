import { useUserStore } from "@/store";

// 判断是否有权限
export function hasAuth(value: string | string[], type: 'button' | 'role' = 'button') {
    const {roles, perms} = useUserStore().user;
    if (type === 'button' && roles.includes('ROOT')) {
        return true;
    }

    const auths = type === 'button' ? perms : roles;
    return typeof value === 'string' ? auths.includes(value) : value.some(perm => auths.includes(perm));
};