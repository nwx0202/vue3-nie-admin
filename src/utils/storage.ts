export class Storage {
    // localStorage存储
    static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get<T>(key: string, defaultValue?: T): T {
        const value = localStorage.getItem(key);
        if (!value) return defaultValue as T;

        try {
            return JSON.parse(value);
        } catch {
            return value as unknown as T;
        }
    }

    static sessionSet(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static sessionGet<T>(key: string, defaultValue?: T): T {
        const value = sessionStorage.getItem(key);
        if (!value) return defaultValue as T;

        try {
            return JSON.parse(value);
        } catch {
            return value as unknown as T;
        }
    }
}