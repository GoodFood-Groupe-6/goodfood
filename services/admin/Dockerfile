# Stage 1: Build the app
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:lts-alpine
# ENVIRONMENT VARIABLES
ENV RABBITMQ_URL="amqp://user:password@rabbitmq:5672/"
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
CMD ["node", "dist/main"]
EXPOSE 3000