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
import { EngineInfo, PersonalData } from '../type';

function createData(
  title: string,
  language: string,
  sentiment: number,
  url: string,
  personal_data: PersonalData
) {
  return {
    title,
    language,
    sentiment,
    history: [
      {
        source: url,
        // date: '2020-01-05',
        emails: personal_data.emails.join(", "),
        phoneNumbers: personal_data.phone_numbers.join(", "),
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
                    {/* <TableCell>Date</TableCell> */}
                    <TableCell align="right">Emails</TableCell>
                    <TableCell align="right">Numéro de téléphone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        <a href={historyRow.source} target="_blank" rel="noopener noreferrer">
                          {historyRow.source}
                        </a>
                      </TableCell>
                      {/* <TableCell>{historyRow.date}</TableCell> */}
                      <TableCell>
                        {historyRow.phoneNumbers}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.emails}
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

type CollapsibleTableProps = {
    currentPageItems: EngineInfo[];
};

export const CollapsibleTable = ({ currentPageItems }: CollapsibleTableProps) => {
  
  const rowsData = currentPageItems.map((item) =>
    createData(item.title, item.language == 'fr' ? '🇫🇷' : '🇬🇧', item.sentiment, item.url, item.personal_data)
  );

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
          {rowsData.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
