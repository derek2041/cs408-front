import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavigationBar from './pages/NavigationBar';
import { Button, Dropdown, Modal } from 'semantic-ui-react';
import { mount, render, shallow } from 'enzyme';

/*
Note that we cannot test for states, which is functional.
Instead, we test for behavior (like props).
This is by nature of functional components vs. class components.
*/

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

it('is a disabled dropdown', () => {
  const wrapper = mount(<App />);
  const navbar = wrapper.find(NavigationBar);
  const dropdown = navbar.find(Dropdown);
  expect(dropdown.prop('disabled')).toBeTruthy();
})

it('opens sign in modal', () => {
  const wrapper = mount(<App />);
  const navbar = wrapper.find(NavigationBar);
  const button = navbar.find(Button);
  button.simulate('click');
  const modal = wrapper.parent().find(Modal);
  // expect(Modal.toExist());
  expect(modal.prop('active')).toBeTruthy();
})
