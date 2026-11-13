# Amazon Clone - 3-Stage Development & GitHub Upload Guide

This project is built across **three distinct engineering stages**, each structured with its own Git commit, tag, and branch so you can showcase a progressive development workflow on GitHub.

---

## Stage Breakdown

### Stage 1: UI Foundation, Layout & Static Components
- **Branch**: `stage-1-ui-layout`
- **Tag**: `stage-1`
- **Commit**: `feat(stage-1): core layout, navigation, hero banner, product grid and footer`
- **Features Included**:
  - Global CSS design system with Amazon brand colors (`#131921`, `#232f3e`, `#febd69`, `#eaeded`).
  - Top navigation bar: Amazon Logo, Delivery location, Category search dropdown, Flag/Language, Account & Lists, Returns & Orders, Cart icon.
  - Sub-navigation bar with category links and promo strip.
  - Interactive auto-sliding Hero Carousel banner.
  - 4-in-1 Category Quad cards and product display grid with ratings and Prime badges.
  - Full Amazon multi-column footer with smooth "Back to top".

### Stage 2: Dynamic State Management, Cart & Search Filtering
- **Branch**: `stage-2-dynamic-cart`
- **Tag**: `stage-2`
- **Commit**: `feat(stage-2): context api state management, persistent cart, and search filtering`
- **Features Included**:
  - Global state architecture using React Context API + `useReducer` (`StateContext`).
  - Real mock product database across Electronics, Computers, Home, and Fashion.
  - Keyword search and category filtering in real-time.
  - Shopping Cart operations: Add to cart, quantity stepper (+ / -), remove item, subtotal calculations.
  - Cart persistence via `localStorage` (retains cart upon page refresh).
  - Floating Toast notification on cart addition with product preview and "View Cart" action.

### Stage 3: Multi-Page Routing, Authentication, Checkout & Orders
- **Branch**: `stage-3-complete-app`
- **Tag**: `stage-3`
- **Commit**: `feat(stage-3): react router, authentication, checkout flow, orders, and responsive polish`
- **Features Included**:
  - Client-side routing with `react-router-dom`:
    - `/` (Home page)
    - `/cart` (Cart page)
    - `/checkout` (Multi-step checkout)
    - `/signin` (Sign in / Registration modal)
    - `/orders` (Order history & tracking)
    - `/product/:id` (Product detail page with specs and Buy Box)
  - Simulated User Authentication with session persistence in `localStorage`.
  - Multi-step checkout: Delivery Address form, Payment Method selection (Card / UPI / COD), Order summary.
  - Order placement flow: Generates order ID, timestamp, empties cart, and redirects to Orders history.
  - Fully responsive layout for mobile, tablet, and desktop screens.

---

## How to Upload Each Stage to GitHub

### Option A: Push All Stages & Tags to One GitHub Repository (Recommended)

1. Create a new empty repository on [GitHub](https://github.com/new) (e.g., `amazon-clone`).
2. Add your GitHub remote URL:
   ```bash
   git remote add origin https://github.com/<your-username>/amazon-clone.git
   ```
3. Push the `main` branch (which contains the complete 3-stage commit history):
   ```bash
   git push -u origin main
   ```
4. Push all stage branches so recruiters can view each stage branch directly:
   ```bash
   git push origin stage-1-ui-layout
   git push origin stage-2-dynamic-cart
   git push origin stage-3-complete-app
   ```
5. Push the stage tags:
   ```bash
   git push origin --tags
   ```

---

### Option B: Push Stage by Stage (Simulating Step-by-Step Milestones)

If you want your GitHub repository's `main` branch to show each stage one by one over time:

1. **Upload Stage 1**:
   ```bash
   git checkout stage-1
   git branch -M main
   git remote add origin https://github.com/<your-username>/amazon-clone.git
   git push -u origin main --force
   ```

2. **Upload Stage 2**:
   ```bash
   git checkout stage-2
   git branch -M main
   git push origin main
   ```

3. **Upload Stage 3**:
   ```bash
   git checkout stage-3
   git branch -M main
   git push origin main
   ```

---

## How to Test or Switch Between Stages Locally

```bash
# View Stage 1
git checkout stage-1

# View Stage 2
git checkout stage-2

# Return to Stage 3 (Latest)
git checkout main
```
