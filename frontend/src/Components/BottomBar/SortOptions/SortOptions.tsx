import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const SortOptions = () => {
  return (
    <div className='sort-options w-1/2 flex flex-col m-3'>
      <TextField
      id="input-with-icon-textfield"
      label="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="standard"
      />
      <FormControl>
        <FormLabel id='demo-radio-buttons-group-label'>Sort By:</FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='name'
          name='radio-buttons-group'
          className='h-1'
        >
          <FormControlLabel value="card-name" control={<Radio />} label="Name" />
          <FormControlLabel value="card-attack" control={<Radio />} label="Attack" />
          <FormControlLabel value="card-defense" control={<Radio />} label="Defense" />
          <FormControlLabel value="card-type" control={<Radio />} label="Card Type" />
          <FormControlLabel value="card-level" control={<Radio />} label="Level/Rank" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default SortOptions;
