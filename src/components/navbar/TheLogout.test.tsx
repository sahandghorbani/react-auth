import { render, screen, fireEvent } from '@testing-library/react';
import { container } from '../../inversify.config';
import { MemoryRouter } from 'react-router-dom';
import TheLogout from './TheLogout';


const logoutMock = jest.fn();
// mocking ISetDispatch 
const dispatcherMock = {
  logout: logoutMock,
};

container.get = jest.fn().mockReturnValue(dispatcherMock);

test('renders TheLogout component', () => {
  const user = 'John' 
  render(
    <MemoryRouter>
        <TheLogout user={user} />
    </MemoryRouter>
  );

  const logoutButton = screen.getByRole('button', { name: 'logout' });
  expect(logoutButton).toBeInTheDocument();

  fireEvent.click(logoutButton);

  expect(logoutMock).toHaveBeenCalled();
});
