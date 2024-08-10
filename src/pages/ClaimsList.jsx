import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../api/api';

const ClaimsList = () => {
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClaims = async () => {
            const response = await api.get('/claims');
            setClaims(response.data);
            //console.log(response.data[1].status)
            setLoading(false);
        };

        fetchClaims();
    }, []);

    const columns = [
        { field: 'id_claim', headerName: 'ID', width: 90 },
        { field: 'observations', headerName: 'Observación', width: 300 },
        {
            field: 'line_number',
            headerName: 'Nro. de línea',
            width: 300,
            valueGetter: (value,row) => row.Service?.line_number,
        },
        { field: 'status', headerName: 'Estado', width: 120 },
        { field: 'createdAt', headerName: 'Date', width: 250 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <Box>
                    <IconButton component={Link} to={`./watch/${params.row.id_claim}`}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton component={Link} to={`./edit/${params.row.id_claim}`}>
                        <EditIcon />
                    </IconButton>
                    <IconButton component={Link} to={`./delete/${params.row.id_claim}`}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },

    ];


    const filterModel = {
        items: [
            {
                field: 'status',
                operator: 'equals',
                value: 'Nuevo',
            },
        ],
    };

    return (
        <Box sx={{ width: '100%' }}>

            <Typography variant='h5'>
                Listado de reclamos
            </Typography>

            <DataGrid
                rows={claims}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                loading={loading}
                getRowId={(row) => row.id_claim}
                filterModel={filterModel}
                sx={{ backgroundColor: 'white' }}
            />
        </Box>
    );
};

export default ClaimsList;
