import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

test('renders UserList component with users', async () => {
  const users = [
    { id: 1, username: 'john123', password: 'password1', token: 'token1' },
    { id: 2, username: 'jane456', password: 'password2', token: 'token2' },
    { id: 3, username: 'bob789', password: 'password3', token: 'token3' },
  ];

  render(<UserList users={users} />);

  for (const user of users) {
    await waitFor(() => {
      const userElement = screen.getByText(new RegExp(user.username));
      expect(userElement).toBeInTheDocument();
    });
  }
});
