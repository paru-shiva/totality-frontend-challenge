# Property Booking Application

This Platform is for Booking the properties online

## Description

This Platform is built with various technologies like node express and react enabling the purchase of
properties in different locations of india, based on differnt filters like property budget and location.
It is built using bootstrap, can be accessible in both desktop and mobile.

### Dependencies

- node
- bootstrap
- react
- mysql2
- express
- js-cookie
- react-router-dom
- react-icons
- bcrypt
- jsonwebtoken
- cors

## Frontend

- The Forntend mainly consists of different react reusable components like Cart, Header, Home, Login, Notfound, PropertyCard, PropertyDetails, ProtectedRoutes, CartContext.

### App.js

- The Application mainly has some important routes like Home route -> '/' , Login route -> '/login' ,
  PropertyDetails route -> '/properties/:id' , Cart route -> '/cart'

- All the routes in the application are protected with the help of ProtectedRoutes component except Login route.

- The ProtectedRoutes component internally uses Outlet and Navigate components for the appropriate redirection.

- All the Routes of the application are wrapped inside the Routes component including Notfound component.

### Login Component

- The login component of the application mainly renders two items i.e signup section and login section.

- The signup section takes user id and password from the users and registers the user in the server if the user doesnot already exist in the database. it shows appropriate messages incase of signup success and failure.

- The login section takes usesr email and password and checks it in the server and enables the user to login and see the property details in case of successful login. shows the error message to the user incase of login failure.

### Home Component

- The Home component internally uses the components like PropertyCard and Header Components.

- The Home componen fetches the properties data object from the server in json format and stores it the state of the component.

- The data fetched by the Home component is shared with the _PropertyCard component_ to display all the property details to the user.

### Header Component

- Header Component contains important links like Home, Cart, logout

- Header component fetches the details of the user and displays it in the the Header of all protected pages.

- Header component is used commonly in all the pages except the login page.

### PropertyDetails Component

- PropertyDetails component is displayed when the user clicks on the link in Home Component

- Based on the url parameters the PropertyDetails component fetches appropriate property details from the server using effect hook and displays it to the user.

- When the user clicks on the add to cart button in the Property Detials component, the detials of the property are added to the react context.

### Cart Component

- The Cart Component takes the data from the Cart Context using useContext Hook and displays the data to the user. It also calculates the
  total amout of the properties entered into the cart by the user.

- The cart component also collects the user data like user address and payment details.

## Backend

- Backend of Property Booking application uses various libraries like jsonwebtoken, mysql2, express, bcrypt, cors.

- It uses middleware to check the user authentication the middleware function to check the authentication is 'authenticateToken'

- The backend uses various endpoints to process the user requests.

- /login route to log the user in to the application. (sends jwt token to user on successful authentication)

- /properties route is to provide the user with the details of the properties.

- /signup route is to create the user.

- /getemail route is for sending the user email to the user based on the token received.
