import React from 'react';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import type { Review as ReviewType } from '../../../api';
import { getRandomColor } from '../../../common/utils';
import Images from '../../../constants/Images';

type Props = {
  review: ReviewType,
};

function Review({ review }: Props) {
  const renderStars = () => Array.from({ length: 5 }, (_, i) => (
    i < review.rating ? <StarFilledIcon width={12} key={i} /> : <StarIcon width={12} key={i} />
  ));

  return (
    <Flex gap="3" py="10px" align="center">
      <Avatar size="4" radius="large" color={getRandomColor()} src={review.authorProfileImage ?? Images.defaultProfilePicture.src} fallback="USER" />
      <Flex direction="column">
        <Text size="1" color="gray">{review.authorFullName}</Text>
        <div>{renderStars()}</div>
        {review.content}
      </Flex>
    </Flex>
  );
}

export default Review;
