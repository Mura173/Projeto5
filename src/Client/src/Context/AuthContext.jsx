import { createContext, useContext, useState} from 'react';

const AuthContext = createContext();

//useEffect n tava redirecionando direito qnd o user ja tava logado
const getInitialUser = () => {
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};


export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser());

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}