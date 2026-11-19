# 🛒 FreshCart — Modern E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-v4-purple?style=for-the-badge&logo=next.js)](https://next-auth.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

A high-performance, full-featured online grocery and supermarket e-commerce platform built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **Tailwind CSS v4**, and **TypeScript**. Seamlessly integrated with a robust Cloud REST API architecture.

---

## ✨ Features Overview

### 🛍️ Shopping & Catalog
* **Dynamic Home Page**: Hero carousel with autoplay banners, promotional campaign badges, store perks, curated category cards, and best-seller showcase.
* **Smart Catalog & Filtering**:
  * Filter products by **Category** and **Brand**.
  * Dynamic **Sort** by price (low to high, high to low), rating, and popularity.
  * Real-time keyword **Search** with instantaneous query suggestions.
  * Full server-side pagination with clean URL search parameters.
* **Product Details**:
  * High-resolution image gallery with thumbnails selector.
  * Stock status, rating averages, brand metadata, and related category tags.
  * Interactive **Customer Reviews**: view real customer reviews, submit 5-star ratings with comments, and delete owned reviews.

### 🛒 Cart & Checkout
* **Persistent Cart Management**:
  * Add products, increment/decrement quantities, and remove single items or clear the entire cart.
  * Real-time recalculation of subtotal and discounts.
* **Promo Code & Coupons**:
  * Validate and apply discount coupons to the active cart with instant total recalculation.
* **Streamlined Checkout**:
  * Saved address selector with one-click autofill.
  * Support for **Cash on Delivery (COD)**.
  * Online Card payment powered by **Stripe Checkout Session** with automatic redirect and callback handling.

### ❤️ Wishlist
* Add/remove products from wishlist with real-time feedback.
* Global wishlist count badge in the navigation bar.
* Quick "Move to Cart" action directly from the wishlist view.

### 👤 User Account & Security
* **Profile Management**: Update full name, phone number, and email.
* **Address Book**: Manage multiple delivery addresses (add new, remove old, set default details).
* **Order History**: Track past and active orders, delivery status, payment verification, and order items summary.
* **Password Management**: Secure password update from the user profile.

### 🔐 Authentication & Protection
* **NextAuth.js Integration**: Secure JWT strategy with token synchronization and persistent session handling.
* **Credentials & Social Login**: Email/Password authentication alongside Google OAuth 2.0.
* **Password Recovery Flow**:
  * Step 1: Submit email to request a 6-digit reset code.
  * Step 2: Verify reset OTP code.
  * Step 3: Set new account password securely.
* **Route Protection Middleware**: Automatic redirection of unauthenticated guests away from `/cart`, `/checkout`, `/wishlist`, `/profile`, and `/orders`, while redirecting authenticated users away from auth pages (`/login`, `/register`).

