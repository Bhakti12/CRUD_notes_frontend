import axios, { AxiosRequestConfig } from "axios";

export const apiRequest = async<T> (
    url: string,
    method: string,
    data?: any,
    headers = {}
): Promise<T> => {
    try{
        const config : AxiosRequestConfig = {
            url: url,
            method: method,
            data: data,
            headers: headers
        };

        const response = await axios(config);
        return response.data as T;
    } catch(serviceErr: any) {
        console.error("API request error", serviceErr);
        throw serviceErr.response?.data || serviceErr.message;
    }
};