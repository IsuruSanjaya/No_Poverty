import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Header_bar from './components/header_bar';
import Home from './pages/AdminDashboard/Admin_dashboard';
import Financial from './components/financial';

import EventHome from './components/eventManagement/Admin/allEventDetails';

function App() {
  return (
    <BrowserRouter>
      <body className="mainbody">
      <Header />

        <main className="mainbg">
          <Routes>
{/*       
      =================Sahan=================== */}

      <Route path="/allEvent" element={<EventHome />} />
{/* 
      =================Sahan=================== */}
          </Routes>
      </main>

      </body>
    </BrowserRouter>
  );
}

export default App;
