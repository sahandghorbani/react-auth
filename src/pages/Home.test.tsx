import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

test('renders home page', () => {
  render(
    <Router>
      <Home />
    </Router>
  );


  const loginLink = screen.getByText('login');
  expect(loginLink).toBeInTheDocument();
});


test.skip('renders home page with user list when token is present', () => {
  // Mock the user data
  const users = [
    {
      "username": "abc",
      "password": "abc123",
      "token": "6nyaiah",
      "id": 1
    },
  ];

  // Mock the behavior of localStorage.getItem() to return a token
  jest.spyOn(window.localStorage, 'getItem').mockReturnValue('token');

  // Render the component within a router
  render(
    <Router>
      <Home />
    </Router>
  );

  // Assert that the home page content is rendered
  const homePageElement = screen.getByTestId('home-page');
  expect(homePageElement).toBeInTheDocument();

  // Assert that the user list is rendered
  const userListElement = screen.getByTestId('user-list');
  expect(userListElement).toBeInTheDocument();

  // Assert that the correct number of list items is rendered
  const listItemElements = screen.getAllByTestId('list-item');
  expect(listItemElements).toHaveLength(users.length);
});
