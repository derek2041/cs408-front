import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './NavigationBar';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />

        <Switch>

          <Route path="/one/" exact render={ () => {
            return (
              <img
                src="https://s3-media1.fl.yelpcdn.com/bphoto/AELV_t3DBJaPZCsQOGcsRg/o.jpg"
                alt=""
              />
            );
          }} />

          <Route path="/two/" exact render={ () => {
            return (
              <img
                src="https://s3-media2.fl.yelpcdn.com/bphoto/XRTwKMvLOFswl6bywAu92g/o.jpg"
                alt=""
              />
            );
          }} />

          <Route path="/three/" exact render={ () => {
            return (
              <img
                src="https://s3-media3.fl.yelpcdn.com/bphoto/dJzIEcoehgN2K1vmZEioHQ/o.jpg"
                alt=""
              />
            );
          }} />

          <Route path="/four/" exact render={ () => {
            return (
              <img
                src="https://s3-media2.fl.yelpcdn.com/bphoto/nA9K90rczbClXXjxmM4Ezg/o.jpg"
                alt=""
              />
            );
          }} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
