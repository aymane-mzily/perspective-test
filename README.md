This is a simple web application to implement MBTI test using Laravel, Mysql & React.

Done by [MZILY Aymane](mailto:aymane.mzily@gmail.com)

## Getting started

Download [Docker Desktop](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose) will be automatically installed. make sure you have the latest version of [Compose](https://docs.docker.com/compose/install/).

You can skip this step if you don't need to build a docker image.

## Usage

Navigate in your terminal to the directory you cloned this and run the following commands:

```
composer install
npm install
```

Rename file .env.example to .env and change keys for database then run the following commands:

```
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

Enjoy!

The project is compatible with [Docker](https://www.docker.com/) you can install [Laravel Sail](https://laravel.com/docs/8.x/sail#installing-sail-into-existing-applications) and build the docker image with it.

