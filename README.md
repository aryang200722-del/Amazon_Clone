# Amazon Clone (React + Vite)

A full-featured Amazon frontend clone built with React, HTML5, CSS3, JavaScript, and Context API.

## Project Stages Overview

This repository is organized into three progressive development stages:

- **Stage 1: Core Layout & Static UI (`stage-1-ui-layout`)**
  - Responsive Amazon Header with location picker, category search bar, language toggle, and cart badge.
  - Sub-navigation bar with quick category filters.
  - Interactive hero banner carousel with deal highlights.
  - 4-in-1 category quad-tiles and responsive product cards with star ratings and Prime badges.
  - Multi-tier Amazon footer with smooth "Back to top" functionality.

- **Stage 2: State Management & Dynamic Cart (`stage-2-dynamic-cart`)**
  - React Context API + `useReducer` global state architecture.
  - Dynamic product catalog with category and keyword search filtering.
  - Persistent shopping cart stored in `localStorage`.
  - Add to cart, quantity increment/decrement, and remove item actions.
  - Real-time subtotal calculation and notification toasts.

- **Stage 3: Multi-Page Routing, Authentication & Checkout Flow (`stage-3-complete-app`)**
  - Full client-side routing using `react-router-dom` (`/`, `/cart`, `/checkout`, `/signin`, `/orders`).
  - Mock user authentication (Sign In / Register / Sign Out) with session persistence.
  - Multi-step checkout experience (Delivery Address, Payment Selection, Order Review).
  - Simulated order placement with order history and tracking view.
  - Polished responsive layouts for mobile, tablet, and desktop viewports.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
git clone <your-repository-url>
cd Amazon_Clone
npm install
```

### Running Locally
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## How to Push Each Stage to GitHub

To push the milestone branches or tags to your remote repository:

```bash
# Link your remote repository
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# Push main with all commits
git push -u origin main

# Push individual stage branches
git push origin stage-1-ui-layout
git push origin stage-2-dynamic-cart
git push origin stage-3-complete-app

# Or push all tags
git push origin --tags
```
