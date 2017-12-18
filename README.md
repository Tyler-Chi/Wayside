
# Wayside

## [Live Demo](https://stark-ocean-27601.herokuapp.com/)

### We'll go the distance

Wayside is a MERN stack web application that matches drivers already intending to go a certain way with customers needing to send packages.

## Technology and Libraries
  * MongoDB
  * NodeJS
  * ExpressJS
  * ReactJS
  * Redux
  * Google OAuth API
  * Google Map API

## Background and Overview

Have you ever had some free space in your car during a road trip and wanted to make a quick buck? Have you ever wanted a cheaper, faster, and more eco-friendly way to ship your packages?

Wayside uses Google Maps API to match drivers, who were already planning on driving somewhere, with customers, sending packages near that trip. Thanks to OAuth, drivers and customers can easily sign up with their Google accounts and begin delivering/sending packages quickly.

The delivery fee is calculated based on the extra distance the driver had to go compared to his original intended trip. Customers will then get to pick a driver based on the driver's date, price, and rating.

## Functionalities
- [ ] Drivers and Customers can sign up and login with Google+ API OAuth

![](https://github.com/trungvuh/Practice-for-Flex/raw/master/Giphys/Splash.gif)

- [ ] Drivers can create new trips, and drag pointer to alter their desired route

![](https://github.com/trungvuh/Practice-for-Flex/raw/master/Giphys/Trip_New.gif)

- [ ] Drivers can accept or deny delivery requests
- [ ] Drivers can see the list of his upcoming trips or past trips
- [ ] Customer can request a package be delivered
- [ ] Customers get matched with a driver based on their packages' trips and the drivers' trips, no further than a fixed radius
- [ ] Prices are calculated based on the difference distance between packages's trips and the drivers' trips
- [ ] Customers can see the list of their pending request order, or past orders

## Features
(this is where all the code snippets will go, I guess)

* Using Google Map API DirectionsRenderer DirectionsService, we were able to display the correct route for the driver's trip, as well as calculating its distance.

```JavaScript
displayRoute(origin, destination, service, display) {
  service.route({
    origin: origin,
    destination: destination,
    travelMode: 'DRIVING',
    avoidTolls: true
  }, (response, status) => {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
      alert('COULD NOT DISPLAY DIRECTIONS DUE TO: ' + status);
    }
  });
}

computeTotalDistance(result) {
  let route = result.routes[0];
  //use Math ceil to round up the total miles of the trip
  let tripDistance = Math.ceil((route.legs[0].distance.value * KMTOMILE));
  this.setState ({ tripDistance: tripDistance });
}
```

* Map location and styling was dependent on what stage of the form the customer was at and how far their window was scrolled down.

```JavaScript and CSS 
window.addEventListener("scroll", function(e){
  if (searchDriverButton.className === "button-driver-search on yes mapbutton"){
    if (window.scrollY > 580){
      let mid = window.innerWidth/2;
      HTMLMap.className="mapFix";
      HTMLMap.style.left = `${mid - 37  }px`;
    } else {
      HTMLMap.className="mapFlex";
      HTMLMap.style.left = "0px";
    }
  } else {
    HTMLMap.className = "mapMid";
  }
})
}
```

## Additional Resources

* [Implementation Timeline](https://github.com/Tyler-Chi/FlexProject/wiki/Implementation-Timeline)
* [Wireframes](https://github.com/Tyler-Chi/FlexProject/wiki/WireFrames)


## Future Improvement
- [ ] Package size and weight limits for different drivers
- [ ] Driver's ability to keep his trip on the search or to take it off, based on space availability
- [ ] Customers can rate drivers
