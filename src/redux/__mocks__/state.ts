import ROLES from '../../constants/Roles';

export default {
  user: {
    id: '1', firstName: 'Test', lastName: 'User', userName: 'testuser', roles: [ROLES.USER],
  },
  products: {
    numberOfPages: 1,
    priceRange: {
      max: 20,
      min: 10,
    },
    products: [
      {
        id: '1', name: 'Product A', category: 'Category 1', price: 10, rating: 3,
      },
      {
        id: '2', name: 'Product B', category: 'Category 2', price: 20, rating: 4,
      },
    ],
  },
  categories: [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }],
  carts: [
    {
      userId: '1', id: '1', productIds: [], totalValue: 0, paid: false,
    },
    {
      userId: '1', id: '2', productIds: [], totalValue: 0, paid: false,
    },
  ],
  errorMessage: 'An error occurred',
};
