import axios from 'axios';

export const logIn = async (email, password) => {
  const response = await axios.post('http://0.0.0.0:4000/api/auth/login', {
    email,
    password,
  });

  if (response && response.data && response.data.data) {
    return response.data.data;
  }

  return response;
};

export const getTeams = async token => {
  try {
    const response = await axios.get('http://0.0.0.0:4000/api/team', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data && response.data.data) {
      return response.data.data;
    }

    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }

    throw error;
  }
};

export const addTeam = async (teamName, token) => {
  try {
    const response = await axios.post(
      'http://0.0.0.0:4000/api/team',
      { name: teamName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response && response.data && response.data.data) {
      return response.data.data;
    }

    return response;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }

    throw error;
  }
};
