import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Pages/Login/LoginForm';
import PageToDo from "./Pages/PageToDo";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/pageDeclareWork" element={<PageToDo />} />
      </Routes>
    </Router>
  );
}

export default App;
<PageToDo />;
