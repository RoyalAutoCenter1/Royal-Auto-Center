# ---------- Etapa 1: build de React/Vite ----------
FROM node:20-alpine AS build

WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm ci

# Copia el código fuente
COPY . .

# Variables VITE_* inyectadas en build time (Railway: configurar como
# variables del servicio, se pasan aqui como build args).
ARG VITE_AUTH_AUTHORITY
ARG VITE_AUTH_CLIENT_ID
ARG VITE_AUTH_REDIRECT_URI
ARG VITE_AUTH_POST_LOGOUT_REDIRECT_URI
ARG VITE_API_BASE_URL
ENV VITE_AUTH_AUTHORITY=$VITE_AUTH_AUTHORITY \
    VITE_AUTH_CLIENT_ID=$VITE_AUTH_CLIENT_ID \
    VITE_AUTH_REDIRECT_URI=$VITE_AUTH_REDIRECT_URI \
    VITE_AUTH_POST_LOGOUT_REDIRECT_URI=$VITE_AUTH_POST_LOGOUT_REDIRECT_URI \
    VITE_API_BASE_URL=$VITE_API_BASE_URL

# Genera el build de producción
RUN npm run build

# ---------- Etapa 2: servir con Nginx ----------
FROM nginx:alpine

# Vite genera la carpeta dist
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=15s --retries=5 \
  CMD wget -qO- http://localhost:80 || exit 1