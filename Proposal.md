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

## Weekend Accomplishments

Over this weekend:
- [ ] Changed and fleshed out our new project idea and its MVPs
- [ ] Decided that we all want to learn the majority of the full MERN stack
     - [ ] All did extensive research on mongoDB, Mongoose, Express and Node JS
- [ ] Implemented new timeline and main responsibilities
     - [ ] Trung: Google Maps API
     - [ ] Tyler: OAuth
     - [ ] Anna: mongoDB schema and wireframes


## Potential Challenges

Aside from ReactJS/Redux, all of the technologies in this project are new to us, so we will have to learn them prior to implementation. There will also be a fair bit of user interaction, which might be tricky to handle (for example, users should be able to rate a driver once a package has been delivered.)
