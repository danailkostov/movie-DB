import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { fetchSingleReview } from "../services/services";
import moment from "moment";

const SingleReview = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setReview(await fetchSingleReview(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const { author, content, created_at } = review;
  const reviewDate = moment(created_at, "YYYY-MM-DD").format("MMMM Do[,] YYYY");
  return (
    <Container
      maxWidth="md"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "scroll",
        height: "40%",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6">A review by {author}</Typography>
      <Typography variant="body2" gutterBottom paragraph>
        Written by <span style={{ fontWeight: "500" }}>{author}</span> on{" "}
        {reviewDate}
      </Typography>
      <Typography gutterBottom paragraph>
        {content}...
      </Typography>
    </Container>
  );
};

export default SingleReview;
