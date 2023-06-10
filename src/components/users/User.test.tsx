import { render, screen } from '@testing-library/react';
import User from './User';

test('renders User component with username', async () => {
  const user = { username: 'john123', password: 'password1', token: 'token1' };

  render(<User user={user} />);

  const usernameElement = await screen.findByText(/Username: john123/i);
  expect(usernameElement).toBeInTheDocument();
});
