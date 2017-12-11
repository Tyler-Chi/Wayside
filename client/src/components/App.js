import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
const Dashboard = () => <h2> Dashboard </h2>;
const TripNew = () => <h2> TripNew </h2>;
const Landing = () => <h2> Landing </h2>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/trips" component={Dashboard} />
          <Route path="/trips/new" component={TripNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
