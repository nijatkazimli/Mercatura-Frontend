import React from 'react';
import { Separator } from '@radix-ui/themes';
import { Review as ReviewType } from '../../../api';
import Review from './Review';

type Props = {
  reviews: ReviewType[],
};

function Reviews({ reviews }: Props) {
  return (
    <div>
      {reviews.map((review, index) => (
        <>
          <Review key={review.id} review={review} />
          {index < reviews.length - 1 && <Separator size="4" />}
        </>
      ))}
    </div>
  );
}

export default Reviews;
