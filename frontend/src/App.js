import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Header_bar from './components/header_bar';
import Home from './pages/AdminDashboard/Admin_dashboard';

function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
