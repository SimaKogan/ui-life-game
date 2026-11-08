import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/navigators/Layout';
import { Home } from './pages/Home';
import { FrontCompute } from './pages/FrontCompute';
import { BackCompute } from './pages/BackCompute';
import { ProjectDetails } from './pages/ProjectDetails';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='front-compute' element={<FrontCompute />} />
          <Route path='back-compute' element={<BackCompute />} />
          <Route path='details' element={<ProjectDetails />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
