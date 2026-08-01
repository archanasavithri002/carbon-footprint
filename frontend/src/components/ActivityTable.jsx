import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Box,
  Typography
} from '@mui/material'

function descendingComparator(a, b, orderBy) {
  if (!a[orderBy] && !b[orderBy]) return 0
  if (!a[orderBy]) return 1
  if (!b[orderBy]) return -1
  if (b[orderBy] < a[orderBy]) return -1
  if (b[orderBy] > a[orderBy]) return 1
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: 'activityDate', label: 'Date' },
  { id: 'category', label: 'Category' },
  { id: 'activity', label: 'Activity' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'emissionKg', label: 'Emission (kg CO₂e)' }
]

export default function ActivityTable({ rows }) {
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('activityDate')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length)

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.activityDate ? new Date(row.activityDate).toLocaleString() : ''}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.activity}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.emissionKg}</TableCell>
                </TableRow>
              ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', px:2}}>
        <Typography variant="body2" sx={{py:1}}>{rows.length} records</Typography>
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5,10,25]}
        />
      </Box>
    </Paper>
  )
}

ActivityTable.propTypes = {
  rows: PropTypes.array
}
