import React, { useCallback, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Typography, TextField } from "@material-ui/core";
import { fetchSearch } from "../../services/services";
import { Link } from "react-router-dom";

const Autosuggest = ({ value, setValue }) => {
  const [options, setOptions] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = async (event) => {
    if (event.target.value.length > 0) {
      setOptions(await fetchSearch(event.target.value, 1));
    } else {
      setOptions([]);
    }
    setValue(event.target.value);
  };

  //useCallback provides us the memorized callback
  const optimisedVersion = useCallback(debounce(handleChange), []);

  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        renderOption={(option) => (
          <Typography>
            <Link to={"/movie/" + option.id} style={{ textDecoration: "none" }}>
              {option.title ? option.title : option.name}
            </Link>
          </Typography>
        )}
        getOptionLabel={(option) => (option.title ? option.title : option.name)}
        style={{ width: "40vw", borderRight: "none", borderLeft: "none" }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              placeholder="Search for movie, tv or person"
              value={value}
              onChange={optimisedVersion}
              // old version - onChange={(e) => handleChange(e)} - without debounce
            />
          );
        }}
      />
    </>
  );
};

export default Autosuggest;
