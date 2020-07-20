const clientFiles = require.context('./client', false, /\.js$/);
const API = {};
clientFiles.keys().forEach((key) => {
    const serviceName = key.replace(/(\.\/|\.js)/g, '');
    API[serviceName] = new (clientFiles(key).default)();
});

Object.values(API).forEach((client) => {
    if (!process.env.NODE_ENV === 'development') return;
    client.http.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error);
            if (error.response) console.log(error.response);
            return Promise.reject(error);
        }
    );
});

export default API