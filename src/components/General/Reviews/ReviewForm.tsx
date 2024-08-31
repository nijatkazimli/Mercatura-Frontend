import {
  Box, Button, Callout, TextArea,
} from '@radix-ui/themes';
import React, { useState } from 'react';
import { InfoCircledIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import './ReviewForm.css';

type Props = {
  isUserLoggedIn: boolean,
  onReviewSubmitClicked: (content: string, rating: number) => void,
};

function ReviewForm({ isUserLoggedIn, onReviewSubmitClicked }: Props) {
  const [content, setContent] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [calloutError, setCalloutError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    setCalloutError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content) {
      setCalloutError('You need to write a review.');
    } else if (!rating) {
      setCalloutError('You need to select a rating.');
    } else {
      onReviewSubmitClicked(content, rating);
      setContent('');
      setRating(0);
    }
  };

  const handleStarClick = (index: number) => {
    setCalloutError('');
    setRating(index + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <Box minWidth="500px" maxWidth="800px">
        <TextArea
          value={content}
          onChange={handleChange}
          size="2"
          disabled={!isUserLoggedIn}
          placeholder={isUserLoggedIn ? 'Write your review here...' : 'You need to be logged in to submit a review.'}
        />
        <div className={`rating-${isUserLoggedIn ? 'active' : 'disabled'}`}>
          <p style={{ marginRight: '10px' }}>Rating:</p>
          {Array.from({ length: 5 }, (_, i) => (
            i < rating ? <StarFilledIcon onClick={() => handleStarClick(i)} key={i} className="star" />
              : <StarIcon key={i} onClick={() => handleStarClick(i)} className="star" />
          ))}
        </div>
        <Callout.Root className={`callout ${calloutError ? 'visible' : 'hidden'}`}>
          {calloutError && (
            <>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                {calloutError}
              </Callout.Text>
            </>
          )}
        </Callout.Root>
      </Box>
      <Button
        disabled={!isUserLoggedIn}
        type="submit"
        color="purple"
        className={`review-submit-${isUserLoggedIn ? 'active' : 'disabled'}`}
      >
        Submit
      </Button>
    </form>
  );
}

export default ReviewForm;
