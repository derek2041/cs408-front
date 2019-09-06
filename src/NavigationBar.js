import React from 'react';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const navbarStyle = { fontFamily: "Exo", width: '100%', height: '25%'};

const NavigationBar = () => {

  return (
    <Menu size='massive' style={ navbarStyle }>
      <Menu.Item header as={ Link } to='/'>Gleam</Menu.Item>

      <Dropdown item text='Search'>
        <Dropdown.Menu>
          <Dropdown.Item as={ Link } to='/one'>One</Dropdown.Item>
          <Dropdown.Item as={ Link } to='/two'>Two</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown item text='Create'>
        <Dropdown.Menu>
          <Dropdown.Item as={ Link } to='/three'>Three</Dropdown.Item>
          <Dropdown.Item as={ Link } to='/four'>Four</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position='right'>
        <Menu.Item>
          <Button primary style={{ fontFamily: "Exo", fontWeight: '600' }}>Sign In</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default NavigationBar;
