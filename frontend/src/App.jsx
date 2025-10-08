import { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';

const endpoint = 'https://graphql-application-gthu.onrender.com/graphql';

const ADD_USER = gql`
  mutation($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

function App() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await request(endpoint, GET_USERS);
    setUsers(data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await request(endpoint, ADD_USER, form);
    setForm({ name: '', email: '' });
    fetchUsers();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1> GraphQL User Registration</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2> Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
