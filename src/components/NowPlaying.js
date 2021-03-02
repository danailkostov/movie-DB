import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Typography, Grid, CircularProgress } from "@material-ui/core";
import { useGlobalContext } from "../utils/context";
import { fetchVideo } from "../services/services";

const NowPlaying = () => {
  const { nowItems, posterUrl } = useGlobalContext();
  const [currentId, setCurrentId] = useState(nowItems[0].id);
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setVideo(await fetchVideo(currentId));
      setIsLoading(false);
    };
    fetchAPI();
  }, [currentId]);

  const handleClickImg = (index, id) => {
    setCurrentId(id);
  };

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        paragraph
        style={{ fontWeight: "500" }}
      >
        Now playing in theaters
      </Typography>
      <Grid container spacing={3}>
        {nowItems.map((item, index) => {
          const { title, poster_path, id } = item;
          return (
            <Grid item xs={3}>
              <img
                src={`${posterUrl}${poster_path}`}
                alt={title}
                style={{ width: "100%" }}
                onClick={() => handleClickImg(index, id)}
              />
            </Grid>
          );
        })}
      </Grid>
      {isLoading ? (
        <Typography align="center" style={{ marginTop: "100px" }}>
          <CircularProgress size={160} />
        </Typography>
      ) : (
        <ReactPlayer url={video} width="100%" height="600px" controls style={{marginTop: '15px'}}/>
      )}
    </>
  );
};

export default NowPlaying;
