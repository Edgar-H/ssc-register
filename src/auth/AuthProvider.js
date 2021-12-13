import { createContext, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const baseUrl = 'http://localhost:8000/api/login';
  const [user, setUser] = useState(null);

  const contextValue = {
    user,
    login() {
      setUser({ id: 1, username: 'Pablito' });
    },
    logout() {
      setUser(null);
    },
    isLoggedIn() {
      return !!user;
    },
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

/* const LoginService = async (credentials) => {
  try {
    const { data } = await axios.get(baseUrl, credentials);
    return data;
  } catch (err) {
    return err;
  }
};

const LogoutService = () => {
  window.localStorage.removeItem('logged_in');
}; */

/*   const [userAuth, setUserAuth] = useState();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('logged_in');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      setUserAuth(user);
    }
  }, []); */
