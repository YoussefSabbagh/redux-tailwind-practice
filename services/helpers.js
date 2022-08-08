const BASE_URL = process.env.NEXT_PUBLIC_URL_SERVER;

// Get all user
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  return await response.json();
};

// Get a single user
export const getUserById = async (userId) => {
  const response = await fetch(`${BASE_URL}api/users/${userId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// Create a new user
export async function createUser(formData) {
  try {
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/users`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Update a user
export async function updateUser(userId, formData) {
  try {
    const Options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

// Delete a user
export async function deleteUsers(userId) {
  try {
    const Options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    const response = await fetch(`${BASE_URL}api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
