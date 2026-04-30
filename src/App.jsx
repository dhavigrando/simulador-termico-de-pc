import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Simulador from './pages/Simulador';
import Fisica from './pages/Fisica';
import Sobre from './pages/Sobre';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Simulador />} />
          <Route path="/fisica" element={<Fisica />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
