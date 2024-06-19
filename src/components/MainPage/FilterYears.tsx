import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const marks = [
  { value: 1990, label: '1990' },
  { value: 2000, label: '2000' },
  { value: 2010, label: '2010' },
  { value: 2020, label: '2020' }
];

function valuetext(value: number) {
  return `${value}`;
}

interface FilterYearsProps {
  selectedYears: number[];
  onYearsChange: (years: number[]) => void;
}

const FilterYears: React.FC<FilterYearsProps> = ({ selectedYears, onYearsChange }) => {
  const [value, setValue] = React.useState<number[]>(selectedYears);

  React.useEffect(() => {
    setValue(selectedYears);
  }, [selectedYears]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onYearsChange(newValue as number[]);
  };

  return (
    <Box sx={{ width: 200, '& > legend': { mb: 1 } }}>
      <Typography component="legend" className='filter__title'>Годы</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={1990}
        max={2024}
        marks={marks}
      />
    </Box>
  );
}

export default FilterYears;
