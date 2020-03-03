# Something Borrowed
[View Live](https://something---borrowed.herokuapp.com)

## Motivation 
To create a web application to help users save money and reduce wasteful purchasing. The idea was inspired through the groups' experiences purchasing items (video games, books, specialized home improvement tools, etc.) that are used only once or twice. Wouldn't it be great if you could see exactly what your friends, neighbors and acquaintances already have that they'd be willing to lend you? Something Borrowed fills that need!

## Summary
Something Borrowed facilitates friend-to-friend lending which helps users save money and reduce wasteful purchasing of items to be used only once or twice. 

## Details
On home page load users are presented with a landing page and the option to sign in or create an account. This process is handled using Google Authentication. Once users create an account they can create or request to join existing groups and add items they are willing to lend out to the members of those groups. They can view the items that the other group members have added and make requests to borrow them. The requester and item owner can then message back and forth until a location and time for pickup are agreed upon and then the owner can confirm the request. If a mutually agreeable location and time cannot be found the owner can deny the request or the requester can delete it. Users, items, groups and messages are all stored in MySQL and associated with each other as appropriate. Sequelize is used to handle MySQL connection and queries. This application is organized using the Model-View-Controller (MVC) design pattern. Once database data is gathered or altered, the view updates from the Handlebars templates using a page reload. Bootstrap was used as a jumping off point for styling and custom CSS rules were added as necessary to achieve desired layout and design. 

## Future Development
Some ideas for future development include integration with Google Maps and Calendar so that users can suggest locations and have calendar invites sent out automatically once exchange details have been agreed upon. Another idea would be to integrate with PayPal or another money handling service and allow users to set a deposit or fee for borrowing expensive items which could help mitigate concerns regarding items not being returned.

## Role
Part of a four person developer team. Contributed to design, responsible for creating media queries and altering as needed to make fully  responsive. Authored code related to user authentication, storage of users in MySQL and API routes for users. Worked closely with [Thomas Rodgers](https://github.com/trodge) to complete all other MySQL storage/associations and API routes. Responsible for Handlebars templates and created graphic logo and favicon.

## Additional Collaborators
[Christina Chon](https://github.com/christinachon)
<br/>[Matt Jennings](https://github.com/Hollyw00d)
<br/>[Thomas Rodgers](https://github.com/trodge)

## Technologies
HTML
<br/>Handlebars
<br/>CSS
<br/>JavaScript
<br/>jQuery
<br/>MySQL
<br/>Node.js
<br/>Express
<br/>Heroku
**Node Packages:** 
<br/>express, express-handlebars, mysql2, sequelize, google-auth-library, nodemailer, nodemon, dotenv, cookie-parser
