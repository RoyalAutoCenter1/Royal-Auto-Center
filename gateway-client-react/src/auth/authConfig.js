// Variables VITE_* inyectadas en build time. En Railway se configuran como
// variables de entorno del servicio del frontend antes de "npm run build".
export const authConfig = {
    authority: import.meta.env.VITE_AUTH_AUTHORITY || "http://localhost:9000",
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID || "react-client",
    redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI || "http://localhost:8090/callback",
    response_type: "code",
    scope: "openid",
    post_logout_redirect_uri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI || "http://localhost:8090"
};