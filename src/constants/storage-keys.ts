// 用户认证相关
export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';
export const REMEMBER_ME_KEY = 'remember_me';

// 认证相关集合
export const AUTH_KEYS = {
    ACCESS_TOKEN: ACCESS_TOKEN_KEY,
    REFRESH_TOKEN: REFRESH_TOKEN_KEY,
    REMEMBER_ME: REMEMBER_ME_KEY
} as const;