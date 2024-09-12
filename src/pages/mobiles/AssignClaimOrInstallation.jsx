import { Box, Button, Checkbox, List, ListItem, ListItemText } from "@mui/material";
import CustomModal from "../../components/CustomModal";
import { useEffect, useState } from "react"
import api from "../../api/api";
import apiRoutes from "../../api/apiRoutes";
import { useNavigate } from "react-router-dom";

const AssignClaimOrInstallation = () => {
    const [claims, setClaims] = useState([]);
    const [mobiles, setMobiles] = useState([]);
    const [installations, setInstallations] = useState([]);

    const [selectedMobile, setSelectedMobile] = useState([]);
    const [selectedClaims, setSelectedClaims] = useState([]);
    const [selectedInstallations, setSelectedInstallations] = useState([]);

    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("Exito");
    const [errorMessage, setErrorMessage] = useState("Ha ocurrido un error.");
    const navigate = useNavigate();

    const handleSuccessModalClose = () => {
        setOpenSuccessModal(false);
    };

    const handleRedirect = () => {
        navigate('/');
    };

    const getUnassignedClaims = async () => {
        try {
            const response = await api.get(apiRoutes.claims.getUnassigned);
            setClaims(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMobiles = async () => {
        try {
            const response = await api.get(apiRoutes.mobiles.getAll);
            setMobiles(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getUnassignedInstallations = async () => {
        try {
            const response = await api.get(apiRoutes.installations.getUnassigned);
            setInstallations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggle = (selectedItems, setSelectedItems, item) => {
        const currentIndex = selectedItems.indexOf(item);
        const newSelectedItems = [...selectedItems];

        if (currentIndex === -1) {
            newSelectedItems.push(item);
        } else {
            newSelectedItems.splice(currentIndex, 1);
        }

        setSelectedItems(newSelectedItems);
    };

    const handleToggleMobiles = (mobile) => {
        handleToggle(selectedMobile, setSelectedMobile, mobile);
    };

    const handleToggleClaims = (claim) => {
        handleToggle(selectedClaims, setSelectedClaims, claim);
    };

    const handleToggleInstallations = (installation) => {
        handleToggle(selectedInstallations, setSelectedInstallations, installation);
    };

    const assign = async () => {
        try {
            const installations = selectedInstallations.map(installation => installation.id_installation);
            const claims = selectedClaims.map((claim) => claim.id_claim);
            const mobile = selectedMobile[0].id_mobile;
            const response = await api.post(apiRoutes.mobiles.assignMobilesAndInstallations, {
                claims, mobile, installations
            });

            setSuccessMessage(response.data.message);
            setOpenSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
            setOpenErrorModal(true);
            console.log(error);
        }

    };

    useEffect(() => {
        getUnassignedClaims();
        getMobiles();
        getUnassignedInstallations();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'space-between' }}>
            <Box sx={{ width: '100%' }}>

                <h3>Listado de moviles disponibles</h3>
                <List>
                    {mobiles?.map((mobile) => (
                        <ListItem key={mobile.id_mobile} button onClick={() => handleToggleMobiles(mobile)}>
                            <Checkbox
                                checked={selectedMobile.indexOf(mobile) !== -1}
                            />
                            <ListItemText
                                primary={`Movil: ${mobile.id_mobile}  Tecnicos: ${mobile?.Users[0]?.Employee.name} 
                                ${mobile.Users[1] ? `y ${mobile.Users[1]?.Employee.name}` : ''} `}
                                secondary={`Vehiculo: ${mobile.Vehicle?.description}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ width: '50%' }}>

                    <h3>Listado de reclamos sin asignar</h3>

                    <List>
                        {claims?.map((claim) => (
                            <ListItem key={claim.id_claim} button onClick={() => handleToggleClaims(claim)}>
                                <Checkbox
                                    checked={selectedClaims.indexOf(claim) !== -1}
                                />
                                <ListItemText
                                    primary={`${claim.observations} ${claim.status}`}
                                    secondary={`Estado: ${claim.status}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{ width: '50%' }}>
                    <h3>Listado de instalaciones sin asignar</h3>
                    <List>
                        {installations?.map((installation) => (
                            <ListItem key={installation.id_installation} button onClick={() => handleToggleInstallations(installation)}>
                                <Checkbox
                                    checked={selectedInstallations.indexOf(installation) !== -1}
                                />
                                <ListItemText
                                    primary={`Instalacion ${installation.id_installation}: ${installation.news}`}
                                    secondary={`Estado: ${installation.status}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>

            <Button color='primary' variant='contained' onClick={assign}>Asignar movil</Button>


            <CustomModal
                open={openSuccessModal}
                onClose={handleSuccessModalClose}
                title={'Exito'}
                content={successMessage}
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

    )
}

export default AssignClaimOrInstallation
