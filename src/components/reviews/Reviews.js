import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  const { movieId } = useParams();

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId]); // Only depend on movieId
  

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      console.log('Adding review:', rev.value);

      const response = await api.post('/api/v1/reviews', { reviewBody: rev.value, imdbId: movieId });
      console.log('Response:', response);

      const updatedReviews = [...(reviews || []), { body: rev.value }];
      console.log('Updated reviews:', updatedReviews);

      rev.value = '';

      setReviews(updatedReviews);
      console.log('Reviews updated successfully.');
    } catch (err) {
      console.error('Error adding review:', err);
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
                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
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
