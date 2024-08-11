import React, { useEffect, useState } from 'react';
import { Separator } from '@radix-ui/themes';
import { fetchData, postData, Review as ReviewType } from '../../../api';
import Review from './Review';
import ReviewForm from './ReviewForm';

type Props = {
  productId: string;
};

function Reviews({ productId }: Props) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await fetchData<ReviewType[]>(`/review/get?productId=${productId}`);
        setReviews(fetchedReviews);
        setError(null);
      } catch (err) {
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const onReviewSubmitClicked = async (content: string, rating: number) => {
    try {
      const body = { content, rating };
      const path = `/review?authorId=65843d4a-9432-4c7c-9397-8350092d043c&productId=${productId}`;
      await postData(path, body);
      const fetchedReviews = await fetchData<ReviewType[]>(`/review/get?productId=${productId}`);
      setReviews(fetchedReviews);
    } catch (error) {
      setError('Failed to submit review.');
    }
  };

  if (loading) return <p>Loading reviews...</p>; // TODO: ADD ActivityIndicator
  if (error) return <p>{error}</p>; // TODO: ADD Error

  return (
    <div>
      <ReviewForm onReviewSubmitClicked={onReviewSubmitClicked} />
      {reviews.map((review, index) => (
        <React.Fragment key={review.id}>
          {index === 0 && <Separator key={`first-separator-${review.id}`} size="4" />}
          <Review key={review.id} review={review} />
          {index < reviews.length - 1 && <Separator key={`separator-${review.id}`} size="4" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Reviews;
