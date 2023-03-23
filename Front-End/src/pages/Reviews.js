import React, { useState, useEffect } from 'react';
import { getAllReviews, voteReview } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getAllReviews();
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, []);


  const handleVote = async (reviewId, vote, username) => {
    const data = await voteReview(reviewId, vote, username);
    if (data && data.success) {
      const updatedReview = data.review;
      const updatedReviews = reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            score: updatedReview.score,
            upvoted_users: updatedReview.upvoted_users,
            downvoted_users: updatedReview.downvoted_users,
          };
        }
        return review;
      });
      setReviews(updatedReviews);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Reviews</h1>
      <ul className="list-group">
        {reviews.map((review) => (
          <li key={review.id} className="list-group-item">
            <h5 className="mb-3">
              {review.user.username} reviewed {review.movie_title} (
              {review.rating}/100)
            </h5>
            <p className="mb-3">{review.review_text}</p>
            <div>
              <button
                className="btn btn-sm btn-outline-primary mr-2"
                onClick={() => handleVote(review.id, "up", currentUser.username)}
              >
                Upvote
              </button>
              <button
                className="btn btn-sm btn-outline-danger mr-2"
                onClick={() => handleVote(review.id, "down", currentUser.username)}
              >
                Downvote
              </button>
              <span className="ml-2"> Review Score:     {review.score}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewPage;