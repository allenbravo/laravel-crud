# Laravel + React CRUD

A CRUD web application built with Laravel 12 and React, featuring a REST API backend and a recreated WordPress theme frontend.

## Tech Stack
- Laravel 12
- React 19
- TailwindCSS
- MySQL
- Vite

## Features
- REST API Endpoints (Routes → Controller → Services → Model)
- CRUD for relational data (FeatureCategory hasMany Features)
- File upload for feature images
- Recreated WordPress theme (Techmax) as React frontend

## Requirements
- PHP 8.2+
- Composer
- Node.js v20+
- MySQL / MariaDB
- XAMPP or Laragon

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/allenbravo/laravel-crud.git
cd laravel-crud

### 2. Install PHP dependencies
composer install

### 3. Install JS dependencies
npm install

### 4. Configure environment
cp .env.example .env
php artisan key:generate

### 5. Update .env database settings
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_crud
DB_USERNAME=root
DB_PASSWORD=

### 6. Run migrations
php artisan migrate

### 7. Create storage link
php artisan storage:link

### 8. Start the servers
php artisan serve
npm run dev

### 9. Open in browser
http://localhost:8000

## API Endpoints

### Feature Categories
- GET /api/feature-categories
- POST /api/feature-categories
- GET /api/feature-categories/{id}
- PUT /api/feature-categories/{id}
- DELETE /api/feature-categories/{id}

### Features
- GET /api/features
- POST /api/features
- GET /api/features/{id}
- PUT /api/features/{id}
- DELETE /api/features/{id}