import { useState } from 'react';
import { Box, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import api from '../../api/api';
import apiRoutes from '../../api/apiRoutes';
import { useNavigate } from "react-router-dom";

const CreateClient = () => {

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        dni: '',
        contact_number: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const createClient = async () => {
        try {
            const response = await api.post(apiRoutes.clients.create, formData);
            setOpenSuccessModal(true);
        }
        catch (error) {
            setOpenErrorModal(true);
            setErrorMessage(error.message);
        }
    }

    const handleSuccessModalClose = () => {
        setOpenSuccessModal(false);
        navigate('/');
    };

    return (
        <>

            <Typography variant='h4' sx={{ fontWeight: 'bold', ml: 2, fontFamily: 'Roboto, Arial, sans-serif' }} >Alta de nuevo cliente</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 7, width: '100%', mt: 2, flexWrap: 'wrap', justifyContent: 'space-around' }}>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ width: '45%' }}

                />
                <TextField
                    label="Apellido"
                    variant="outlined"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    sx={{ width: '45%' }}
                />
                <TextField
                    label="DNI"
                    variant="outlined"
                    name="dni"
                    type='number'
                    value={formData.dni}
                    onChange={handleChange}
                    sx={{ width: '45%' }}
                />
                <TextField
                    label="Contacto"
                    variant="outlined"
                    name="contact_number"
                    type='number'
                    value={formData.contact_number}
                    onChange={handleChange}
                    sx={{ width: '45%' }}
                />
                <Box sx={{ width: '100%', display: 'flex', gap: 3, justifyContent: 'flex-end' }}>
                    <Button variant='contained' color='primary'>Cancelar</Button>
                    <Button variant='contained' color='primary' onClick={createClient}>Guardar</Button>
                </Box>


                {/* Modal de éxito */}
                <Dialog open={openSuccessModal} onClose={handleSuccessModalClose}>
                    <DialogTitle>Éxito</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Cliente creado con éxito</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSuccessModalClose} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>

                {/* Modal de error */}
                <Dialog open={openErrorModal} onClose={() => setOpenErrorModal(false)}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{errorMessage}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenErrorModal(false)} color="primary">Cerrar</Button>
                    </DialogActions>
                </Dialog>


            </Box>
        </>
    )
}

export default CreateClient
