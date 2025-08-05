export interface LoginData {
    username: string;
    password: string;
}

export interface LoginResult {
    accessToken?: string;
    expires?: number;
    refreshToken?: string;
    tokenType?: string;
}