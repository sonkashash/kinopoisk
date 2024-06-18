import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import '../../styles/MainPage/MainPage.css';
import ListItemText from '@mui/material/ListItemText';
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

const genreOptions = [
  'аниме',
  'мультфильм',
  'фантастика',
  'драма',
  'биография',
  'музыка',
  'комедия',
  'триллер',
  'документальный',
  'история',
  'детектив',
  'ужасы',
  'боевик',
  'семейное',
  
];

function getStyles(name: string, selectedGenresState: string[], theme: Theme) {
  return {
    fontWeight:
      selectedGenresState.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface FilterGenresProps {
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
}

const FilterGenres: React.FC<FilterGenresProps> = ({ selectedGenres, onGenresChange }) => {
  const theme = useTheme();
  const [selectedGenresState, setSelectedGenresState] = React.useState<string[]>(selectedGenres);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const newSelectedGenres = typeof value === 'string' ? value.split(',') : value;
    setSelectedGenresState(newSelectedGenres);
    onGenresChange(newSelectedGenres);
  };

  return (
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          multiple
          displayEmpty
          value={selectedGenresState}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <p>Жанры</p>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem disabled value="">
            <p>Жанры</p>
          </MenuItem> */}
          {genreOptions.map((genre) => (
            <MenuItem
              key={genre}
              value={genre}
              // style={getStyles(genre, selectedGenresState, theme)}
            >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}

export default FilterGenres;

