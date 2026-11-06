# BazarDor (বাজার দর)

BazarDor is a responsive web application that helps users check the prices of everyday essential products in Bangladesh. Users can explore products, compare market prices, and see price changes.

## Technologies Used

- Next.js 16 (App Router)
- React
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- Lucide React
- React Fast Marquee
- Programming Hero BazarDor API

## Features

1. **Product Listing:** Browse essential products and their current prices.
2. **Category Navigation:** Explore products by category.
3. **Product Details:** View product information and market-wise price comparisons.
4. **Price Trends:** See price increases and decreases.
5. **Price Ticker:** View continuously scrolling product prices.
6. **Product Sorting:** Sort products by lowest and highest prices.
7. **User Authentication:** Sign up and sign in using email and password.
8. **Social Login:** Sign in using Google and GitHub.
9. **User Profile:** View and update profile information.
10. **Protected Routes:** Restrict access to selected pages for logged-out users.
11. **Responsive Design:** Optimized for mobile, tablet, and desktop screens.

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project directory:

```bash
cd YOUR_PROJECT_FOLDER
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and configure the required environment variables:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

MONGODB_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Start the development server:

```bash
npm run dev
```

Open [https://bazer-dor-virid.vercel.app/](https://bazer-dor-virid.vercel.app/) in your browser.

## Project Description

BazarDor aims to make everyday shopping decisions easier by providing product prices, category-based browsing, and market-wise price comparisons in one place.
