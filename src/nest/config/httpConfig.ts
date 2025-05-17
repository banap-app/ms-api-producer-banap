
export default () => ({
  http: {
    baseURL: process.env.HTTP_BASE_URL || 'http://localhost:8192',
    timeout: parseInt(process.env.HTTP_TIMEOUT, 10) || 5000,
    maxRedirects: parseInt(process.env.HTTP_MAX_REDIRECTS, 10) || 5,
  },
});
