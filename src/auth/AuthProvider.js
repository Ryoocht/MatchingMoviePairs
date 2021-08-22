import React, { useEffect, useState } from "react";
import { auth } from "../firebase/Firebase";

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //Sign up function.
  //Update auth info after sign up
  const signup = async (email, password, history) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      auth.onAuthStateChanged(user => setCurrentUser(user));
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  //Log in function
  const login = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged(user => setCurrentUser(user));
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }

  //Log out function
  const logout = () => {
    auth.signOut();
  }

  //Check if the user is authenticated already at the first access time
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ signup, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }