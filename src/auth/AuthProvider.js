import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(
    JSON.parse(window.localStorage.getItem('userAuth')) || null
  );

  useEffect(() => {
    window.localStorage.setItem('userAuth', JSON.stringify(userAuth));
  }, [userAuth]);

  const contextValue = {
    userAuth,
    login() {
      setUserAuth({ id: 1, username: 'Pablito' });
    },
    logout() {
      setUserAuth(window.localStorage.removeItem('userAuth'));
    },
    isLoggedIn() {
      return !!userAuth;
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
}; */
