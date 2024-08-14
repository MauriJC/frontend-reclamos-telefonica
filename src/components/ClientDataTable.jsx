/* eslint-disable react/prop-types */
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, } from "@mui/material";

const ClientDataTable = ({ serviceData }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 5, minHeight: '53vh' }}>
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
            <TableCell>{serviceData.Client.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Apellido/s</TableCell>
            <TableCell>{serviceData.Client.last_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nro. de Servicio</TableCell>
            <TableCell>{serviceData.service_number}</TableCell>
          </TableRow>
          {serviceData.Location ?
            (
              <TableRow>
                <TableCell>Dirección</TableCell>
                <TableCell>{serviceData.Location.textual_direction}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
              <TableCell>Dirección</TableCell>
              <TableCell>Direccion no disponible</TableCell>
            </TableRow>
            )
          }

          <TableRow>
            <TableCell>Sec.</TableCell>
            <TableCell>{serviceData.id_service}</TableCell>
          </TableRow>
          {serviceData.Location ?
            (<TableRow>
              <TableCell>Coordenadas GPS</TableCell>
              <TableCell>{serviceData.Location.latitude}  {serviceData.Location.longitude}</TableCell>
            </TableRow>) :
            (<TableRow>
              <TableCell>Coordenadas GPS</TableCell>
              <TableCell>Ubicacion no disponible</TableCell>
            </TableRow>)}


        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ClientDataTable
