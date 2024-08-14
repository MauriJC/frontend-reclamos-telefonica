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
        <>
            <AppBar sx={{ backgroundColor: 'gray', position: 'fixed' }}>
                <Toolbar sx={{ gap: { md: 1, l: 1 } }}>
                    <img src={logo} alt="logo" style={{ height: '10%', width: '4%' }} />

                    <Button color="inherit" component={RouterLink} to='/'>Home</Button>

                    <Button color="inherit" onClick={(event) => handleClick(event, 'claims')}>Reclamos</Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={menu === 'claims'}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/claims/create' className="router-link">Cargar reclamo</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/claims/list' className="router-link">Listado de reclamos nuevos</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/claims/list' className="router-link">Historial de reclamos</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/claims/list' className="router-link">Cierre sin visita</RouterLink>
                        </MenuItem>
                    </Menu>

                    <Button color="inherit" onClick={(event) => handleClick(event, 'installations')}>Instalaciones</Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={menu === 'installations'}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/installations/create' className="router-link">Cargar instalación</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/installations/list' className="router-link">Listado de instalaciones nuevas</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/installations/list' className="router-link">Historial de instalaciones</RouterLink>
                        </MenuItem>
                    </Menu>

                    <Button color="inherit" onClick={(event) => handleClick(event, 'mobiles')}>Móviles</Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={menu === 'mobiles'}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/installations/create' className="router-link">Asignar móvil</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/installations/list' className="router-link">Asignar reclamo o instalación a móvil</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/installations/list' className="router-link">Historial de instalaciones</RouterLink>
                        </MenuItem>
                    </Menu>

                    <Button color="inherit" onClick={(event) => handleClick(event, 'services')}>Servicios</Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={menu === 'services'}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/services/create' className="router-link">Realizar modificación de servicio</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/services/list' className="router-link">Realizar reactivación de servicio</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/services/list' className="router-link">Realizar baja de servicio</RouterLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/services/list' className="router-link">Finalizar baja de servicio con entrega de equipo</RouterLink>
                        </MenuItem>
                    </Menu>

                    <Button color="inherit" onClick={(event) => handleClick(event, 'clients')}>Clientes</Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={menu === 'clients'}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <RouterLink to='/clients/create' className="router-link">Realizar alta de nuevos clientes</RouterLink>
                        </MenuItem>
                    </Menu>

                    <Box sx={{ flexGrow: 4 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                        <Typography variant="body1" sx={{ marginRight: 1 }}>{userName}</Typography>
                        <Avatar src={userImage} alt={userName} />
                    </Box>
                </Toolbar>
            </AppBar>


        </>
    );
}

export default Navbar;
