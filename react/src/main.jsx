import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Information from './views/information.jsx';
import Login from './views/login.jsx';
import Main from './views/main.jsx';

function NotFound() {
  return <h1>404</h1>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/information" element={<Information />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);