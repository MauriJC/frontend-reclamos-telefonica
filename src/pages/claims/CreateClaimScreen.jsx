/* eslint-disable no-unused-vars */
import { CircularProgress, Typography, Box, Divider, TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import { useState } from 'react';
import api from "../../api/api";
import ClientDataTable from "../../components/ClientDataTable";
import { Link, useNavigate } from "react-router-dom";

const CreateClaimScreen = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceData, setServiceData] = useState(null);
  const title = 'Nro. de Linea';
  const buttonTitle = 'Servicio';
  const [observations, setObservations] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();



  const handleVisitTimeChange = (event) => {
    setVisitTime(event.target.value)
  }

  const handleObservationsChange = (event) => {
    setObservations(event.target.value);
  };

  const handleSearchTerm = (searchedInput) => {
    setSearchTerm(searchedInput);
  }

  const getService = async () => {
    setLoading(true);
    const response = await api.get(`/services/line_number/${searchTerm}`);
    setServiceData(response.data);
    setLoading(false)
  }

  const createClaim = async () => {
    const { id_service } = serviceData;
    const data = {
      id_service,
      observations,
      visit_shedules_availability: visitTime
    }

    const response = await api.post('/claims', data);
    setOpenSuccessModal(true);

    console.log(response)

  }

  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
    navigate('/claims/list');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflow: 'auto',
        maxHeight: '80vh',
      }}
    >
      <Typography variant='h4'>Cargar reclamo</Typography>

      <SearchBar onChangeTerm={handleSearchTerm} title={title} buttonTitle={buttonTitle} getService={getService} />

      <Divider variant="middle" sx={{ backgroundColor: 'white' }}></Divider>

      {loading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box> : null}

      {serviceData && (
        <>
          <ClientDataTable serviceData={serviceData}></ClientDataTable>
          <Divider variant="middle" sx={{ backgroundColor: 'white' }} />
          <Typography variant='h6'>Observaciones</Typography>
          <TextField
            label="Ingrese observaciones..."
            variant="outlined"
            multiline
            rows={4}
            value={observations}
            onChange={handleObservationsChange}
            sx={{ backgroundColor: 'white', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <Typography variant='h6'>Horarios de visita</Typography>
          <TextField
            label="Ingrese los horarios de visita..."
            variant="outlined"
            multiline
            rows={2}
            value={visitTime}
            onChange={handleVisitTimeChange}
            sx={{ backgroundColor: 'white', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="primary">
              <Link to='/' className="router-link">
                Cancelar
              </Link>
            </Button>
            <Button variant="contained" color="primary" onClick={createClaim}>Cargar reclamo</Button>
          </Box>

        </>

      )}

      <Divider variant="middle" sx={{ backgroundColor: 'white' }} />


     {/* Modal de éxito */}
     <Dialog open={openSuccessModal} onClose={handleSuccessModalClose}>
                    <DialogTitle>Éxito</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Reclamo creado con éxito</DialogContentText>
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

  )
}

export default CreateClaimScreen;
