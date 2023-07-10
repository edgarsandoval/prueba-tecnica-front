#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --prod

#satge 2
FROM debian:latest
RUN apt-get update && apt-get install -y apache2
COPY --from=node /app/dist/prueba-tecnica-front/ /var/www/html/

# Expose port (if needed)
EXPOSE 80

# Start Apache service
CMD ["apache2ctl", "-D", "FOREGROUND"]