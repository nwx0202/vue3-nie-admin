import axios, {InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import {useUserStoreHook} from '@/store/modules/user.store';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Auth } from './auth';

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
});

// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = Auth.getAccessToken();
    if (config.headers.Authorization !== 'no-auth' && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
        delete config.headers.Authorization;
    }

    return config;
}, (error: any) => {
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    const {code, msg} = response.data;
    if (code === '00000') {
        return response.data;
    }

    ElMessage.error(msg || '系统出错');
    return Promise.reject(new Error(msg || 'Error'));
}, (error: any) => {
    if (error.response.data) {
        const {code, msg} = error.response.data;
        if (code === 'A0230') {
            ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                localStorage.clear();
                window.location.href = '';
            });
        } else {
            ElMessage.error(msg || '系统出错');
        }
    }
    return Promise.reject(error);
});

export default service;