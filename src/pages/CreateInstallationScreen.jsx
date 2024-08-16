import { useState } from "react";
import SearchBar from "../components/SearchBar"
import api from "../api/api";
import { Box, Button, CircularProgress, Divider, Typography, IconButton } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import ClientInfoTable from "../components/ClientInfoTable";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';


const columns = [
    { field: 'line_number', headerName: 'Nro. de Linea', width: 300 },
    {
        field: 'textual_direction',
        headerName: 'Direccion',
        width: 300,
        valueGetter: (value, row) => row.Location?.textual_direction,
    },
    { field: 'createdAt', headerName: 'Fecha de alta', width: 200 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        renderCell: (params) => (
            <Box>
                <IconButton component={Link} to={`./watch/${params.row.id_installation}`}>
                    <VisibilityIcon />
                </IconButton>
                <IconButton component={Link} to={`./edit/${params.row.id_installation}`}>
                    <EditIcon />
                </IconButton>
                <IconButton component={Link} to={`./delete/${params.row.id_installation}`}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        ),
    },
];

const CreateInstallationScreen = () => {

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [clientInfo, setClientInfo] = useState(null);

    const title = 'DNI';
    const buttonTitle = 'cliente';

    const handleSearchTerm = (searchedInput) => {
        setSearchTerm(searchedInput);
    }


    const getClientInfo = async () => {
        setLoading(true);
        const response = await api.get(`/services/client/dni/${searchTerm}`);
        setLoading(false);
        setClientInfo(response.data);
        console.log(response.data)
    }

    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflow: 'auto',
                maxHeight: '80vh',
            }}>


            <Typography variant="h4"> Cargar instalación </Typography>
            <SearchBar onChangeTerm={handleSearchTerm} title={title} buttonTitle={buttonTitle} getService={getClientInfo}></SearchBar>
            <Divider variant="middle" sx={{ backgroundColor: 'white' }}></Divider>

            {loading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <CircularProgress />
                </Box> : null}


            {clientInfo && (
                <>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" color="primary">
                                <Link to={`./new/${clientInfo.id_client}`}
                                    style={{
                                        color: 'primary',
                                        textDecoration: 'none',
                                        ':visited': { color: 'inherit' }
                                    }}> Agregar servicio  </Link> </Button>
                        </Box>
                        <ClientInfoTable clientInfo={clientInfo}></ClientInfoTable>

                        <Divider variant="middle" sx={{ backgroundColor: 'white' }}></Divider>

                        <Typography variant='h5'>
                            Listado de servicios del cliente
                        </Typography>

                        {clientInfo.Services ? (
                            <DataGrid
                                rows={clientInfo.Services}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5, 10, 20]}
                                loading={loading}
                                getRowId={(row) => row.id_service}
                                sx={{ backgroundColor: 'white' }}
                            />
                        ) :
                            <>
                                <Typography>
                                    El cliente no tiene servicios a su nombre
                                </Typography>
                            </>
                        }

                    </Box>
                </>
            )}
        </Box>

    )
}

export default CreateInstallationScreen

/*



*/