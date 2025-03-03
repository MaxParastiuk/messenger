import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"></Route>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
