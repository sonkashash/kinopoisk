import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

interface FilterRatingProps {
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

const FilterRating: React.FC<FilterRatingProps> = ({ selectedRating, onRatingChange }) => {
  const [value, setValue] = React.useState<number>(selectedRating);

  React.useEffect(() => {
    setValue(selectedRating);
  }, [selectedRating]);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number | null) => {
    if (newValue !== null) {
      setValue(newValue);
      onRatingChange(newValue);
    }
  };

  return (
    <Box sx={{ '& > legend': { mb: 2 } }}>
      <Typography component="legend" className='filter__title'>Минимальный рейтинг</Typography>
      <Rating
        name="customized-10"
        max={10}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}

export default FilterRating;
