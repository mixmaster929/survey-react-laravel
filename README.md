### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/mixmaster929/survey-react-laravel.git
   ```
2. Install dependency Laravel
   ```sh
   composer install
   ```
3. Install NPM packages
   ```sh
   npm install
   npm run dev
   ```
4. Create table corresponds to .env
    ```js    
    DB_DATABASE=yourdatabase_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
   ```
5. Run migration & Seeder
   ```sh
   php artisan migrate --seed
   ```
6. Google Sign In (Insert to your .env)
   ```sh
    GOOGLE_CLIENT_ID='your_client_id'
    GOOGLE_CLIENT_SECRET='your_client_secret'
    GOOGLE_REDIRECT='your_callback_url'
   ```

<!-- USAGE EXAMPLES -->
## Usage

1. run server-side (Laravel)
   ```sh
   php artisan serve
   ```
2. See webpack.min js 
   ```sh
   mix.browserSync('your_url.test'); //if using Laravel Valet
   mix.browserSync('127.0.0.1:8000'); //if using artisan serve
   ```
3. run client-side (ReactJs)
   ```sh
   npm run hot
   ```
4. Default password
   ```sh
   setup in UserFactory
   default '123456'
   ```