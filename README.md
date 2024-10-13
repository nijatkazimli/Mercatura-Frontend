# Mercatura-Frontend
The repository containing the frontend of Mercatura project.<br>
[Parent repository](https://github.com/nijatkazimli/Mercatura)

## Intro
Mercatura is an e-commerce website with features, including but not limited to:
- Products with specific categories
- 3 different roles: Admin, Merchandiser, Regular User
- "Playlist" logic carts &ndash; User can have multiple carts and pay them separately
- Comprehensive admin dashboard
- And many more

## Techstack
- React
- Cookies (used for logged in user info storage)
- Redux (state management)
- [Saga](https://redux-saga.js.org) &ndash; Redux side effect manager (used for the business logic handling)
- TypeScript
- CSS
- [RadixUI](https://www.radix-ui.com)
- Nginx (used for serving the static files)

## Code structure
- src
  - api &ndash; contains all the logic for the interaction between BE and FE.
  - common &ndash; contains utility functions.
  - components &ndash; contains General components or the Page components.
  - constants &ndash; contains static image paths, sort options, and roles.
  - hooks &ndash; contains AuthContext (used for interaction between Redux and Cookies) and WindowDimensions<br> to dynamically get window dimensions to use in components.
  - media &ndash; contains static image files.
  - redux &ndash; contains all the Redux, Saga logic, and tests and mocks for them.
  - App.tsx &ndash; the entry point to the app.

## Demo
### Home Page
The left bar contains different filtering and sorting options.
On the right of the searchbar, there is a category dropdown for filtering.
**Note:** filtering and sorting is done on the **backend** side for faster results.<br>
<img alt="Home Page" src="demoImages/homePage.png" width="700" /><br>
By default, the frontend fetches 15 products. If there are more products pagination controls appear at the bottom of the home page.<br>
![Pagination Controls](demoImages/paginationControls.png)

### Login Page
<img alt="Login Page" src="demoImages/login.png" width="700" /><br>
**Note:** the user might have to relogin if he/she has stopped and restarted the backend container.

### Register Page
<img alt="Register Page" src="demoImages/register.png" width="700" /><br>
**Note:** the user cannot register as an admin on FE. There is already an admin account created. <br>Credentials: <br>
username **admin** <br>
password: **password**

### Dynamic Pages
After the user logs in, based on his/her roles, he/she can see and navigate to the pages &ndash; Merchandising and Admin.<br>
<img alt="Layout New Pages" src="demoImages/layoutNewPages.png" width="700" />

### Product Details
Here the user can see several details about the product.<br>
On the right side, user always sees at most 5 products from the same category.<br>
<img alt="Product Details" src="demoImages/productDetails.png" width="700" /><br>

#### Reviews
<img alt="Reviews" src="demoImages/reviews.png" width="700" /><br>

#### Add to cart
If you do not have any carts, do not worry. You can create one here.<br>
If the item is already in the cart, you cannot add it again.<br>
<img alt="Add to cart" src="demoImages/addToCart.png" width="700" /><br>

### Profile Photo Context Menu
Here the user can access profile, carts pages, and logout<br>
<img alt="Profile context" src="demoImages/profilePhotoContext.png" width="400" /><br>

### Carts
Here the user can create a new cart, see all the cart details, pay them, see items, or even delete.<br>
<img alt="Carts page" src="demoImages/carts.png" width="700" /><br>

#### Cart Items
<img alt="Cart items" src="demoImages/cartItems.png" width="700" /><br>

### Profile Page
Here the user can change his/her profile picture or password, logout, or even delete the account.
<img alt="Profile Page" src="demoImages/profilePage.png" width="700" /><br>

### Merchandising Page
Here the merchandiser can add products, categories, photos for the products, or delete the products.<br>
<img alt="Merchandising Page" src="demoImages/merchandisingPage.png" width="700" /><br>

### Admin Page
Here the admin can see numerous statistics about users, carts, and products in a chart or table form.<br>
<img alt="Admin Page" src="demoImages/adminPage.png" width="700" /><br>

### Contact Page
Here the user can see my contact details.<br>
<img alt="Contact Page" src="demoImages/contactPage.png" width="700" /><br>
