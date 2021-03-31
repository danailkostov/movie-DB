import React, { useCallback, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Typography, TextField, Divider } from "@material-ui/core";
import { fetchSearch } from "../../../services/services";
import { useHistory } from "react-router-dom";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

const Autosuggest = ({ value, setValue }) => {
  const [options, setOptions] = useState([]);

  const filterOptions = createFilterOptions({
    ignoreCase: true,
    stringify: (option) => (option.title ? option.title : option.name),
  });

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 200);
    };
  };

  const handleChange = async (event) => {
    const data = await fetchSearch(event.target.value, 1);
    if (event.target.value.length > 0) {
      setOptions(await fetchSearch(event.target.value, 1));
    } else {
      setOptions([]);
    }
    setValue(event.target.value);
    console.log(data);
  };

  //useCallback provides us the memorized callback
  const optimisedVersion = useCallback(debounce(handleChange), []);

  const history = useHistory();
  const handleClick = (id, type) => {
    history.push(`/${type}/${id}`);
  };

  return (
    <>
      <Autocomplete
        filterOptions={filterOptions}
        freeSolo
        options={options}
        renderOption={(option) => (
          <Typography
            style={{ width: "100%" }}
            onClick={() => handleClick(option.id, option.media_type)}
          >
            <Typography style={{ width: "100%" }} variant="subtitle2">
              {option.title ? option.title : option.name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {option.media_type}
            </Typography>
            <Divider />
          </Typography>
        )}
        getOptionLabel={(option) => (option.title ? option.title : option.name)}
        noOptionsText
        style={{ width: "100%" }}
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
