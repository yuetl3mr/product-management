![Screenshot 2024-08-30 164106](https://github.com/user-attachments/assets/e22e996d-8b7b-4556-8f9c-44899da48e60)# E-commerce Website

This project is an E-commerce website built using Node.js, Express.js, and Pug. The website allows users to browse products, add items to their cart, and make purchases. The website's front-end is built using Pug templates and styled with CSS.

## Features

- **User Authentication**: Users can register, log in, and manage their accounts.
- **Product Catalog**: Browse a wide range of products categorized for easy navigation.
- **Product Details**: View detailed information, including images, descriptions, and pricing.
- **Shopping Cart**: Add products to your cart, update quantities, and proceed to checkout.
- **Order Management**: Users can view their order history and track current orders.
- **Admin Panel**: Admins can manage products, categories, and view sales analytics.
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML (Pug), CSS
- **Database**: MongoDB
- **Templating Engine**: Pug
- **Session Management**: express-session

## Installation

### Prerequisites

Make sure you have the following installed on your local development environment:

- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/) 
- [Git](https://git-scm.com/)

### Steps to Set Up

1. **Clone the repository**:
```bash
git clone https://github.com/yuetl3mr/product-management
````
2. **Navigate to the project directory:**:
```bash
cd product-management
````
4. **Set up environment variables:**
Create a .env file in the root directory.
Add the following variables
````bash
   PORT=3000
   MONGO_URL=YOUR_MONGO_URL
   CLOUD_NAME=YOUR_CLOUDINARY_NAME
   CLOUD_KEY=YOUR_CLOUDINARY_KEY
   CLOUD_SECRET=YOUR_CLOUDINARY_SECRET
````
5. **Run the application::**
````bash
 npm run start
````
## Usage

Once the application is running, you can access it by navigating to `http://localhost:3000` in your web browser. Here’s a quick overview of how to use the features:

### User Authentication

- **Register**: Click on the “Register” link in the navigation bar to create a new account.
- **Login**: Click on the “Login” link to access your existing account.
- **Account Management**: Access your profile from the “Account” section to update your information or change your password.

### Product Catalog

- **Browse Products**: Navigate through categories to view different products.
- **Search**: Use the search bar to find specific items quickly.

### Product Details

- **View Details**: Click on a product to view detailed information, including images and pricing.
- **Add to Cart**: Add items to your cart from the product detail page.

### Shopping Cart

- **View Cart**: Click on the cart icon in the navigation bar to view your cart.
- **Update Cart**: Update quantities or remove items as needed.
- **Checkout**: Proceed to checkout to complete your purchase.

### Order Management

- **View Orders**: View your order history and track the status of current orders from the “Orders” section in your account.

### Admin Panel

- **Manage Products**: Add, update, or remove products.
- **Manage Categories**: Create or update product categories.
- **View Sales Analytics**: Access reports and analytics on sales performance.

### Customer Support

- **Live Chat**: Use the live chat feature to get assistance from customer support representatives.

## Some Demo
### Client
![Screenshot 2024-08-30 163307](https://github.com/user-attachments/assets/63548b67-0dcc-4bf2-b149-4a8483802de8)
![Screenshot 2024-08-30 163732](https://github.com/user-attachments/assets/b350d44b-6715-4467-8443-e91fa9db5a0a)
![Screenshot 2024-08-30 163851](https://github.com/user-attachments/assets/db13a9ab-aa24-478e-9402-cde69b3403f2)
![Screenshot 2024-08-30 164106](https://github.com/user-attachments/assets/c7ef7b71-f15a-4e95-babe-e66f0cab8b41)
![Screenshot 2024-08-30 164123](https://github.com/user-attachments/assets/33a8c4a7-6757-495a-b957-3c9aa2b739f1)
![Screenshot 2024-08-30 164534](https://github.com/user-attachments/assets/210e083b-3601-4949-9b22-9d76716fda2d)
### Admin
![Screenshot 2024-08-30 164142](https://github.com/user-attachments/assets/eca89aeb-b3d1-4849-8524-03eee1bbde7b)
![Screenshot 2024-08-30 164159](https://github.com/user-attachments/assets/bd827b6b-6684-4d76-93cc-3fd7872f0c02)
![Screenshot 2024-08-30 164212](https://github.com/user-attachments/assets/9445cd55-eed4-46b3-ba9b-8244308f0ca9)

## Contributing
We welcome contributions to improve this project. To contribute:
   1. Fork the repository.
   2. Create a new branch for your changes.
   3. Make your modifications and test thoroughly.
   4. Submit a pull request with a description of your changes.
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
