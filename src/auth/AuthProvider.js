import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(
    JSON.parse(window.sessionStorage.getItem('userAuth')) || null
  );

  useEffect(() => {
    try {
      window.sessionStorage.setItem('userAuth', JSON.stringify(userAuth));
    } catch (err) {
      window.sessionStorage.removeItem('userAuth');
      console.log(err);
    }
  }, [userAuth]);

  const contextValue = {
    userAuth,
    login(loginData) {
      setUserAuth(loginData);
    },
    logout() {
      try {
        window.sessionStorage.removeItem('userAuth');
        setUserAuth(null);
      } catch (err) {
        console.log(err);
      }
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
