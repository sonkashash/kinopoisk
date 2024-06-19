import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../../styles/MainPage/MainPage.css';

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

interface FilterGenresProps {
  selectedGenres: string[];
  onGenresChange: (genres: string[]) => void;
}

const FilterGenres: React.FC<FilterGenresProps> = ({ selectedGenres, onGenresChange }) => {
  const [selectedGenresState, setSelectedGenresState] = React.useState<string[]>(selectedGenres);

  React.useEffect(() => {
    setSelectedGenresState(selectedGenres);
  }, [selectedGenres]);

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
          {genreOptions.map((genre) => (
            <MenuItem
              key={genre}
              value={genre}
            >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}

export default FilterGenres;

