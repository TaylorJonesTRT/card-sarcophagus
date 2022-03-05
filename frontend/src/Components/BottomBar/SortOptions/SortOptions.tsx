import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

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
      <span>Testing!</span>
    </div>
  )
}

export default SortOptions;
