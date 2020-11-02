import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
    id: 'group' | 'location' | 'time' | 'size' | 'details';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }  

const columns: Column[] = [
    { id: 'group', label: 'Group', minWidth: 170 },
    { id: 'location', label: 'Location', minWidth: 170 },
    {
      id: 'time',
      label: 'Time',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: 'details',
      label: 'details',
      minWidth: 170,
    },
];
  
interface Data {
    group: string;
    location: string;
    time: number;
    size: number;
    details: string;
}
  
function createData(group: string, location: string, time: number, size: number, details: string): Data {
    return { group, location, time, size, details };
}
  
const rows = [
    createData('India', 'IN', 1324171354, 3287263, 'd'),
    createData('China', 'CN', 1403500365, 9596961, 'd'),
    createData('Italy', 'IT', 60483973, 301340, 'd'),
    createData('United States', 'US', 327167434, 9833520, 'd'),
    createData('Canada', 'CA', 37602103, 9984670, 'd'),
    createData('Australia', 'AU', 25475400, 7692024, 'd'),
    createData('Germany', 'DE', 83019200, 357578, 'd'),
    createData('Ireland', 'IE', 4857000, 70273, 'd'),
    createData('Mexico', 'MX', 126577691, 1972550, 'd'),
    createData('Japan', 'JP', 126317000, 377973, 'd'),
    createData('France', 'FR', 67022000, 640679, 'd'),
    createData('United Kingdom', 'GB', 67545757, 242495, 'd'),
    createData('Russia', 'RU', 146793744, 17098246, 'd'),
    createData('Nigeria', 'NG', 200962417, 923768, 'd'),
    createData('Brazil', 'BR', 210147125, 8515767, 'd'),
];
  
const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
});

export const ReportCard = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.location}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}