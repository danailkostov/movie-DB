import React, { useCallback, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Typography, Link, TextField } from "@material-ui/core";
import { fetchSearch } from "../../services/services";

const Autosuggest = ({ value, setValue }) => {
  const [searchItems, setSearchItems] = useState([]);

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
      setSearchItems(await fetchSearch(event.target.value, 1));
    } else {
      setSearchItems([]);
    }
    setValue(event.target.value);
  };

  //useCallback provides us the memorized callback
  const optimisedVersion = useCallback(debounce(handleChange), []);

  return (
    <>
      <Autocomplete
        freeSolo
        options={searchItems}
        renderOption={(option) => (
          <Typography>
            <Link href="#" target="_blank" style={{ textDecoration: "none" }}>
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
            />
          );
        }}
      />
    </>
  );
};

export default Autosuggest;
