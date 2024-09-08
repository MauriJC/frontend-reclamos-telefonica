import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../../api/api';

const InstallationsList = () => {

    const [installations, setInstallations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getClaims = async () => {
            const response = await api.get('/installations/new');
            setInstallations(response.data);
            setLoading(false);
        };

        getClaims();
    }, []);

    const columns = [
        { field: 'id_installation', headerName: 'ID', width: 90 },
        { field: 'news', headerName: 'Novedades', width: 300 },
        {
            field: 'line_number',
            headerName: 'Nro. de línea',
            width: 300,
            valueGetter: (value, row) => row.Service?.line_number,
        },
        { field: 'status', headerName: 'Estado', width: 120 },
        { field: 'createdAt', headerName: 'Fecha', width: 250 },
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
            <Typography variant='h5'>Listado de instalaciones nuevas</Typography>
            <DataGrid
                rows={installations}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                loading={loading}
                getRowId={(row) => row.id_installation}
                filterModel={filterModel}
                sx={{ backgroundColor: 'white' }}
            />
        </Box>
    )
}

export default InstallationsList
