import { useEffect, useState } from "react"
import ClaimDataTable from "../../components/ClaimDataTable"
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import apiRoutes from "../../api/apiRoutes";
import { Box, Divider, TextField, Typography, Button } from "@mui/material";



const ClaimDetails = () => {

    const { id_claim } = useParams('id_client');
    const [claimData, setClaimData] = useState(null);


    useEffect(() => {
        getClaimData();
    }, [])


    const getClaimData = async () => {
        const response = await api.get(apiRoutes.claims.getDetailsByid(id_claim))
        console.log(response.data)
        setClaimData(response.data)
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
            <Box sx={{display:'flex',justifyContent:'flex-end'}}>
                <Button variant='contained'> <Link to={`/claims/closewithoutvisit/${id_claim}`} className="router-link">Cierre sin visita</Link>  </Button>
            </Box>
            {claimData && (
                <>
                    <ClaimDataTable claimData={claimData}></ClaimDataTable>
                    <Divider></Divider>
                    <TextField
                        label="Observaciones..."
                        variant="outlined"
                        multiline
                        rows={4}
                        value={claimData.observations}
                        sx={{ backgroundColor: 'white', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
                    />
                    <Typography variant='h6'>Horarios de visita</Typography>
                    <TextField
                        label="Horarios de visita..."
                        variant="outlined"
                        multiline
                        rows={2}
                        value={claimData.visit_shedules_availability}
                        sx={{ backgroundColor: 'white', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
                    />



                </>)}

        </Box>
    )
}

export default ClaimDetails
