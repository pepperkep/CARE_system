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
    id: 'group' | 'location' | 'time' | 'details';
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
    details: string;
}
  
function createData(group: string, location: string, time: number, details: string): Data {
    return { group, location, time, details };
}
  
const rows = [
    createData('Soccer', 'DiSanto', 12, 'details'),
    createData('Basketball', 'Veale', 11, 'details'),
    createData('Volleyball', 'Adelbert', 8, 'details'),
    createData('Tennis', 'South Side', 7, 'details'),
    createData('Racquetball', 'Veale', 12, 'details'),
    createData('Swimming', 'Veale', 9, 'details'),
    createData('Football', 'DiSanto', 8, 'details'),
    createData('Running', 'DiSanto', 9, 'details'),
    createData('Track', 'DiSanto', 12, 'details'),
    createData('Cross Country', 'DiSanto', 11, 'details'),
    createData('Chess', 'Tink', 9, 'details'),
    createData('Frisbee', 'Veale Fields', 3, 'details'),
    createData('Intramural', 'Veale', 6, 'details'),
    createData('Fencing', 'Adelbert', 2, 'details'),
    createData('Archery', 'Adelbert', 1, 'details'),
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