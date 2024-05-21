# TradeNetwork

**A Social Network Built with React and Express**

TradeNetwork is a social networking platform where users can trade posts with each other. Originally conceived as an e-commerce website, it evolved into a social network during development. This project demonstrates my JavaScript skills, particularly with React and Express.

**Check It Out!**: [TradeNetwork](https://tdnetwork.herokuapp.com/)

## Key Features

- **User Registration and Authentication**
  - Allows new users to register and securely log in using Google Auth Services.

- **Post Trading Functionality**
  - Users can create, modify, and trade posts with other users.

- **Responsive Design**
  - The website is fully responsive, ensuring a seamless experience across different devices.

## Technologies Used

- **React**
  - A JavaScript library for building user interfaces.

- **Node.js**
  - A JavaScript runtime built on Chrome's V8 JavaScript engine.

- **Express**
  - A minimal and flexible Node.js web application framework.

- **MongoDB**
  - A NoSQL database for storing user and post data.

- **Google Auth Services**
  - For secure user authentication.

## Setup

1. Install the dependencies:

    ```bash
    npm run install-dependencies
    ```

2. Populate the `.env` file in the root directory:

    ```
    REACT_APP_PORT=5000
    REACT_APP_MONGO_URI="Your MongoDB URI"
    REACT_APP_GOOGLE_CLIENT_ID="Your Google Client ID"
    REACT_APP_GOOGLE_CLIENT_SECRET="Your Google Client Secret"
    ```

3. Build and launch the application:

    ```bash
    npm run prod
    ```

## Endpoints

### User Routes

 - **PATCH /users/:id** Add money to a user's account.

### Item Routes

- **POST /items** Create a new item.
- **GET /items** Retrieve all items.
- **PATCH /items** Modify an item if the user is the owner.
- **GET /items/:id** Get information for a specific item.
- **DELETE /items/:id** Delete a specific item if the user is the owner.
- **PATCH /items/:id** try to buy a specific item, it will revert if user dosent have enough balance.

### Authentication Routes

- **POST /auth/google** Authenticate user using Google OAuth.
