import Navbar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateClaimScreen from './pages/CreateClaimScreen';
import CreateInstallationScreen from './pages/CreateInstallationScreen';
import Home from './pages/HomeScreen';
import { Box } from '@mui/material';
import ClaimsList from './pages/ClaimsList';
import InstallationsList from './pages/InstallationsList';
import CreateService from './pages/CreateService';
import './styles.css';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Box sx={{
          width: '100vw',
          maxWidth: { xs: '100%', sm: '90%', md: '80%' },
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>

          <Navbar> </Navbar>
          <Box sx={{ mt: 14 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/claims/create' element={<CreateClaimScreen />} />
              <Route path='/claims/list' element={<ClaimsList />} />
              <Route path='/installations/create' element={<CreateInstallationScreen />} />
              <Route path='/installations/create/new/:id_client' element={<CreateService />} />
              <Route path='/installations/list' element={<InstallationsList />} />
            </Routes>
          </Box>

        </Box>
      </Router>
    </>
  )
}

export default App
