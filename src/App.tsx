import {Homepage} from './pages/Homepage';
import {Route, Routes} from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
    </Routes>
    
    </>
  );
}

export default App;
