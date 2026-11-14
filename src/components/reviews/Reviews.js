import { useEffect, useRef, useState } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  const pending = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    getMovieData(movieId);
    setError('');
  }, [movieId, getMovieData]);
  

  const addReview = async (e) => {
    e.preventDefault();
    if (pending.current) return;
    const rev = revText.current;
    const body = rev.value.trim();
    if (!body) {
      setError('Write a review before submitting.');
      return;
    }
    pending.current = true;
    setSubmitting(true);
    setError('');

    try {
      const response = await api.post('/api/v1/reviews', { reviewBody: body, imdbId: movieId });
      setReviews((previous) => [...(previous || []), response.data]);
      rev.value = '';
    } catch (err) {
      setError('Your review could not be saved. Please try again.');
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          <>
            <Row>
              <Col>
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" submitting={submitting} />
                {error && <p role="alert">{error}</p>}
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
          </>
          {reviews?.map((r, index) => (
            <Row key={index}>
              <Col>{r.body}</Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
