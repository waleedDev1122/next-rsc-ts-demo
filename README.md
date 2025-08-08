# Next.js Rendering Demo (CSR vs SSR vs RSC) + TypeScript

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

---

## Demo Overview

This repo demonstrates **three rendering modes** in Next.js using the **App Router** and a small **TypeScript** model layer, plus a **typed products listing + details** feature:

* **CSR** (Client-Side Rendering) — data fetched in the browser
* **SSR** (Server-Side Rendering) — data fetched on the server for each request
* **RSC** (React Server Components) — server-rendered components with **streaming** via `Suspense`
* **Typed Products Listing** — real-world TypeScript usage with utility types and model mapping

---

## Routes

### Rendering Demos

* `/csr-demo` — **Client-side** page that fetches products in a `useEffect`.

  * Expect: HTML shell first, then data arrives; you’ll see requests in **Fetch/XHR**.

* `/ssr-demo` — **Server-rendered** page (no client fetching).

  * Expect: the full HTML arrives at once; **no client fetch** for the product list.

* `/rsc-demo` — **React Server Components + Streaming**.

  * Expect: the heading renders first, then the product list **streams** in under a `Suspense` boundary.
    Check **Network → Document** → Preview updating progressively.

### Products Feature

* `/products` — **Typed Products Listing (CSR)**.

  * Fetches a list of products from `https://dummyjson.com/products` using **strongly typed** `Product` and `Review` models from `types/types.ts`.
  * Demonstrates practical **TypeScript utility types** (e.g., `Record`, `Omit`, `Required`, `Readonly`) in the component logic.
  * Clicking a product navigates to `/products/[id]`.

* `/products/[id]` — **Product Detail Page (CSR)**.

  * Dynamically fetches **one product** using the URL param (`id` from `useParams`).
  * Shows:

    * Product thumbnail, title, description
    * All key properties (`category`, `brand`, `price`, `discount`, `availability`, etc.)
    * Reviews list (if any)
  * Includes inline **TypeScript error handling** and `unknown` → `Error` type narrowing in `catch`.

---

## What to Expect in the Demo

### Behavioral differences (CSR vs SSR vs RSC)

* **CSR:** initial blank content → loading → hydrated list
* **SSR:** fully rendered HTML on first byte; minimal client JS required
* **RSC:** partial HTML streamed; `Suspense` fallback swaps when data resolves

### Products Feature Behavior

* **Products Listing**

  * Initial load shows "Loading…" until fetch resolves.
  * Each product card is typed — you can’t accidentally pass mismatched data without TypeScript catching it.
  * Uses `map()` with typed arrays to render all products.

* **Product Details**

  * Route param (`id`) is strictly typed.
  * Fetch errors are caught and displayed in a user-friendly way.
  * Demonstrates **optional chaining** and **null checks** for safe rendering.

---

## Bundle Observations

* CSR often ships more client JS
* SSR/RSC reduce client JS for server work; RSC pushes more into the server with finer-grained streaming

---

## TypeScript Guardrails

* Strongly typed product model
* Explicit mapping from raw API → app `Product` shape (no `any`)
* Utility types demonstrated:

  * `Omit` — creating `ProductForm` without `id` & `meta`
  * `Record<Category, Product[]>` — grouped products
  * `Readonly` & `Required` — immutable configs
  * `never` — exhaustive type checks

---

## Folder Structure

```
src/
  app/
    page.tsx                 # Home
    csr-demo/page.tsx        # CSR route
    ssr-demo/page.tsx        # SSR route
    rsc-demo/page.tsx        # RSC + Suspense/streaming route
    products/page.tsx        # Products listing (CSR)
    products/[id]/page.tsx   # Product detail page
    globals.css
  components/
    ProductCard.tsx
    ProductList.client.tsx   # 'use client' (CSR list)
    ProductList.server.tsx   # server component (used in RSC)
    ClientInfo.tsx           # shows navigator.userAgent (client-only)
    ServerInfo.tsx           # shows request headers (server-only)
  lib/
    fetchers.ts              # tiny helpers for fetch with caching options
  types/
    types.ts                 # Product, Review, literals/enums, etc.
```

---

## Example TypeScript Model

```ts
// types/types.ts
export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: string; // normalized to string e.g. "4.3"
  availabilityStatus?: 'in_stock' | 'out_of_stock';
  reviews?: Review[];
};

export type ProductForm = Omit<Product, 'id' | 'meta'>;
```

---

## Example Fetcher

```ts
// lib/fetchers.ts
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=10', { cache: 'no-store' });
  const data: { products: Array<{ id:number; title:string; description:string; price:number; thumbnail:string; rating:number; }> } = await res.json();

  return data.products.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    thumbnail: p.thumbnail,
    rating: p.rating.toFixed(1),
    availabilityStatus: 'in_stock',
    reviews: [],
  }));
}
```

---

## How to Explore the Differences

1. **Run dev**: `npm run dev` → open the routes side by side.
2. **Network panel**:

   * CSR: see XHR/fetch calls from the browser
   * SSR: HTML response already contains the list; no client fetch for it
   * RSC: watch the **Document** preview stream in parts (look for `Suspense` fallback first)
3. **Build stats**: `npm run build` → compare **First Load JS** per route
4. **Cache behavior**: Toggle `{ cache: 'no-store' }` vs `{ next: { revalidate: N } }` in `fetch` to demo revalidation.

---

## Tech Notes

* **App Router** with React 18 features (`Suspense`, RSC)
* **TypeScript** with strict typing in UI and data mapping
* Optional: **Turbopack** dev server for faster HMR

---

## Common Gotchas

* `getServerSideProps` isn’t supported in App Router. Use **async server components** and `fetch`.
* Client-only code (`navigator`, `window`) must live in files marked `'use client'`.
* To see streaming, ensure:

  * RSC route uses `Suspense` and awaits data inside a server child
  * Dev/build not forcing full buffering (default Next settings are fine)

