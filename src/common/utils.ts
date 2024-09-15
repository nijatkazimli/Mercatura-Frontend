import { Review } from '../api';

/**
 * @deprecated
 * Calculates the average rating from an array of reviews.
 * @param {Review[]} reviews - An array of review objects.
 * @returns {number} The average rating, or 0 if there are no reviews.
 */
export const getAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

/**
 * Extracts the initials from a full name.
 * @param {string} fullName - The full name from which to extract initials.
 * @returns {string} A string containing the initials of the name, with each initial capitalized.
 */
export const getInitials = (fullName: string): string => {
  const nameParts = fullName.trim().split(' ');
  if (nameParts.length === 0) return '';
  const initials = nameParts.map((part) => part[0].toUpperCase()).join('');
  return initials;
};

type Color =
  | 'gray' | 'gold' | 'bronze' | 'brown' | 'yellow'
  | 'amber' | 'orange' | 'tomato' | 'red' | 'ruby'
  | 'crimson' | 'pink' | 'plum' | 'purple' | 'violet'
  | 'iris' | 'indigo' | 'blue' | 'cyan' | 'teal'
  | 'jade' | 'green' | 'grass' | 'lime' | 'mint'
  | 'sky';

/**
 * Returns a random color from a predefined list of color names.
 *
 * This function selects a random color from an array of color names and returns it as a string.
 * The colors are chosen from a fixed set of 27 different color names.
 *
 * @returns {Color} A random color name from the predefined list of colors, such as 'blue' or 'green'.
 */
export const getRandomColor = (): Color => {
  const colors: Color[] = ['gray', 'gold', 'bronze', 'brown', 'yellow',
    'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink',
    'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan',
    'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'];

  const randomIndex = Math.floor(Math.random() * colors.length);

  return colors[randomIndex];
};

/**
 * Rounds a number to two decimal places.
 *
 * This function takes a numerical value and rounds it to the nearest two decimal places.
 * It performs this by multiplying the number by 100, rounding it to the nearest integer,
 * and then dividing by 100 to restore the decimal point to its original position.
 *
 * @param {number} num - The number to be rounded.
 * @returns {number} The input number rounded to two decimal places.
 */
export const roundToNearestTwoPlaces = (num: number): number => Math.round(num * 100) / 100;
