import axios from 'axios';
import { useCallback } from 'react';

const useServiceProvider = () => {
    const baseURL = import.meta.env.VITE_AXIOS_BASE_URL;

    if (!baseURL) {
        throw new Error('VITE_AXIOS_BASE_URL is not defined');
    }

    const api = axios.create({
        baseURL,
    });

    const getData = useCallback(
      async (endpoint) => {
        try {
          const response = await api.get(endpoint);
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      [api]
    );

    const postData = useCallback(async (endpoint, data) => {
        try {
            const response = await api.post(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [api]);

    const putData = useCallback(async (endpoint, data) => {
        try {
            const response = await api.put(endpoint, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [api]);

    const deleteData = useCallback(async (endpoint) => {
        try {
            const response = await api.delete(endpoint);
            return response.data;
        } catch (error) {
            throw error;
        }
    }, [api]);

    return { getData, postData, putData, deleteData };
};

export default useServiceProvider;