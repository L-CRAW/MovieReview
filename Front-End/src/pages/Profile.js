import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { getUserReviews } from '../services/api';

function Profile() {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (currentUser) {
      getUserReviews(currentUser.username).then((data) => {
        setReviews(data);
      });
    }
  }, [currentUser]);

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Card className="w-75 mt-5">
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <ListGroup>
            <ListGroup.Item>
              <strong>Username:</strong> {currentUser && currentUser.username}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {currentUser && currentUser.email}
            </ListGroup.Item>
          </ListGroup>
          <Card.Title className="mt-3">Your Reviews</Card.Title>
          <ListGroup>
            {reviews.map((review) => (
               <ListGroup.Item key={review.id}>
               <strong>{review.movie_title}:</strong> {review.review_text}
               <br />
               <strong>Rating:</strong> {review.rating}
           </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;