export async function createUser(userData) {
  try {
      const response = await fetch('http://localhost:8080/users', {
          method: "POST",
          body: JSON.stringify(userData),
          headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
          // Handle HTTP errors
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create user');
      }

      const data = await response.json();
      // Only return relevant user information (excluding sensitive info)
      return { data };
  } catch (error) {
      // Handle network or other errors
      console.error('Error creating user:', error);
      throw error;
  }
}

export function checkUser(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;

  return fetch(`http://localhost:8080/users?email=${encodeURIComponent(email)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    })
    .then(data => {
      console.log({ data });

      if (data.length === 0) {
        throw new Error('User not found');
      }

      const user = data[0];

      // Assuming the API does not return the password and we need to handle authentication differently
      // You should ideally verify the password on the server side and return a token if valid
      if (password === user.password) {
        // Don't return the password back in the response
        const { password, ...userInfo } = user;
        return { data: userInfo };
      } else {
        throw new Error('Wrong credentials');
      }
    })
    .catch(error => {
      console.error('Error checking user:', error);
      throw error;
    });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}