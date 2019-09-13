import React, { useState } from 'react';
import { Menu, Dropdown, Button, Modal, Header, Input, Grid, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const navbarStyle = { fontFamily: 'Raleway', width: '100%', height: '25%'};

const NavigationBar = () => {
  const [sessionUser, setSessionUser] = useState(null);
  const [isValidLogin, setIsValidLogin] = useState(true);
  const [isValidRegistration, setIsValidRegistration] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const logoutUser = () => {
    setSessionUser(null);
  }

  const authenticateUser = async () => {
    if (isValidLogin) {
      setIsValidLogin(false);
    } else {
      setIsValidLogin(true);
    }

    setSessionUser("fakeusername");

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { username: loginUsername, password: loginPassword }
    }
    var response = await fetch(
      `http://...`, settings
    );
  }

  const registerUser = async () => {
    if (isValidRegistration) {
      setIsValidRegistration(false);
    } else {
      setIsValidRegistration(true);
    }
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { username: loginUsername, password: loginPassword }
    }
    var response = await fetch(
      `http://...`, settings
    );
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
    if (sessionUser !== null) {
      return (
        <Menu.Item header>Welcome, { sessionUser }!</Menu.Item>
      );
    } else {
      return null;
    }
  }

  const renderLoginLogout = () => {
    if (sessionUser === null) {
      return (
        <Modal
          size='small'
          dimmer='true'
          trigger={
            <Button primary style={{ fontFamily: 'Raleway', fontWeight: '600' }}>Sign In</Button>
          }
        >
          <Header style={{ fontFamily: 'Raleway', fontSize: '24px', color: '#2185d0' }}>Create an Account</Header>

          <Grid textAlign="center" columns={1}>
            <Grid.Row style={{ marginTop: '2.5%' }}>
              <Message hidden={ isValidLogin } error={true} style={{ width: '85%', textAlign: 'center' }}>
                <Message.Header style={{ fontFamily: 'Raleway' }}>Login Failed</Message.Header>
                <p style={{ fontFamily: 'Raleway', fontWeight: '600' }}>
                  There was an error trying to authenticate your credentials. Please try again.
                </p>
              </Message>

              <Message hidden={ isValidRegistration } error={true} style={{ width: '85%', textAlign: 'center' }}>
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
                <Button primary style={{ fontFamily: 'Raleway', width: '120px' }} onClick={ () => {
                  setIsValidRegistration(true);
                  authenticateUser();
                }}
                >
                  Login
                </Button>
                <Button style={{ fontFamily: 'Raleway', width: '120px' }} onClick={ () => {
                  setIsValidLogin(true);
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
        <Button as={ Link } to='/' primary style={{ fontFamily: 'Raleway', fontWeight: '600' }} onClick={ () => { logoutUser(); }}>Log Out</Button>
      );
    }
  }

  return (
    <Menu size='massive' style={ navbarStyle }>
      <Menu.Item header as={ Link } to='/'>Gleam</Menu.Item>

      <Menu.Menu position='right'>
        { renderGreeting() }
        <Dropdown disabled={ sessionUser === null } item text='My Profile'>
          <Dropdown.Menu>
            <Dropdown.Item as={ Link } to='/one'>My Posts</Dropdown.Item>
            <Dropdown.Item as={ Link } to='/two'>My Comments</Dropdown.Item>
            <Dropdown.Item as={ Link } to='/three'>My Bookmarks</Dropdown.Item>
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
