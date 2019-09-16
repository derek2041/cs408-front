import React, { useState } from 'react';
import { Menu, Dropdown, Button, Modal, Header, Input, Grid, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const navbarStyle = { fontFamily: 'Raleway', width: '100%', height: '25%'};

const NavigationBar = ({ sessionUserCallback, sessionUsername }) => {
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isValidRegistration, setIsValidRegistration] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const logoutUser = () => {
    setLoginUsername("");
    setLoginPassword("");
    sessionUserCallback(null, null);
  }

  const authenticateUser = async () => {

    var response;

    // if fetch authentication returns OK, sessionUserCallback(loginUsername)
    // if (loginUsername !== "" && loginPassword !== "") {
    //   sessionUserCallback(loginUsername, loginPassword);
    //   setIsValidLogin(true);
    // } else {
    //   sessionUserCallback(null, null);
    //   setIsValidLogin(false);
    // }

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: loginUsername, password: loginPassword })
    };
    try {
      response = await fetch(
        `http://13.58.109.119:3001/users/login`, settings
      );

      const result = await response.json();

      console.log(result);

      if (result && result.status === "success") {
        sessionUserCallback(loginUsername, loginPassword);
        setIsValidLogin(true);
      } else {
        sessionUserCallback(null, null);
        setIsValidLogin(false);
      }
    } catch (error) {
      console.log(error);
      sessionUserCallback(null, null);
      setIsValidLogin(false);
    }
  }

  const registerUser = async () => {
    // if fetch registration returns OK, setIsValidRegistration(true);
    // if (loginUsername !== "" && loginPassword !== "") {
    //   setIsValidRegistration(true);
    // } else {
    //   setIsValidRegistration(false);
    // }
    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: loginUsername, password: loginPassword })
    }
    try {
      response = await fetch(
        `http://13.58.109.119:3001/users/new`, settings
      );

      const result = await response.json();

      console.log(result);

      if (result && result.status === "success") {
        sessionUserCallback(loginUsername, loginPassword);
        setIsValidRegistration(true);
      } else {
        sessionUserCallback(null, null);
        setIsValidRegistration(false);
      }
    } catch (error) {
      console.log(error);
      sessionUserCallback(null, null);
      setIsValidRegistration(false);
    }
  }

  const updateLoginUser = (event, data) => {
    setLoginUsername(data.value);
    console.log("Curr User: " + data.value);
  }

  const updateLoginPassword = (event, data) => {
    setLoginPassword(data.value);
    console.log("Curr Pass: " + data.value);
  }

  const renderGreeting = () => {
    if (sessionUsername !== null && sessionUsername !== "null") {
      return (
        <Menu.Item header>Welcome, { sessionUsername }!</Menu.Item>
      );
    } else {
      return null;
    }
  }

  const renderLoginLogout = () => {
    if (sessionUsername === null || sessionUsername === "null") {
      return (
        <Modal
          size='large'
          dimmer="blurring"
          trigger={
            <Button primary style={{ fontFamily: 'Raleway', fontWeight: '600' }}>Sign In</Button>
          }
        >
          <Header style={{ fontFamily: 'Raleway', fontSize: '24px', color: '#2185d0' }}>Create an Account</Header>

          <Grid textAlign="center" columns={1}>
            <Grid.Row style={{ marginTop: '2.5%' }}>
              <Message hidden={ isValidLogin } error={true} style={{ width: '80%', textAlign: 'center' }}>
                <Message.Header style={{ fontFamily: 'Raleway' }}>Login Failed</Message.Header>
                <p style={{ fontFamily: 'Raleway', fontWeight: '600' }}>
                  There was an error trying to authenticate your credentials. Please try again.
                </p>
              </Message>

              <Message hidden={ isValidRegistration } error={true} style={{ width: '80%', textAlign: 'center' }}>
                <Message.Header style={{ fontFamily: 'Raleway' }}>Registration Failed</Message.Header>
                <p style={{ fontFamily: 'Raleway', fontWeight: '600' }}>
                  There was an error trying to create an account with these credentials. Please try another combination!
                </p>
              </Message>
            </Grid.Row>
          </Grid>

          <Modal.Content>
            <Grid textAlign="center" columns={2}>
              <Grid.Row>
                <p style={{ fontFamily: 'Raleway', fontSize: '20px', marginTop: '0.6%', marginRight: '3%' }}>Username:</p>
                <Input onChange={ (event, data) => { updateLoginUser(event, data); }} style={{ width: '35%', maxHeight: '45px', fontSize: '20px' }}/>
              </Grid.Row>

              <Grid.Row>
                <p style={{ fontFamily: 'Raleway', fontSize: '20px', marginTop: '0.6%', marginRight: '3.8%' }}>Password:</p>
                <Input type="password" onChange={ (event, data) => { updateLoginPassword(event, data); }} style={{ width: '35%', maxHeight: '45px', fontSize: '20px' }}/>
              </Grid.Row>

              <Grid.Row>
                <Button primary disabled={ (loginUsername === "" || loginPassword === "" ) } style={{ fontFamily: 'Raleway', width: '150px', fontSize: '18px' }} onClick={ () => {
                  setIsValidRegistration(true); // this is to make the message disappear
                  authenticateUser();
                }}
                >
                  Login
                </Button>
                <Button disabled={ (loginUsername === "" || loginPassword === "" ) } style={{ fontFamily: 'Raleway', width: '150px', fontSize: '18px' }} onClick={ () => {
                  setIsValidLogin(true);  // this is to make the message disappear
                  registerUser();
                }}
                >
                  Register
                </Button>
              </Grid.Row>
            </Grid>
          </Modal.Content>
        </Modal>
      );
    } else {
      return (
        <Button as={ Link } to='/' className="logout" primary style={{ fontFamily: 'Raleway', fontWeight: '600' }} onClick={ () => { logoutUser(); }}>Log Out</Button>
      );
    }
  }

  return (
    <Menu size='massive' style={ navbarStyle }>
      <Menu.Item header as={ Link } to='/'>Gleam</Menu.Item>

      <Menu.Menu position='right'>
        { renderGreeting() }
        <Dropdown disabled={ (sessionUsername === null) || (sessionUsername === "null") } item text='My Profile'>
          <Dropdown.Menu>
            <Dropdown.Item as={ Link } to='/my-posts'>My Posts</Dropdown.Item>
            <Dropdown.Item as={ Link } to='/my-comments'>My Comments</Dropdown.Item>
            <Dropdown.Item as={ Link } to='/my-bookmarks'>My Bookmarks</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item>
          { renderLoginLogout() }
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default NavigationBar;
