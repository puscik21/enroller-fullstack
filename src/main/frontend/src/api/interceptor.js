export const setupInterceptors = (apiInstance, logoutUser) => {
    apiInstance.interceptors.response.use(response => response,
        error => {
            console.log(`Error (${error.response?.status}) occurred: ${error}`);
            if (error.response?.status === 401 || error.response?.status === 403) {
                console.log("LOGGED OUT")
                logoutUser();
            }
            return Promise.reject(error);
        });

    apiInstance.interceptors.request.use(config => {
        const token = localStorage.getItem("bearerToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    })
}
