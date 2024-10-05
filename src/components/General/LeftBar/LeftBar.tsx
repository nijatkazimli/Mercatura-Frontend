import React, { useEffect, useState } from 'react';
import {
  Button, Flex, Select, Slider,
  Spinner,
} from '@radix-ui/themes';
import './LeftBar.css';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import SortByOptions from '../../../constants/SortByOptions';
import { MinMaxResponse } from '../../../api';
import { extractParamFromQuery, roundToNearestTwoPlaces } from '../../../common/utils';
import useWindowDimensions from '../../../hooks/WindowDimensions';

type Props = {
  isLoading: boolean,
  initialPriceRange: MinMaxResponse,
}

function LeftBar({ isLoading, initialPriceRange }: Props) {
  const { min, max } = initialPriceRange;
  const diffPrice = max - min;
  const [selectedSortOption, setSelectedSortOption] = useState<string>('PRICE_DESCENDING');

  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [priceRangePercentages, setPriceRangePercentages] = useState<number[]>([0, 100]);

  const [ratingRange, setRatingRange] = useState<number[]>([0, 5]);
  const [ratingRangePercentages, setRatingRangePercentages] = useState<number[]>([0, 100]);

  const { height } = useWindowDimensions();
  const pageQuery = useLocation().search;
  const navigate = useNavigate();
  const upperPadding = 10;

  useEffect(() => {
    const minPrice = Number(extractParamFromQuery('minPrice', pageQuery));
    const maxPrice = Number(extractParamFromQuery('maxPrice', pageQuery));
    const minRating = Number(extractParamFromQuery('minRating', pageQuery));
    const maxRating = Number(extractParamFromQuery('maxRating', pageQuery));
    const sortBy = extractParamFromQuery('sortBy', pageQuery);

    if (diffPrice !== 0) {
      if (!Number.isNaN(minPrice)) {
        const minPercentage = ((minPrice - min) / diffPrice) * 100;
        setPriceRangePercentages((prev) => {
          if (minPercentage !== prev[0]) {
            return [minPercentage, prev[1]];
          }
          return prev;
        });
      } else {
        setPriceRangePercentages((prev) => [0, prev[1]]);
      }

      if (!Number.isNaN(maxPrice)) {
        const maxPercentage = 100 - ((max - maxPrice) / diffPrice) * 100;
        setPriceRangePercentages((prev) => {
          if (maxPercentage !== prev[1]) {
            return [prev[0], maxPercentage];
          }
          return prev;
        });
      } else {
        setPriceRangePercentages((prev) => [prev[0], 100]);
      }
    } else { setPriceRangePercentages([0, 100]); }

    if (!Number.isNaN(minRating)) {
      const minPercentage = (minRating / 5) * 100;
      setRatingRangePercentages((prev) => {
        if (minPercentage !== prev[0]) {
          return [minPercentage, prev[1]];
        }
        return prev;
      });
    } else {
      setRatingRangePercentages((prev) => [0, prev[1]]);
    }

    if (!Number.isNaN(maxRating)) {
      const maxPercentage = (maxRating / 5) * 100;
      setRatingRangePercentages((prev) => {
        if (maxPercentage !== prev[1]) {
          return [prev[0], maxPercentage];
        }
        return prev;
      });
    } else {
      setRatingRangePercentages((prev) => [prev[0], 100]);
    }

    if (sortBy) {
      setSelectedSortOption((prevSort) => {
        if (sortBy !== prevSort) {
          return sortBy;
        }
        return prevSort;
      });
    } else {
      setSelectedSortOption('PRICE_DESCENDING');
    }
  }, [pageQuery, initialPriceRange]);

  useEffect(() => {
    if (priceRange.length === 2 && priceRangePercentages.length === 2) {
      const newMin = roundToNearestTwoPlaces(min + (diffPrice * priceRangePercentages[0]) / 100);
      const newMax = roundToNearestTwoPlaces(max - (diffPrice * (100 - priceRangePercentages[1])) / 100);
      const newPriceRange = [newMin, newMax];
      setPriceRange(newPriceRange);
    }
  }, [initialPriceRange, priceRangePercentages]);

  useEffect(() => {
    if (ratingRange.length === 2 && ratingRangePercentages.length === 2) {
      const newMin = roundToNearestTwoPlaces((5 * ratingRangePercentages[0]) / 100);
      const newMax = roundToNearestTwoPlaces((5 * ratingRangePercentages[1]) / 100);
      const newRatingRange = [newMin, newMax];
      setRatingRange(newRatingRange);
    }
  }, [ratingRangePercentages]);

  const onApplyClick = () => {
    const searchParams = new URLSearchParams(pageQuery);
    if (priceRangePercentages[0] !== 0) {
      searchParams.set('minPrice', priceRange[0].toString());
    } else {
      searchParams.delete('minPrice');
    }
    if (priceRangePercentages[1] !== 100) {
      searchParams.set('maxPrice', priceRange[1].toString());
    } else {
      searchParams.delete('maxPrice');
    }
    if (ratingRangePercentages[0] !== 0) {
      searchParams.set('minRating', ratingRange[0].toString());
    } else {
      searchParams.delete('minRating');
    }
    if (ratingRangePercentages[1] !== 100) {
      searchParams.set('maxRating', ratingRange[1].toString());
    } else {
      searchParams.delete('maxRating');
    }
    if (selectedSortOption !== 'PRICE_DESCENDING') {
      searchParams.set('sortBy', selectedSortOption);
    } else {
      searchParams.delete('sortBy');
    }
    navigate(`/?${searchParams.toString()}`);
  };

  const onResetClick = () => {
    if (priceRangePercentages[0] !== 0 || priceRangePercentages[1] !== 100
      || ratingRangePercentages[0] !== 0 || ratingRangePercentages[1] !== 100
      || selectedSortOption !== 'PRICE_DESCENDING'
    ) {
      setPriceRangePercentages([0, 100]);
      setRatingRangePercentages([0, 100]);
      setSelectedSortOption('PRICE_DESCENDING');
      const searchParams = new URLSearchParams();
      const name = extractParamFromQuery('name', pageQuery);
      const category = extractParamFromQuery('category', pageQuery);
      if (name) { searchParams.set('name', name); }
      if (category) { searchParams.set('category', category); }
      navigate(`/?${searchParams.toString()}`);
    }
  };

  return (
    <Flex
      className="leftBar"
      direction="column"
      gap="7"
      style={{ padding: `${2 * upperPadding}px`, minHeight: '500px', height }}
    >
      <div>
        <p style={{ margin: '2px' }}>Sort By:</p>
        <Select.Root value={selectedSortOption} onValueChange={setSelectedSortOption}>
          <Select.Trigger placeholder="Sort By:" />
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
          disabled={diffPrice === 0}
          color="purple"
        />
        <Flex direction="row" align="center" justify="between" gap="4">
          <Spinner loading={isLoading} size="3">
            <p style={{ textAlign: 'center' }}>
              Min –
              <br />
              {`${priceRange[0]} $`}
            </p>
          </Spinner>
          <Spinner loading={isLoading} size="3">
            <p style={{ textAlign: 'center' }}>
              Max –
              <br />
              {`${priceRange[1]} $`}
            </p>
          </Spinner>
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
            {' '}
            <StarIcon />
          </p>
          <p style={{ textAlign: 'center' }}>
            Max –
            <br />
            {ratingRange[1]}
            {' '}
            <StarFilledIcon />
          </p>
        </Flex>
      </div>
      <Flex direction="row" justify="between" gap="2">
        <Button
          onClick={onApplyClick}
          color="purple"
          style={{ width: 100, fontFamily: 'Montserrat' }}
        >
          Apply
        </Button>
        <Button
          onClick={onResetClick}
          color="purple"
          variant="surface"
          style={{ width: 100, backgroundColor: 'white', fontFamily: 'Montserrat' }}
        >
          Reset
        </Button>
      </Flex>
    </Flex>
  );
}

export default LeftBar;
