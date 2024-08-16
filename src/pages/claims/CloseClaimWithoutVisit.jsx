import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import api from "../../api/api";
import apiRoutes from "../../api/apiRoutes";

const CloseClaimWithoutVisit = () => {
    const { id_claim } = useParams('id_claim');
    const [description, setDescription] = useState('');
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({}); //Validaciones
    const navigate = useNavigate();



    const closeClaimWithoutVisit = async () => {
        const data = {
            id_claim,
            description
        };
        try {
            const response = await api.post(apiRoutes.claims.closeWithoutVisit(id_claim), data);
            setSuccessMessage(response.data.message)
            setOpenSuccessModal(true);

        }
        catch (error) {
            setErrorMessage(error.errorMessage)
            setOpenErrorModal(true);
        }

    }


    const handleSuccessModalClose = () => {
        setOpenSuccessModal(false);
        navigate('/claims/list');
    };


    return (
        <Box>
            <Typography variant="h4">
                Cierre sin visita
            </Typography>
            <Typography>
                Descripción de lo sucedido
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            >

            </TextField>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button variant="contained">
                    <Link to={`/claims/list`} className="router-link">
                        Cancelar
                    </Link>
                </Button>
                <Button variant="contained" onClick={closeClaimWithoutVisit}>
                    Realizar cierre
                </Button>
            </Box>

            {/* Modal de éxito */}
            <Dialog open={openSuccessModal} onClose={handleSuccessModalClose}>
                <DialogTitle>Éxito</DialogTitle>
                <DialogContent>
                    <DialogContentText>{successMessage}</DialogContentText>
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
    )
}

export default CloseClaimWithoutVisit
