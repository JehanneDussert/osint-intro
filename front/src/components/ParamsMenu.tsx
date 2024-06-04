import { Dispatch, SetStateAction } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface ParamsMenuProps {
	socialNetworks: string[];
	engines: string[];
	docTypes: string[];
    setSocialNetworks: Dispatch<React.SetStateAction<string[]>>;
    setEngines: Dispatch<React.SetStateAction<string[]>>;
    setDocTypes: Dispatch<React.SetStateAction<string[]>>;
}

const socialNetwork = [
  'LinkedIn',
  'Facebook',
  'X',
  'Instagram'
];

const docs = [
  'pdf',
  'doc',
  'xls'
];

const searchEngines = [
  'Google',
  'DuckDuckGo',
];

const dorks = [
	{ value: socialNetwork, title: 'Recherche par réseaux sociaux', type: 'SN'},
	{ value: docs, title: 'Recherche par type de documents', type: 'doc'}
];

export const ParamsMenu: React.FC<ParamsMenuProps> = ({ socialNetworks, engines, docTypes, setSocialNetworks, setDocTypes, setEngines }) => {
  const handleChange = (
    event: SelectChangeEvent<string[]>,
    setValue: Dispatch<SetStateAction<string[]>>
  ) => {
    const {
      target: { value },
    } = event;
    setValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="flex flex-row py-2 rounded-lg space-x-4">
      <div className="flex-1">
        <h1 className='pb-4 pl-4'>Dorks</h1>
        {dorks.map((dork, index) => {
          const setValue = dork.type === 'SN' ? setSocialNetworks : setDocTypes;
          const value = dork.type === 'SN' ? socialNetworks : docTypes;

          return (
            <FormControl key={index} sx={{ m: 1, width: '100%' }}>
              <InputLabel id={`dork-select-label-${index}`}>{dork.title}</InputLabel>
              <Select
                labelId={`dork-select-label-${index}`}
                id={`dork-select-${index}`}
                multiple
                value={value}
                onChange={(e) => handleChange(e, setValue)}
                input={<OutlinedInput label={dork.title} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {dork.value.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={value.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        })}
      </div>
      <div className="flex-1">
        <h1 className='pb-4 pl-4'>Recherche multi-moteurs</h1>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="search-engines-select-label">Moteurs de recherche</InputLabel>
          <Select
            labelId="search-engines-select-label"
            id="search-engines-select"
            multiple
            value={engines}
            onChange={(e) => handleChange(e, setEngines)}
            input={<OutlinedInput label="Moteurs de recherche" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {searchEngines.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={engines.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
