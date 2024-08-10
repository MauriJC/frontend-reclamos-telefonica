import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, } from "@mui/material";

const ClientInfoTable = ({clientInfo}) => {
    return (
        <TableContainer component={Paper} sx={{ maxWidth: '85%', margin: 'auto', mt: 5,mb:2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">Datos del cliente y servicio</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Nombre/s</TableCell>
              <TableCell>{clientInfo.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Apellido/s</TableCell>
              <TableCell>{clientInfo.last_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DNI</TableCell>
              <TableCell>{clientInfo.dni}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nro. de socio</TableCell>
              <TableCell>{clientInfo.Services.id_service}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Contacto</TableCell>
              <TableCell>{clientInfo.contact_number}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default ClientInfoTable
