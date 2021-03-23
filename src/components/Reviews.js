import { Container, Grid, Typography, Modal, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieReviews, fetchTVReviews } from "../services/services";
import moment from "moment";
import { Link } from "react-router-dom";
import SingleReview from "../components/SingleReview";

const Reviews = () => {
  const { id, title } = useParams();
  const [movieReviews, setMovieReviews] = useState("");
  const [tvReviews, setTVReviews] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setMovieReviews(await fetchMovieReviews(id));
      setTVReviews(await fetchTVReviews(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const reviews = movieReviews || tvReviews;
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom align="center">
            {title}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom paragraph>
            <Link
              to={`/movie/${id}`}
              style={{ textDecoration: "none", color: "#45A29E" }}
            >
              Back to main
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            {reviews.map((review) => {
              const { author, content, created_at, id } = review;
              const reviewDate = moment(created_at, "YYYY-MM-DD").format(
                "MMMM Do[,] YYYY"
              );

              return (
                <>
                  <div
                    style={{
                      border: "1px solid #45A29E",
                      padding: "15px",
                      borderRadius: "5px",
                      marginBottom: "15px",
                    }}
                  >
                    <Typography variant="h6">A review by {author}</Typography>
                    <Typography variant="body2" gutterBottom paragraph>
                      Written by{" "}
                      <span style={{ fontWeight: "500" }}>{author}</span> on{" "}
                      {reviewDate}
                    </Typography>
                    <Typography gutterBottom paragraph>
                      {content.substr(0, 1000)}...
                      <Button
                        onClick={() => {
                          setIsReviewOpen(true);
                          setCurrentId(id);
                        }}
                        style={{ color: "white" }}
                      >
                        Read more
                      </Button>
                    </Typography>
                  </div>
                  <Modal
                    open={isReviewOpen}
                    onClose={() => setIsReviewOpen(false)}
                  >
                    <SingleReview id={currentId} />
                  </Modal>
                </>
              );
            })}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Reviews;
