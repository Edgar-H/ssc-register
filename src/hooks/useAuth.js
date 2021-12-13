import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/login';

const LoginService = async (credentials) => {
  try {
    const { data } = await axios.get(baseUrl, credentials);
    return data;
  } catch (err) {
    return err;
  }
};

const LogoutService = () => {
  window.localStorage.removeItem('logged_in');
};

export { LoginService, LogoutService };

// const config = { headers: { Authorization: 'Bearer ' + token } };
