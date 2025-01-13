import { Route, Routes } from 'react-router-dom'; 
import Homepage from './Components/Homepage.tsx';
import AlbumDetails from './Components/AlbumDetails.tsx';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/:albumId" element={<AlbumDetails />} />
    </Routes>
  );
}

export default App;

