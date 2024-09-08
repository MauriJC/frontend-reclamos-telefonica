import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/es';

const CreateService = () => {
    const { id_client } = useParams('id_client');

    const [serviceTypesData, setServiceTypesData] = useState(null);
    const [serviceType, setServiceType] = useState('');

    const [lineNumber, setLineNumber] = useState('');
    const [textualDirection, setTextualDirection] = useState('');
    const [pointOfReference, setPointOfReference] = useState('');
    const [date, setDate] = useState(dayjs());
    const [serviceNumber, setServiceNumber] = useState('');

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getServiceTypes();
        dayjs.locale("es");
    }, []);

    const getServiceTypes = async () => {
        const response = await api.get('/servicetypes');
        setServiceTypesData(response.data);
    };

    const handleChange = (event) => {
        setServiceType(event.target.value);
    };

    const validateFields = () => {
        let newErrors = {};

        if (!lineNumber.trim()) {
            newErrors.lineNumber = 'Nro. de linea es obligatorio';
        }
        if (!textualDirection.trim()) {
            newErrors.textualDirection = 'Direccion del servicio es obligatorio';
        }
        if (!pointOfReference.trim()) {
            newErrors.pointOfReference = 'Punto de referencia de ubicacion es obligatorio';
        }
        if (!serviceNumber.trim()) {
            newErrors.serviceNumber = 'Nro. de servicio es obligatorio';
        }

        return newErrors;
    };

    const postCreateService = async () => {
        const newErrors = validateFields();

        if (Object.keys(newErrors).length === 0) {
            const data = {
                id_client,
                line_number: lineNumber,
                textual_direction: textualDirection,
                point_of_reference: pointOfReference,
                date,
                service_type: serviceType,
                service_number: serviceNumber
            };
            try {
                await api.post(`/services`, data);
                setOpenSuccessModal(true); // Abre el modal de éxito
            } catch (error) {
                setErrorMessage(error.message);
                setOpenErrorModal(true); // Abre el modal de error
            }
        } else {
            setErrors(newErrors);
        }
    };

    const handleSuccessModalClose = () => {
        setOpenSuccessModal(false);
        navigate('/');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflow: 'auto',
            }}
        >
            <Typography variant="h4">Creacion de nuevo servicio</Typography>

            {serviceTypesData && (
                <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
                    <InputLabel id="demo-simple-select-label">Tipo de servicio</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={serviceType}
                        label="Tipo de servicio"
                        onChange={handleChange}
                        required
                    >
                        {serviceTypesData.map((serviceType) => (
                            <MenuItem
                                value={serviceType.id_service_type}
                                key={serviceType.id_service_type}
                            >
                                {serviceType.description}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25vh' },
                    backgroundColor: 'white',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1,
                }}
                noValidate
                autoComplete="off"
            >
                <Box sx={{ width: '45%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DatePicker
                            label="Fecha de alta"
                            value={date}
                            onChange={(newDate) => setDate(newDate)}
                            format="D/M/YYYY"
                            sx={{
                                minWidth: '100%',
                            }}
                        />
                    </LocalizationProvider>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '45%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        label="Nro. de linea"
                        variant="outlined"
                        value={lineNumber}
                        onChange={(e) => setLineNumber(e.target.value)}
                        sx={{ minWidth: '100%' }}
                        required
                        error={!!errors.lineNumber}
                        helperText={errors.lineNumber}
                    />
                    <TextField
                        label="Direccion del servicio"
                        variant="outlined"
                        value={textualDirection}
                        onChange={(e) => setTextualDirection(e.target.value)}
                        sx={{ minWidth: '100%' }}
                        required
                        error={!!errors.textualDirection}
                        helperText={errors.textualDirection}
                    />
                    <TextField
                        label="Punto de referencia de ubicacion"
                        variant="outlined"
                        value={pointOfReference}
                        onChange={(e) => setPointOfReference(e.target.value)}
                        sx={{ minWidth: '100%' }}
                        required
                        error={!!errors.pointOfReference}
                        helperText={errors.pointOfReference}
                    />
                    <TextField
                        label="Nro. de servicio"
                        variant="outlined"
                        value={serviceNumber}
                        onChange={(e) => setServiceNumber(e.target.value)}
                        sx={{ minWidth: '100%' }}
                        required
                        error={!!errors.serviceNumber}
                        helperText={errors.serviceNumber}
                    />
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', mt: 1, gap: 2 }}>
                        <Button variant="contained" color="primary">
                            <Link
                                to="/"
                                style={{
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    ':visited': { color: 'inherit' },
                                }}
                            >
                                Cancelar
                            </Link>
                        </Button>
                        <Button variant="contained" color="primary" onClick={postCreateService}>
                            Cargar instalacion
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Modal de éxito */}
            <Dialog open={openSuccessModal} onClose={handleSuccessModalClose}>
                <DialogTitle>Éxito</DialogTitle>
                <DialogContent>
                    <DialogContentText>Servicio creado con éxito</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSuccessModalClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de error */}
            <Dialog open={openErrorModal} onClose={() => setOpenErrorModal(false)}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>{errorMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenErrorModal(false)} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CreateService;
