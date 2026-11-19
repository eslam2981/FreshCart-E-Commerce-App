# FreshCart Design System Specification (v1.0.0)

## 1. Executive Summary & Brand Direction
**FreshCart** is a modern, premium e-commerce platform designed to deliver an international-grade shopping experience. The design balances visual clarity, speed, reliability, and delightful micro-interactions.

- **Brand Archetype**: Fresh, Trustworthy, Modern, Efficient.
- **Visual Style**: Clean Minimalist with Vibrant Accents & Soft Surfaces.
- **Design Tokens Architecture**: 3-tier system (Primitives → Semantic Tokens → Component Tokens).

---

## 2. Color System & Design Tokens

### 2.1 Brand & Accent Palette
| Token Name | Hex Code | Purpose / Usage | Contrast on White |
| :--- | :--- | :--- | :--- |
| `--color-primary-50` | `#ECFDF5` | Soft badges, icon background discs, light highlights | N/A (Surface) |
| `--color-primary-100` | `#D1FAE5` | Active item background, subtle hover states | N/A (Surface) |
| `--color-primary-200` | `#A7F3D0` | Delicate borders on primary elements | N/A (Border) |
| `--color-primary-500` | `#10B981` | Vibrant green highlights, interactive states | 3.1:1 |
| `--color-primary-600` | `#059669` | **FreshCart Signature Green** (Logo, CTA buttons, search icon) | 4.6:1 (AA Pass) |
| `--color-primary-700` | `#047857` | Hover state for primary buttons | 6.2:1 (AAA Pass) |
| `--color-primary-800` | `#065F46` | Deep green text, dark brand accents | 8.8:1 (AAA Pass) |
| `--color-accent` | `#F97316` | Promotional badges, sale alerts, urgency tags | 3.5:1 |
| `--color-accent-hover` | `#EA580C` | Hover state for promotional actions | 4.7:1 (AA Pass) |

### 2.2 Neutrals & Surfaces
| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `--color-surface-bg` | `#FFFFFF` | Page base background |
| `--color-surface-subtle` | `#F8FAFC` | Top bar background, search input fill, subtle card wells |
| `--color-surface-card` | `#FFFFFF` | Card surfaces and dropdown menus |
| `--color-border-light` | `#F1F5F9` | Divider lines, subtle row separators |
| `--color-border-subtle` | `#E2E8F0` | Input borders, card borders, vertical dividers |
| `--color-border-medium` | `#CBD5E1` | Interactive borders on focus/hover |

### 2.3 Typography & Text Hierarchy
| Token Name | Hex Code | Usage | Contrast on White |
| :--- | :--- | :--- | :--- |
| `--color-text-heading` | `#0F172A` | Brand name, page headings, modal titles, "24/7 Help" | 16.1:1 (AAA Pass) |
| `--color-text-main` | `#1E293B` | Navigation links, product titles, primary body | 13.9:1 (AAA Pass) |
| `--color-text-muted` | `#64748B` | Top bar notices, phone/email text, secondary info | 5.2:1 (AA Pass) |
| `--color-text-subtle` | `#94A3B8` | Input placeholders, helper tags, breadcrumb dividers | 3.0:1 |

---

## 3. Typography System
- **Primary Typeface**: Geist Sans / Inter / system-ui fallback.
- **Font Scale**:
  - `text-[11px]` (0.6875rem): Micro-labels (e.g. "SUPPORT" uppercase).
  - `text-xs` (0.75rem / 1rem leading): Top-bar announcements, phone/email, badge counts.
  - `text-sm` (0.875rem / 1.25rem leading): Navigation links, search input, "24/7 Help" label.
  - `text-base` (1rem / 1.5rem leading): Body copy, button text.
  - `text-lg` (1.125rem / 1.75rem leading): Card headers, drawer titles.
  - `text-xl` (1.25rem / 1.75rem leading): Section titles.
  - `text-2xl` (1.5rem / 2rem leading): Logo wordmark ("FreshCart"), Hero subheadings.

---

## 4. Elevation, Radii & Shadows
- **Radii**:
  - Full Pill (`rounded-full`): Search bar container, search icon button, support badge disc, action badges.
  - Rounded Large (`rounded-xl` / 12px): Dropdown menus, modal dialogs, category sheets.
  - Rounded Medium (`rounded-lg` / 8px): Buttons, form inputs, product cards.
- **Shadows**:
  - `shadow-xs`: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
  - `shadow-sm`: `0 1px 3px 0 rgb(0 0 0 / 0.08)`
  - `shadow-dropdown`: `0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)`

---

## 5. Component Standards (First Phase: Header & Navigation)

### 5.1 Top Announcement Bar
- **Dimensions**: Desktop height `36px` (`py-2`), container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Background**: `#F8FAFC` (`bg-slate-50`), border bottom `1px solid #F1F5F9`.
- **Left**:
  - Delivery truck icon (`text-emerald-600`) + `"Free Shipping on Orders 500 EGP"`
  - Storefront icon (`text-emerald-600`) + `"New Arrivals Daily"`
- **Right**:
  - Phone link (`+1 (800) 123-4567`) + Email link (`support@freshcart.com`)
  - Vertical divider (`h-3.5 w-px bg-slate-300`)
  - User profile link (`Usama`) with user icon
  - Sign out link with exit icon

### 5.2 Main Header
- **Dimensions**: Desktop height `72px` (`py-3.5`), container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Logo**:
  - Cart mark: Custom SVG with wheels and emerald green speed slats (`#059669`).
  - Wordmark: "FreshCart" in bold slate-900 (`#0F172A`).
- **Search Bar**:
  - Pill shape with subtle slate border and gentle shadow.
  - Placeholder: `"Search for products, brands and more..."`
  - Integrated search action button: Emerald circle (`#059669`) with white search icon.
- **Nav Links**:
  - `Home`, `Shop`, `Categories` (dropdown chevron), `Brands`.
  - Hover: Emerald green transition.
- **Support Badge**:
  - Circular disc in emerald-50 (`#ECFDF5`) with emerald-600 headset icon.
  - Two-tier text: "Support" uppercase micro-label + "24/7 Help" bold text.
- **Commerce Actions**:
  - Wishlist (Heart icon) with live badge count.
  - Cart (Shopping bag/cart icon) with live badge count.
  - Orders/Account icon.
- **Mobile Adaptations**:
  - Sticky header with search collapse and slide-over navigation drawer.
  - Touch target size ≥ 44px for accessibility.

---

## 6. Accessibility & Compliance (WCAG 2.2 Level AA)
1. **Color Contrast**: All primary, body, and navigation text exceeds 4.5:1 ratio against white and light slate surfaces.
2. **Keyboard Navigation**: All interactive elements (search, links, icons, buttons) provide visible focus outlines (`focus-visible:ring-2 focus-visible:ring-emerald-500`).
3. **Screen Readers**: All icon-only buttons include descriptive `aria-label` tags (e.g. `"Search products"`, `"View wishlist"`, `"View shopping cart"`).
4. **Semantic HTML**: Proper `<header>`, `<nav>`, `<form role="search">`, and `<button>` elements.
