import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material"

const ClaimDataTable = ({claimData}) => {
  return (
      <TableContainer component={Paper} sx={{ maxWidth: '85%', margin: 'auto', mt: 5,mb:2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6">Detalles del reclamo</Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Nombre/s</TableCell>
              <TableCell>{claimData.Service?.Client?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Apellido/s</TableCell>
              <TableCell>{claimData.Service?.Client?.last_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Direccion</TableCell>
              <TableCell>{claimData.Service?.Location?.textual_direction}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nro. de socio</TableCell>
              <TableCell>{claimData.Service?.Client?.id_client}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nro. de Servicio</TableCell>
              <TableCell>{claimData.Service?.id_service}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nro. de línea</TableCell>
              <TableCell>{claimData.Service?.line_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coordenadas GPS</TableCell>
              <TableCell>{claimData.Service?.Location?.latitude} {claimData.Service?.Location?.longitude}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tipo de servicio</TableCell>
              <TableCell>{claimData.Service?.Service_type?.description}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default ClaimDataTable
