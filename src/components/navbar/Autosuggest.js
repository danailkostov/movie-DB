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
      }, 200);
    };
  };

  const handleChange = async (event) => {
    const data = await fetchSearch(event.target.value, 1);
    if (event.target.value.length > 0) {
      setOptions(await fetchSearch(event.target.value, 1));
      setOptions((state) => [
        ...state,
        { title: "All Results", name: "All Results", media_type: "All" },
      ]);
    } else {
      setOptions([]);
    }
    setValue(event.target.value);
    console.log(data);
  };

  //useCallback provides us the memorized callback
  const optimisedVersion = useCallback(debounce(handleChange), []);

  return (
    <>
      <Autocomplete
        filterOptions={(options, state) =>
          options.filter((opt) =>
            opt.title
              ? opt.title.includes(state.inputValue) ||
                opt.title === "All Results"
              : opt.name.includes(state.inputValue) ||
                opt.name === "All Results"
          )
        }
        freeSolo
        options={options}
        renderOption={(option) => (
          <Typography>
            <Link
              to={
                option.media_type === "movie"
                  ? "/movie/" + option.id
                  : option.media_type === "person"
                  ? "/person/" + option.id
                  : option.media_type === "tv"
                  ? "/tv/" + option.id
                  : "/allresults"
              }
              style={{ textDecoration: "none" }}
            >
              {option.title ? option.title : option.name}
            </Link>
          </Typography>
        )}
        getOptionLabel={(option) => (option.title ? option.title : option.name)}
        noOptionsText
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
