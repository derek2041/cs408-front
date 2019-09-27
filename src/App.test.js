import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavigationBar from './pages/NavigationBar';
import HomePage from './pages/HomePage';
import { Button, Dropdown, Modal, Message } from 'semantic-ui-react';
import { mount, render, shallow } from 'enzyme';

/*
Note that we cannot test for states, which is functional.
Instead, we test for behavior (like props).
This is by nature of functional components vs. class components.
*/

describe('<App /> with no login session', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without crashing (shallow)', () => {
    shallow(<App />);
  })

  it('has null user session', () => {
    const wrapper = mount(<App />);
    const navbar = wrapper.find(NavigationBar);
    expect(navbar.prop('sessionUsername')).toBe(null);
  })

  it('My Profile is a disabled dropdown', () => {
    const wrapper = mount(<App />);
    const navbar = wrapper.find(NavigationBar);
    const dropdown = navbar.find(Dropdown);
    expect(dropdown.prop('disabled')).toBeTruthy();
  })

  it('create post button is disabled', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(HomePage).find(Button).prop('disabled')).toBeTruthy();
  })

  /*
  it('opens sign in modal', () => {
    const wrapper = mount(<App />);
    const navbar = wrapper.find(NavigationBar);
    const button = navbar.find(Button);
    button.simulate('click');
    const modal = wrapper.parent().find(Modal);
    // expect(Modal.toExist());
    expect(modal.prop('active')).toBeTruthy();
  })
  */

  // it('shows please login message (my posts)', () => {
  //   const wrapper = mount(<App />);
  //   const navbar = wrapper.find(NavigationBar);
  //   const my_posts = navbar.find("a[href=\"/my-posts\"]");
  //   my_posts.simulate('click');
  //   // const message = wrapper.find(".ui.warning.message");
  //   const message = <Message.Header style={{ fontFamily: 'Raleway' }}>Login Required</Message.Header>;
  //   console.log(wrapper.html());
  //   expect(wrapper.contains(message)).toEqual(true);
  // })
  //
  // it('shows please login message (my bookmarks)', () => {
  //   const wrapper = mount(<App />);
  //   const navbar = wrapper.find(NavigationBar);
  //   const my_posts = navbar.find("a[href=\"/my-bookmarks\"]");
  //   my_posts.simulate('click');
  //   const message = wrapper.find(".ui.warning.message");
  //   expect(message).toBeTruthy();
  //   // console.log(message);
  // })
})
