import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import { useState } from 'react';
import { SalesData } from '../../state/sales/sales_interface';
import './SalesTable.css'

const salesTableColumns: { id: keyof SalesData, label: string }[] = [
  { id: 'weekEnding', label: 'WEEK ENDING' },
  { id: 'retailSales', label: 'RETAIL SALES' },
  { id: 'wholesaleSales', label: 'WHOLESALE SALES' },
  { id: 'unitsSold', label: 'UNITS SOLD' },
  { id: 'retailerMargin', label: 'RETAILER MARGIN' },
];


export default function SalesTable() {
  const productSalesData = useSelector((state: RootState) => state.sales.productDetails.sales);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof SalesData>('weekEnding');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = (property: keyof SalesData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const sortedData = productSalesData?.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedData = sortedData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log(productSalesData)
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sales table">
          <TableHead>
            <TableRow>
            {salesTableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={ column.id === 'weekEnding' ? 'left' :'right'}
                  sortDirection={orderBy === column.id ? order : false} 
                >
                  <TableSortLabel
                    className="custom-sort-label"
                    active={true}
                    direction={orderBy === column.id ? order : 'desc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{row.weekEnding}</TableCell>
                <TableCell align="right">${row.retailSales.toLocaleString()}</TableCell>
                <TableCell align="right">${row.wholesaleSales.toLocaleString()}</TableCell>
                <TableCell align="right">{row.unitsSold.toLocaleString()}</TableCell>
                <TableCell align="right">${row.retailerMargin.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={productSalesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}