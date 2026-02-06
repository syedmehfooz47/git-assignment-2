import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import UserList from './UserList';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
      <Header/>
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
      <UserList />
      <Footer/>
    </>
  );
}

export default App;
