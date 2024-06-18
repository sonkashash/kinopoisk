import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const marks = [
    {
        value: 1990,
        label: '1990',
    },
    {
        value: 2000,
        label: '2000',
    },
    {
        value: 2010,
        label: '2010',
    },
    {
        value: 2020,
        label: '2020',
    },
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
    console.log(value[0], value[1])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    React.useEffect(() => {
        onYearsChange(value);
    }, [value]);


    return (
        <Box sx={{ width: 200, '& > legend': { mb: 1 }}}>
            <Typography component="legend" className='filter__title'>Годы</Typography>
            <Slider
                // defaultValue={[1990, 1995]}
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



