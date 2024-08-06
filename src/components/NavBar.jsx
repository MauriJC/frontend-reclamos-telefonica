import { AppBar, Toolbar, Button, Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/Logo-Cooperativa-cropped.png'
import { useState } from 'react';

function Navbar() {
    const userName = "Mauricio Chaile";
    const userImage = "https://via.placeholder.com/40";
    const [anchorEl, setAnchorEl] = useState(null);
    const [menu, setMenu] = useState('');


    const handleClick = (event, menuName) => {
        setAnchorEl(event.currentTarget);
        setMenu(menuName);
    };


    const handleClose = () => {
        setAnchorEl(null);
        setMenu('');
    };


    return (
        <AppBar sx={{ backgroundColor: 'gray' }}>

            <Toolbar sx={{ gap: { md: 1, l: 1 } }}>
                <img src={logo} alt="logo" style={{ height: '10%', width: '4%' }} />

                <Button color="inherit" component={RouterLink} to='/'>Home</Button>

                <Button color="inherit" onClick={(event) => handleClick(event, 'claims')}>Reclamos</Button>
                <Menu
                    anchorEl={anchorEl}
                    open={menu === 'claims'}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><RouterLink to='/claims/create'>Cargar reclamo</RouterLink></MenuItem>
                    <MenuItem onClick={handleClose}> <RouterLink to='/claims/create'>Listado de reclamos</RouterLink></MenuItem>
                    <MenuItem onClick={handleClose}><RouterLink to='/claims/create'>Funcionalidad 3</RouterLink></MenuItem>
                </Menu>


                <Button color="inherit" component={RouterLink} to="/installations">Instalaciones</Button>
                <Button color="inherit" component={RouterLink} to="/mobiles">Moviles</Button>
                <Button color="inherit" component={RouterLink} to="/services">Servicios</Button>
                <Button color="inherit" component={RouterLink} to="/clients">Clientes</Button>


                <Box sx={{ flexGrow: 4 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Typography variant="body1" sx={{ marginRight: 1 }}>{userName}</Typography>
                    <Avatar src={userImage} alt={userName} />
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
