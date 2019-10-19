import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavigationBar from './pages/NavigationBar';
import PostList from './pages/PostList';
import HomePage from './pages/HomePage';
import { Button, Dropdown, Modal, Message, Pagination, Placeholder, Input} from 'semantic-ui-react';
import { mount, render, shallow } from 'enzyme';

/*
Note that we cannot test for states, which is functional.
Instead, we test for behavior (like props).
This is by nature of functional components vs. class components.
*/

describe('Homepage with no login session', () => {
  it('It renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('It renders without crashing (shallow)', () => {
    shallow(<App />);
  });

  it('By default it is a null user session', () => {
    const wrapper = mount(<App />);
    const navbar = wrapper.find(NavigationBar);
    expect(navbar.html().includes("Welcome")).toBeFalsy();
  });

  it('My Profile is a disabled dropdown', () => {
    const wrapper = mount(<App />);
    const navbar = wrapper.find(NavigationBar);
    const dropdown = navbar.find(Dropdown);
    expect(dropdown.prop('disabled')).toBeTruthy();
  });

  it('The create post button is disabled', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(HomePage).find(Button).prop('disabled')).toBeTruthy();
  });

  it('Contains placeholders/loaders for posts', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Placeholder)).toBeTruthy();
  });

  it('View post buttons are visible', async () => {
    const wrapper = mount(<App />);
    await new Promise((r) => setTimeout(r, 1000));
    expect(wrapper.find(PostList).html().includes("View Post")).toBeTruthy();
  });

  it('The postlist is rendered', async () => {
    const wrapper = mount(<App />);
    await new Promise((r) => setTimeout(r, 500));
    expect(wrapper.find(PostList).html().includes("views")).toBeTruthy();
  });

  it('The pagination is rendered', async () => {
    const wrapper = mount(<App />);
    await new Promise((r) => setTimeout(r, 500));
    expect(wrapper.find(PostList).find(Pagination)).toBeTruthy();
  });

  it('Posts have view counts', async () => {
    const wrapper = mount(<App />);
    await new Promise((r) => setTimeout(r, 500));
    expect(wrapper.find(PostList).html().includes("views")).toBeTruthy();
  });

  it('Search bar is available', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Input)).toBeTruthy();
  });

  it('New post button is shown', () => {
    const wrapper = mount(<App />);
    expect(wrapper.html().includes("New Post")).toBeTruthy();
  });

  it('Shows the sign in button', () => {
    const wrapper = mount(<App />);
    expect(wrapper.html().includes("Sign In")).toBeTruthy();
  });

  it('Opens the sign in modal on click', () => {
    const wrapper = mount(<App />);
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.find(Modal).at(0).html().includes("Account Login")).toBeTruthy();
  });

  it('Sign in modal contains username field', () => {
    const wrapper = mount(<App />);
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.find(Modal).at(0).html().includes("Username")).toBeTruthy();
  });

  it('Sign in modal contains password field', () => {
    const wrapper = mount(<App />);
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.find(Modal).at(0).html().includes("Password")).toBeTruthy();
  });

  it('Sign in modal contains Login button', () => {
    const wrapper = mount(<App />);
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.find(Button).at(0).html().includes("Login")).toBeTruthy();
  });

  it('Sign in modal contains Register button', () => {
    const wrapper = mount(<App />);
    wrapper.find(Button).at(0).simulate('click');
    expect(wrapper.find(Button).at(1).html().includes("Register")).toBeTruthy();
  });

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

// describe('Viewing a post', () => {
//   it('Post view contains control options', async () => {
//     Object.defineProperty(window.location, 'href', {
//       writable: true,
//       value: 'http://13.58.109.119:5000/post-view/:98'
//     });
//
//     const wrapper = mount(<PostContent username={""} password={""} />);
//     await new Promise((r) => setTimeout(r, 5000));
//     // console.log(wrapper.debug());
//     // console.log(wrapper.find(HomePage).find(PostList).html().includes(
//     //   '<button class="ui icon disabled button" disabled="" tabindex="-1" style="height: max-content; font-family: Raleway; font-weight: 600; font-size: 18px;"><i aria-hidden="true" class="bookmark icon"></i></button>'
//     // ));
//     // wrapper.find(HomePage).find(PostList).find(Button).simulate('click');
//     expect(wrapper.find(HomePage).find(PostList).html().includes(
//       '<button class="ui icon disabled button" disabled="" tabindex="-1" style="height: max-content; font-family: Raleway; font-weight: 600; font-size: 18px;"><i aria-hidden="true" class="bookmark icon"></i></button>'
//     )).toBeTruthy();
//   });
// })
