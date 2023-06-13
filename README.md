<div align="center">
  <br>
  <h1><strong>Inventory Management using ExpressJS</strong></h1
  <br>
</div>

## Technologies
- [Node Js](https://nodejs.org/en/)
- [Express Js](https://expressjs.com/)
- [Postman](https://www.postman.com/)
- [Postgree SQL](https://www.postgresql.org/)

## Built With
![Express](https://img.shields.io/badge/express-v4.18.2-pink?style=flat)
![Cors](https://img.shields.io/badge/cors-v2.8.5-green?style=flat)
![Bcrypt](https://img.shields.io/badge/bcrypt-v5.1.0-blue?style=flat)
![Dotenv](https://img.shields.io/badge/dotenv-v16.0.3-orange?style=flat)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Multer](https://img.shields.io/badge/multer-v1.4.5-ray?style=flat)
![Multer Storage Cloudinary](https://img.shields.io/badge/multer_storage_cloudinary-4.0.0-ray?style=flat)
![Cloudinary](https://img.shields.io/badge/cloudinary-v1.37.1-ray?style=flat)
![Nodemon](https://img.shields.io/badge/nodemon-v2.0.22-white?style=flat)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Run App
-   Requirement:

    -   Install [Node.js](https://nodejs.org)
    -   Recommended to use [NPM](https://www.npmjs.com/)

-   Clone the repo.

    ```bash
    git clone https://github.com/Deniansyah/inventory-management.git
    ```

    ```bash
    cd inventory-management
    ```
  
-   Create the database with run file base.sql
  
-   Import COLLECTION_INVMANA.json to Postman
  
-   Set up your ENV
  
-   Install the dependencies.

    ```bash
    npm install
    ```
    
-   Then

    ```
    npm run dev
    ```
    
 -  Open Postman
  
 Run the development server and open [http://localhost:YOUR_PORT](http://localhost:YOUR_PORT)
  

## Main End Point
|url|method|authorizaton|desc|
|---|------|------|----|
|/auth/login|POST|All|Login admin or operator|
|/users|GET|Only admin|Get all data of users supports filter(page,limit,searchBy,search,sortby,sort) dan pagination|
|/users|POST|Only admin|Register new user with coloumn name, email, password, role(1 = admin & 2 = operator), picture|
|/users/:id|PATCH|Only admin|Update user|
|/users/:id|DELETE|Only admin|Delete user|
|/users/:id|GET|Only admin|Get detail of user|
|/upload|PATCH|All|Upload picture for user with token from login|
|/product|GET|Only operator|Get all data of product supports filter(page,limit,searchBy,search,sortby,sort) dan pagination|
|/product|POST|Only operator|Create new product with coloumn picture, name, description, price, stock|
|/product/:id|PATCH|Only operator|Update product|
|/product/:id|DELETE|Only operator|Delete product|
|/product/:id|GET|Only operator|Get detail of product|
|/product/upload/:id|PATCH|Only operator|Upload picture for product with id product|
|/stock|GET|Only operator|Get all data of stock|
|/stock|POST|Only operator|Create new stock with coloumn product_id, users_id, date, type|
|/stock/:id|PATCH|Only operator|Update stock|
|/stock/:id|DELETE|Only operator|Delete stock|
|/stock/:id|GET|Only operator|Get detail of stcok|

  
  
  
  
  
  
  
  
  
  
  
  
  
