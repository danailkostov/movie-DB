import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import OverviewTV from "./OverviewTV";
import CastTV from "./CastTV";
import RecommendedTV from "./RecommendedTV";
import { useParams } from "react-router-dom";
import {
  fetchTVDetails,
  fetchTVReviews,
  fetchTVCerts,
  fetchVideoTV,
  fetchTVCast,
  fetchRecTV,
} from "../services/services";

const SingleTV = () => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tvDetails, setTVDetails] = useState({});
  const [tvReviews, setTVReviews] = useState([]);
  const [tvVideo, setTVVideo] = useState("");
  const [tvCert, setTVcert] = useState([]);
  const [tvCast, setTVCast] = useState([]);
  const [tvRec, setTVRec] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setTVDetails(await fetchTVDetails(id));
      setTVReviews(await fetchTVReviews(id));
      setTVcert(await fetchTVCerts(id));
      setTVVideo(await fetchVideoTV(id));
      setTVCast(await fetchTVCast(id));
      setTVRec(await fetchRecTV(id));
      setIsLoading(false);
    };
    fetchAPI();
  }, [id]);

  if (isLoading) {
    return <div>Loading movie details...</div>;
  }

  return (
    <Container maxWidth="lg" component="section">
      {/* Overview Section */}
      <OverviewTV
        tvDetails={tvDetails}
        tvReviews={tvReviews === "[]" ? false : tvReviews}
        tvCert={tvCert}
        tvVideo={tvVideo}
      />
      {/* Cast Section */}
      {tvCast.length > 0 && (
        <CastTV tvCast={tvCast} id={id} title={tvDetails.name} />
      )}
      {/* Recommended Section */}
      {tvRec.length > 0 && <RecommendedTV tvRec={tvRec} />}
    </Container>
  );
};

export default SingleTV;
