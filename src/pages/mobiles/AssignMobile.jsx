import { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Checkbox, Box, Button } from '@mui/material';
import api from '../../api/api';
import apiRoutes from '../../api/apiRoutes';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';


const AssignMobile = () => {
    const [selectedTechnicians, setSelectedTechnicians] = useState([]);
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Ha ocurrido un error.");
    const navigate = useNavigate();

    const handleSuccessModalClose = () => {
        setOpenSuccessModal(false);
    };

    const handleRedirect = () => {
        navigate('/');
    };

    const handleToggleTechnician = (technician) => {
        const currentIndex = selectedTechnicians.indexOf(technician);
        const newSelectedTechnicians = [...selectedTechnicians];

        if (currentIndex === -1) {
            newSelectedTechnicians.push(technician);
        } else {
            newSelectedTechnicians.splice(currentIndex, 1);
        }

        setSelectedTechnicians(newSelectedTechnicians);
    };


    const handleToggleVehicle = (vehicle) => {
        const currentIndex = selectedVehicles.indexOf(vehicle);
        const newSelectedVehicles = [...selectedVehicles];

        if (currentIndex === -1) {
            newSelectedVehicles.push(vehicle);
        } else {
            newSelectedVehicles.splice(currentIndex, 1);
        }

        setSelectedVehicles(newSelectedVehicles);
    };


    useEffect(() => {
        getTechnicians();
        getVehicles();
    }, []);

    const getTechnicians = async () => {
        const response = await api.get(apiRoutes.employees.getAllAvailableTechnicians);
        setTechnicians(response.data);
    };


    const getVehicles = async () => {
        const response = await api.get(apiRoutes.vehicles.getAvailable);
        setVehicles(response.data)
    };

    const assignMobile = async () => {
        try {
            const id_employees = selectedTechnicians.map(technician => technician.id_employee);
            const response = await api.post(apiRoutes.mobiles.assign, {
                id_employees,
                id_vehicle: selectedVehicles[0].id_vehicle,
            });
            setOpenSuccessModal(true);
        } catch (error) {
            setOpenErrorModal(true);            
            setErrorMessage(error.message);
        }

    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'space-between' }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ width: '50%' }}>
                    <h3>Listado de Técnicos</h3>
                    <List>
                        {technicians.map((technician) => (
                            <ListItem key={technician.id_employee} button onClick={() => handleToggleTechnician(technician)}>
                                <Checkbox
                                    checked={selectedTechnicians.indexOf(technician) !== -1}
                                />
                                <ListItemText
                                    primary={`${technician.name} ${technician.last_name}`}
                                    secondary={`Rol: ${technician.User.Role.name}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>


                <Box sx={{ width: '50%' }}>
                    <h3>Listado de vehículos disponibles</h3>
                    <List>
                        {vehicles.map((vehicle) => (
                            <ListItem key={vehicle.id_vehicle} button onClick={() => handleToggleVehicle(vehicle)}>
                                <Checkbox
                                    checked={selectedVehicles.indexOf(vehicle) !== -1}
                                />
                                <ListItemText
                                    primary={`${vehicle.description}`}
                                    secondary={`Patente: ${vehicle.patent}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

            </Box>



            <h3>Técnicos y vehículo seleccionados</h3>
            <List>
                {selectedTechnicians.map((technician) => (
                    <ListItem key={technician.id_employee}>
                        <ListItemText
                            primary={`${technician.name} ${technician.last_name}`}
                            secondary={`Role: ${technician.User.Role?.name}, Username: ${technician.User.username}`}
                        />
                    </ListItem>
                ))}

                {selectedVehicles.map((vehicle) => (
                    <ListItem key={vehicle.id_vehicle}>
                        <ListItemText
                            primary={`${vehicle.description}`}
                            secondary={`Patent: ${vehicle.patent}`}
                        />
                    </ListItem>
                ))}

            </List>
            <Button color='primary' variant='contained' onClick={assignMobile}>Asignar movil</Button>

            <CustomModal
                open={openSuccessModal}
                onClose={handleSuccessModalClose}
                title={'Exito'}
                content={'Movil creado con exito'}
                actions={[
                    { label: "OK", onClick: handleRedirect }
                ]}
            />

            <CustomModal
                open={openErrorModal}
                onClose={() => setOpenErrorModal(false)}
                title="Error"
                content={errorMessage}
                actions={[
                    { label: "Cerrar", onClick: () => setOpenErrorModal(false) }
                ]}
            />
        </Box>
    );
}

export default AssignMobile
