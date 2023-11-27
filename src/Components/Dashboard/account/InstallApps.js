import { useEffect } from 'react';
import {
  Backdrop,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from '@mui/material';
import useInstallerContext from '../../../hooks/useInstallerContext';
import { labelGenerator } from '../../DynamicDataTable/helpers';

export default function InstallApps() {
  const { loading, options, fetchOptions, installable, handleInstall } =
    useInstallerContext();

  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Module</TableCell>
              <TableCell align="right">Installed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {options &&
              options.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {labelGenerator(row.name)}
                    </TableCell>
                    <TableCell align="right">
                      <Checkbox
                        size="small"
                        checked={
                          installable.filter((n) => n.name === row.name)
                            .length !== 0
                        }
                        onChange={(e) => handleInstall(e, row.id)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
