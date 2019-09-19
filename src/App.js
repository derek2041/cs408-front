import React, { useState } from 'react';
import { Grid, Message } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from './pages/NavigationBar';
import HomePage from './pages/HomePage';
import NoMatch from './NoMatch';
import MyPosts from './pages/MyPosts';
import MyBookmarks from './pages/MyBookmarks';
import PostContent from './pages/PostContent';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [sessionUsername, setSessionUsername] = useState(localStorage.getItem('gleam_username'));
  const [sessionPassword, setSessionPassword] = useState(localStorage.getItem('gleam_password'));

  const sessionUserCallback = (username, password) => {
    setSessionUsername(username);
    setSessionPassword(password);
    localStorage.setItem('gleam_username', username);
    localStorage.setItem('gleam_password', password);
  }

  return (
    <div className="App">
      <Router>
        <NavigationBar sessionUserCallback={ sessionUserCallback } sessionUsername={ sessionUsername } />

        <Switch>

        <Route path="/post-view/:postId"  component={PostContent} />


          <Route path="/my-posts/" exact render={ () => {
            if (sessionUsername === null || sessionUsername === "null" || sessionPassword === null || sessionPassword === "null") {
              return (
                <Grid textAlign="center" columns={1}>
                  <Grid.Row style={{ marginTop: '2.5%' }}>
                    <Message warning={true} style={{ width: '80%', textAlign: 'center' }}>
                      <Message.Header style={{ fontFamily: 'Raleway' }}>Login Required</Message.Header>
                      <p style={{ fontFamily: 'Raleway', fontWeight: '600' }}>
                        This feature requires you to be logged in. Please log in first.
                      </p>
                    </Message>
                  </Grid.Row>
                </Grid>
              );
            } else {
              return (
                <MyPosts username={sessionUsername} password={sessionPassword} />
              );
            }
          }} />

          <Route path="/my-comments/" exact render={ () => {
            if (sessionUsername === null || sessionUsername === "null" || sessionPassword === null || sessionPassword === "null") {
              return (
                <Grid textAlign="center" columns={1}>
                  <Grid.Row style={{ marginTop: '2.5%' }}>
                    <Message warning={true} style={{ width: '80%', textAlign: 'center' }}>
                      <Message.Header style={{ fontFamily: 'Raleway' }}>Login Required</Message.Header>
                      <p style={{ fontFamily: 'Raleway', fontWeight: '600' }}>
                        This feature requires you to be logged in. Please log in first.
                      </p>
                    </Message>
                  </Grid.Row>
                </Grid>
              );
            } else {
              return (
                <img
                  src="https://s3-media2.fl.yelpcdn.com/bphoto/XRTwKMvLOFswl6bywAu92g/o.jpg"
                  alt=""
                />
              );
            }
          }} />

          <Route path="/my-bookmarks/" exact render={ () => {
            if (sessionUsername === null || sessionUsername === "null" || sessionPassword === null || sessionPassword === "null") {
              return (
                <Grid textAlign="center" columns={1}>
                  <Grid.Row style={{ marginTop: '2.5%' }}>
                    <Message warning={true} style={{ width: '80%', textAlign: 'center' }}>
                      <Message.Header style={{ fontFamily: 'Raleway' }}>Login Required</Message.Header>
                      <p style={{ fontFamily: 'Raleway', fontWeight: '600' }}>
                        This feature requires you to be logged in. Please log in first.
                      </p>
                    </Message>
                  </Grid.Row>
                </Grid>
              );
            } else {
              return (
                <MyBookmarks username={sessionUsername} password={sessionPassword} />
              );
            }
          }} />

          <Route path="/four/" exact render={ () => {
            return (
              <img
                src="https://s3-media2.fl.yelpcdn.com/bphoto/nA9K90rczbClXXjxmM4Ezg/o.jpg"
                alt=""
              />
            );
          }} />

          <Route path="/" exact render={ () => {
            return (
              <HomePage
                username={sessionUsername}
                password={sessionPassword}
                isLoggedIn={ (sessionUsername !== null && sessionUsername !== "null" && sessionPassword !== null && sessionPassword !== "null") }
              />
            );
          }} />

          <Route component={ NoMatch } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
