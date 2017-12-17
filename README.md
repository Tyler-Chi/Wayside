
# Wayside

## [Live Demo](https://stark-ocean-27601.herokuapp.com/)

### We'll go the distance

Wayside is a MERN stack web application that matches drivers already intending to go a certain way with customers needing to send packages.

## Background and Overview

Have you ever had some free space in your car during a road trip and wanted to make a quick buck? Have you ever wanted a cheaper, faster, and more eco-friendly way to ship your packages?

Wayside uses Google Maps API to match drivers, who were already planning on driving somewhere, with customers, sending packages near that trip. Thanks to OAuth, drivers and customers can easily sign up with their Google accounts and begin delivering/sending packages quickly.

The delivery fee is calculated based on the extra distance the driver had to go compared to his original intended trip. Customers will then get to pick a driver based on the driver's date, price, and rating.

## Implementation Timeline:

#### Monday
* Have the full stack running - **Tyler**
    * Bare bones front end - can fetch and post data via Postman  
* Possibly: OAuth basics - users can log in but not do much else - **Trung**

#### Tuesday
* Drivers and Trips are made - **Anna**
* Splash page - **Anna**
* Drivers should be able to create trips, see details of each trip - **Tyler**
    * Base of Routes via Google Maps API needed  - **Trung**

#### Wednesday
* Customers are made. Will be able to create an order request, see past delivered packages - **Anna**
* Implement Orders class - **Tyler**
* Display new calculated trip, including price - **Trung**

#### Thursday

* Implement search for the customer. Only display trips within close proximity (15-20miles radius) and valid delivered-by date - **Trung**
    * Should be able to see a list of trips that match the query. - **Anna**
    * Should also be able to make a request to have their item delivered on that trip.
    * Driver should be able to accept/decline delivery of that item for their trips.

#### Friday
* Implement the rating system - **Tyler**
    * Once the item has been delivered, Customer should be able to rate the delivery service. - **Trung**
* Styling via CSS - **Anna**

#### Saturday
* Implement driver's ability to keep on taking more packages => includes/ withdraw his trip from future search list. - **Tyler**
* Styling via CSS - **Anna**
* Fixing Bugs - **Trung**

#### Sunday
* Implement customer's ability to specify package's size (fixed) as well as driver declaring his car maximum capability. - **Tyler**
* Improve search features - **Trung**
* Styling via CSS - **Anna**

#### Monday
* Touching up and turning in - **Team**

## MVP & Functionalities
- [ ] Drivers and Customers can sign up and login with Google+ API OAuth
- [ ] Drivers can post trips
- [ ] Customer can request a package be delivered
- [ ] Prices are calculated based on the packages's trips and the drivers' trips
- [ ] Customers get matched with a driver based on their packages' trips and the drivers' trips
- [ ] Drivers can accept and deny delivery requests
- [ ] Customers can rate drivers

##### Bonus Features
- [ ] Package size and weight limits for different drivers

## Technology

In this project, we will use the MERN stack.

The backend will consist of Mongo/Mongoose and Express/NodeJS. The front end will be handled with React/Redux. In the course of this project, we will also implement OAuth (Google authentication, so that users can log in with their Google accounts.) We will also use the Google Maps API, in order to calculate the distances between locations.

## Potential Challenges

Aside from ReactJS/Redux, all of the technologies in this project are new to us, so we will have to learn them prior to implementation. There will also be a fair bit of user interaction, which might be tricky to handle (for example, users should be able to rate a driver once a package has been delivered.)

## Weekend Accomplishments

Over this weekend:
- [ ] Changed and fleshed out our new project idea and its MVPs
- [ ] Decided that we all want to learn the majority of the full MERN stack
     - [ ] All did extensive research on mongoDB, Mongoose, Express and Node JS
- [ ] Implemented new timeline and main responsibilities
     - [ ] Trung: Google Maps API
     - [ ] Tyler: OAuth
     - [ ] Anna: mongoDB schema and wireframes

## Wireframes

#### Splash Page
![Splash Page](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Splash%20Page.png?raw=true)

#### Customer- Main Page
![Customer - Main Page](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Customer%20-%20Main%20Page.png)

#### Customer - Pick a Driver
![Customer - Pick a Driver](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Customer%20-%20Pick%20a%20Driver%20.png)

#### Customer - Pick a Driver - Confirmation Page
![Customer - Pick a Driver - Confirmation Page](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Customer%20-%20Pick%20a%20Driver%20-%20Confirmation%20Page.png)

#### Customer - Past Packages
![Customer - Past Packages](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Customer%20-%20Past%20Packages.png)

#### Driver - Main Page
![Driver - Main Page](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Driver%20-%20Main%20Page.png)

#### Driver - Past Deliveries - Index
![Driver - Past Deliveries - Index](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Driver%20-%20Past%20Deliveries%20-%20Index.png)

#### Driver - Past Deliveries - Item
![Driver - Past Deliveries - Item](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Driver%20-%20Past%20Deliveries%20-%20Item.png)

#### Driver - Upcoming Deliveries - Index
![Driver - Upcoming Deliveries - Index](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Driver%20-%20Upcoming%20Deliveries%20-%20Index.png)

#### Driver - Upcoming Deliveries - Item
![Driver - Upcoming Deliveries - Item](https://github.com/Tyler-Chi/FlexProject/blob/master/Wireframes/Driver%20-%20Upcoming%20Deliveries%20-%20Item.png)
