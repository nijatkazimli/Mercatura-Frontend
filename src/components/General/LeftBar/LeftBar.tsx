import React, { useEffect, useState } from 'react';
import { Flex, Select, Slider } from '@radix-ui/themes';
import './LeftBar.css';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import SortByOptions from '../../../constants/SortByOptions';
import { fetchData, MinMaxResponse } from '../../../api';
import { roundToNearestTwoPlaces } from '../../../common/utils';

function LeftBar() {
  const [selectedSortOption, setSelectedSortOption] = useState<string>('NEW_TO_OLD');
  const [initialPriceRange, setInitialPriceRange] = useState<number[]>([0, 100]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [priceRangePercentages, setPriceRangePercentages] = useState<number[]>([0, 100]);

  const [ratingRange, setRatingRange] = useState<number[]>([0, 5]);
  const [ratingRangePercentages, setRatingRangePercentages] = useState<number[]>([0, 100]);

  useEffect(() => {
    const fetchMinMaxPriceRange = async () => {
      try {
        const range = await fetchData<MinMaxResponse>('/product/priceRange');
        const rangeArr = [range.min, range.max];
        setInitialPriceRange(rangeArr);
        setPriceRange(rangeArr);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch minimum/maximum price range');
      }
    };
    fetchMinMaxPriceRange();
  }, []);

  useEffect(() => {
    if (priceRange.length === 2 && priceRangePercentages.length === 2) {
      const diff = initialPriceRange[1] - initialPriceRange[0];
      const newMin = roundToNearestTwoPlaces(initialPriceRange[0] + (diff * priceRangePercentages[0]) / 100);
      const newMax = roundToNearestTwoPlaces(initialPriceRange[1] - (diff * (100 - priceRangePercentages[1])) / 100);
      const newPriceRange = [newMin, newMax];
      setPriceRange(newPriceRange);
    }
  }, [priceRangePercentages]);

  useEffect(() => {
    if (ratingRange.length === 2 && ratingRangePercentages.length === 2) {
      const newMin = roundToNearestTwoPlaces((5 * ratingRangePercentages[0]) / 100);
      const newMax = roundToNearestTwoPlaces((5 * ratingRangePercentages[1]) / 100);
      const newRatingRange = [newMin, newMax];
      setRatingRange(newRatingRange);
    }
  }, [ratingRangePercentages]);

  return (
    <Flex className="leftBar" direction="column" gap="7" style={{ padding: '20px' }}>
      <div>
        <p style={{ margin: '2px' }}>Sort By:</p>
        <Select.Root value={selectedSortOption} onValueChange={setSelectedSortOption}>
          <Select.Trigger placeholder="Sort By:" radius="none" />
          <Select.Content color="purple">
            <Select.Group>
              {Object.entries(SortByOptions).map(([key, label]) => (
                <Select.Item key={key} value={key}>
                  {label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
      <div>
        <p style={{ margin: '4px' }}>Price:</p>
        <Slider
          value={priceRangePercentages}
          onValueChange={setPriceRangePercentages}
          defaultValue={[0, 100]}
          min={0}
          max={100}
          step={1}
          style={{ maxHeight: '40px' }}
          color="purple"
        />
        <Flex direction="row" align="center" justify="between" gap="4">
          <p style={{ textAlign: 'center' }}>
            Min –
            <br />
            {priceRange[0]}
            {' '}
            $
          </p>
          <p style={{ textAlign: 'center' }}>
            Max –
            <br />
            {priceRange[1]}
            {' '}
            $
          </p>
        </Flex>
      </div>
      <div>
        <p style={{ margin: '4px' }}>Rating:</p>
        <Slider
          value={ratingRangePercentages}
          onValueChange={setRatingRangePercentages}
          defaultValue={[0, 100]}
          min={0}
          max={100}
          step={1}
          style={{ maxHeight: '40px' }}
          color="purple"
        />
        <Flex direction="row" align="center" justify="between" gap="4">
          <p style={{ textAlign: 'center' }}>
            Min –
            <br />
            {ratingRange[0]}
            <StarIcon />
          </p>
          <p style={{ textAlign: 'center' }}>
            Max –
            <br />
            {ratingRange[1]}
            <StarFilledIcon />
          </p>
        </Flex>
      </div>
    </Flex>
  );
}

export default LeftBar;