### ⚡ Performance & UX
* **Mobile-First Responsive Design**: Optimized bottom navigation, mobile drawer menu, and touch-friendly gestures.
* **Zero Layout Shift**: Skeleton loaders on all async data fetching boundaries with React `Suspense`.
* **Instant Feedback**: Custom animated Toast notifications for all network interactions.
* **SEO Optimized**: Dynamic XML Sitemap (`/sitemap.xml`), robots policy (`/robots.txt`), OpenGraph meta tags, and high-resolution SVG favicon.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.4.2](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19.3.0](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/turbopack` |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Authentication** | [NextAuth.js v4](https://next-auth.js.org/) |
| **Form Management** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Icons & Sliders** | [Lucide React](https://lucide.dev/), [Swiper.js](https://swiperjs.com/) |
| **UI Primitives** | [Base UI](https://base-ui.com/), Shadcn UI Tokens |
| **API Backend** | Cloud REST API Architecture |

---

## 📁 Project Structure

```text
e-commerce/
├── public/                     # Static assets (logo, favicon.svg, icons)
├── src/
│   ├── actions/                # Server Actions (Auth signup, forgot password, etc.)
│   ├── app/                    # Next.js App Router
│   │   ├── (Auth)/             # Auth route group (login, register, forgot-password)
│   │   ├── (Main)/             # Main catalog route group (products, categories, brands)
│   │   ├── allorders/          # Post-checkout order confirmation page
│   │   ├── api/auth/           # NextAuth route handler
│   │   ├── cart/               # Cart page
│   │   ├── checkout/           # Checkout & payment page
│   │   ├── orders/             # Order history page
│   │   ├── profile/            # User account settings & addresses
│   │   ├── wishlist/           # User wishlist page
│   │   ├── error.tsx           # Global Error Boundary
│   │   ├── globals.css         # Tailwind CSS v4 design tokens & base rules
│   │   ├── icon.tsx            # Dynamic OpenGraph favicon generator
│   │   ├── layout.tsx          # Root Layout (Navbar, Providers, Toaster, Footer)
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── page.tsx            # Home page
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── sitemap.ts          # Dynamic sitemap.xml
│   ├── assets/                 # High-resolution local banners & images
│   ├── components/             # Reusable UI & Feature components
│   │   ├── Auth/               # Login, Register, Forgot Password forms
│   │   ├── BestSellerProducts/ # Home best-seller grid & skeleton
│   │   ├── Brands/             # Brands list & card components
│   │   ├── Carousel/           # Swiper hero banners
│   │   ├── Cart/               # Cart view, item rows, summary & coupon
│   │   ├── Checkout/           # Checkout view & address autofill
│   │   ├── HomeCategories/     # Category carousel & grid
│   │   ├── Navbar/             # TopBar, SearchBar, NavLinks, CommerceActions, Drawer
│   │   ├── Orders/             # Orders history & order item view
│   │   ├── ProductCard/        # Reusable product card with wishlist & cart actions
│   │   ├── ProductDetails/     # Product gallery, specs, and customer reviews
│   │   ├── Products/           # Shop filters, sort, and pagination
│   │   ├── Profile/            # Profile info, password update & address manager
│   │   ├── Wishlist/           # Wishlist grid and actions
│   │   └── ui/                 # Buttons, inputs, modals, toasts, skeletons
│   ├── context/                # CartContext & WishlistContext providers
│   ├── interfaces/             # TypeScript data contracts (Product, Cart, Order, User, etc.)
│   ├── lib/                    # NextAuth options & utility helpers
│   ├── middleware.ts           # Route protection middleware
│   ├── schemas/                # Zod schemas for form validation
│   ├── services/               # REST API service layers (products, cart, orders, etc.)
│   └── shared/                 # Client providers wrapper
├── next.config.ts              # Next.js configuration & remote image patterns
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** 20.x or higher
* **npm** (or **pnpm** / **yarn**)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eslam2981/FreshCart-E-Commerce-App.git
   cd FreshCart-E-Commerce-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your configuration:
   ```env
   BASE_URL=https://your-api-domain.com
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_run_openssl_rand_base64_32
   GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

### Build Locally
To test the production build locally:
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Import this repository into [Vercel](https://vercel.com).
2. Under **Project Settings ➔ Environment Variables**, add:
   * `BASE_URL`: *Your backend API base URL*
   * `NEXTAUTH_URL`: `https://your-app-domain.vercel.app`
   * `NEXTAUTH_SECRET`: *Your generated secret*
   * `GOOGLE_CLIENT_ID`: *Your Google OAuth Client ID*
   * `GOOGLE_CLIENT_SECRET`: *Your Google OAuth Client Secret*
3. Deploy! Next.js 16 with Turbopack will automatically build and deploy the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Compiles an optimized production build |
| `npm run start` | Starts the Next.js production server |
| `npm run lint` | Runs ESLint 9 to inspect code quality and conventions |

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for personal and commercial projects.

---

## 👨‍💻 Author

Crafted with ❤️ by **Eslam Gamil**
* **GitHub**: [github.com/eslam2981](https://github.com/eslam2981)
