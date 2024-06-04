import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Gauge } from '@mui/x-charts';

function createData(
  title: string,
  language: string,
  sentiment: number,
) {
  return {
    title,
    language,
    sentiment,
    history: [
      {
        source: 'https://monsite.fr',
        date: '2020-01-05',
        personal_data: 'monmail.fr',
      },
      {
        source: 'https://monsite.fr',
        date: '2020-01-05',
        personal_data: 'monmail.fr',
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell component="th" scope="row">{row.language}</TableCell>
        <TableCell component="th" scope="row">
            <Gauge color="green" width={100} height={100} value={row.sentiment*100} />    
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Source</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Données personnelles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.source}
                      </TableCell>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell align="right">
                        {historyRow.personal_data}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Jehanne Dussert', "🇫🇷", 0.4),
  createData('Jehanne Dussert 2', "🇫🇷", 0.4),
  createData('Jehanne Dussert 3', "🇫🇷", 0.4),
  createData('Jehanne Dussert 4', "🇫🇷", 0.4),
  createData('Jehanne Dussert 5', "🇫🇷", 0.4),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Titre</TableCell>
            <TableCell component="th" scope="row">Langue</TableCell>
            <TableCell component="th" scope="row">Sentiment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
