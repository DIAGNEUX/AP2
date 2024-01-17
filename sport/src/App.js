import logo from './logo.svg';
import { useState , useEffect } from 'react';
import './css/App.css';
import  Navbar  from './component/Navbar'
import { Way } from './Route/Way';
import Up from './component/Up';
import Footer from './component/footer';
import { Link, Element } from 'react-scroll';


function App() {
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const UserName = localStorage.getItem('userNom');
    console.log(role)
    setUserRole(role);
  }, []);
  
  return (
    <div className="App">
      <Element name="fleche" className="element"></Element>
      <Navbar/>
      <Up/>
      <Way/>
      {userRole === '0' ? (
          <>
         <Footer/>
          </>
        ) : null
        }
    </div>
  );
}

export default App;
