FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    nodejs npm

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm install

# Set up .env BEFORE npm run build so Vite can read the vars
RUN cp .env.example .env && \
    echo "VITE_EMAILJS_SERVICE_ID=service_88jcldf" >> .env && \
    echo "VITE_EMAILJS_TEMPLATE_ID=template_cr0xlst" >> .env && \
    echo "VITE_EMAILJS_PUBLIC_KEY=e7JFXUQwxsNH8rZo2" >> .env

RUN npm run build

EXPOSE 10000

CMD php -S 0.0.0.0:10000 -t public