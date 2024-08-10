import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateClaimScreen from './pages/CreateClaimScreen';
import CreateInstallationScreen from './pages/CreateInstallationScreen';
import Home from './pages/HomeScreen';
import { Box } from '@mui/material';
import ClaimsList from './pages/ClaimsList';
import InstallationsList from './pages/InstallationsList';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Box sx={{
          width: '100vw',
          maxWidth: { xs: '100%', sm: '90%', md: '80%' },
          marginLeft:'auto',
          marginRight:'auto'
        }}>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/claims/create' element={<CreateClaimScreen />}></Route>
            <Route path='/claims/list' element={<ClaimsList />}></Route>
            <Route path='/installations/create' element={<CreateInstallationScreen />}></Route>
            <Route path='/installations/create/new' element={<CreateInstallationScreen />}></Route>
            <Route path='/installations/list' element={<InstallationsList />}></Route>
          </Routes>
        </Box>
      </Router>
    </>
  )
}

export default App
