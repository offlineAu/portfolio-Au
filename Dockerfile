FROM php:8.4-cli

# System dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    nodejs npm

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

# Install backend deps
RUN composer install --no-dev --optimize-autoloader

# Install frontend deps + build
RUN npm install
RUN npm run build

# Render port
ENV PORT=10000

EXPOSE 10000

# IMPORTANT: bind to Render port properly
CMD php artisan serve --host=0.0.0.0 --port=${PORT}