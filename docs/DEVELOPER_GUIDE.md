# Developer and Setup Guide

## 1. Prerequisites

- **Node.js 20 or newer** (22 LTS recommended). Check with `node -v`.
- **npm 10+** (ships with Node). pnpm or yarn also work; replace `npm` in the commands below.
- A code editor (VS Code recommended) and Git.
- Accounts you will need later: [Resend](https://resend.com) for email, [Vercel](https://vercel.com) for hosting.

## 2. Run it locally

You already have the full project, so there is no "create project" step. If you ever want to start from scratch, `npx create-next-app@latest` and copy these folders over.

```bash
cd monolith-properties
npm install                  # install dependencies
cp .env.example .env.local   # create your local environment file
npm run dev                  # http://localhost:3000
```

Production build and start:

```bash
npm run build
npm run start
```

Other checks: `npm run lint`, `npm run typecheck`, `npm run format`.

## 3. Environment variables

Copy `.env.example` to `.env.local` (never commit `.env.local`).

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | Public URL without a trailing slash. Drives canonical URLs, sitemap, Open Graph and the URLs inside WhatsApp messages. |
| `RESEND_API_KEY` | Yes in production | API key from Resend. Without it, enquiries are only logged in the dev console. In production the API returns an error. |
| `ENQUIRY_TO_EMAIL` | Recommended | Inbox that receives enquiries. Defaults to the email in `data/site.ts`. |
| `ENQUIRY_FROM_EMAIL` | Recommended | Sender address. Must belong to a domain verified in Resend. |
| `NEXT_PUBLIC_GA_ID` | Optional | Google Analytics 4 ID such as `G-XXXXXXXXXX`. Analytics loads only if set. |

## 4. Project structure

```
app/            routes, layouts, metadata, sitemap, robots, API route
components/     ui (primitives), layout, sections (home), properties, forms
lib/            utils, seo, jsonld, whatsapp, filters, validation, rate-limit, properties (data access)
data/           site, properties, agents, testimonials, faqs, services, areas
types/          Property, Agent, Testimonial, FAQ, Service, Area
public/         logo.svg, placeholder.svg
```

Components never import from `data/` directly for properties. They use `lib/properties.ts`, which is the one file to change when you move to a CMS.

## 5. Editing content

All content lives in `data/`. Save the file and the page updates.

### Add or edit a property (`data/properties.ts`)

Copy an existing object, give it a unique `id` and a unique `slug` (lowercase, hyphens), then edit the fields.

- `purpose`: `"sale"` or `"rent"`. For rent, `price` is the **yearly** rent in AED.
- `type`: `"house"`, `"apartment"`, `"plot"` or `"commercial"`.
- `location.area` must match a `name` in `data/areas.ts`, so area filters and area cards line up. Add a new area there first if needed.
- `images`: array of URLs. The first one is the card and OG cover.
- `featured: true` shows the property in the home page stacked cards (the first five are used).
- `agentId` must match an `id` in `data/agents.ts`.
- `description`: separate paragraphs with a blank line (`\n\n`).

The new property automatically gets a detail page, a sitemap entry, JSON-LD, metadata and an OG image.

### Agents, testimonials, FAQs, services, areas

- `data/agents.ts`: name, role, photo, `whatsapp` (digits only, international format, for example `971501234567`).
- `data/testimonials.ts`: add or remove objects. The home page marquee adapts.
- `data/faqs.ts`: the accordion and the FAQPage structured data both read this file.
- `data/services.ts`, `data/areas.ts`: edit the text. For services, `icon` must be one of `buy`, `sell`, `rent`, `management`, `investment`, `legal`.

### Business details (`data/site.ts`)

Name, phone, email, address, opening hours, social links, stats, navigation and WhatsApp settings all live here. Search the file for `TODO` to find every placeholder.

## 6. Images, logo, colors and fonts

### Images

- Remote images are allowed only from `images.unsplash.com` (see `images.remotePatterns` in `next.config.ts`).
- To use your own CDN, add its hostname to `remotePatterns`.
- To use local files, put them in `public/images/` and reference them as `/images/photo.jpg`.
- Some Unsplash photo IDs may be removed over time. A missing image shows a gray placeholder instead of breaking the layout. Replace the ID with another photo.
- The hero image URL is the `HERO_IMAGE` constant in `components/sections/Hero.tsx`.

### Logo

- Edit `components/layout/Logo.tsx` (SVG mark plus wordmark) and `public/logo.svg` (used in structured data).
- Favicon: replace `app/icon.svg`, or drop a `favicon.ico` into `app/`.

### Colors, font sizes and spacing (how styling works)

There are **no custom tokens** in `tailwind.config.ts` (it only lists which files to scan). Every style is a standard Tailwind class written directly on the element, so you edit the style in the same place you see it.

- **Font size of a heading:** open the component and change the classes on the heading. For example, the page title in `components/ui/PageHero.tsx`:
  ```tsx
  <h1 className="text-4xl sm:text-5xl lg:text-7xl leading-none tracking-tight font-bold">
  ```
  `text-4xl` is mobile, `sm:text-5xl` is tablets, `lg:text-7xl` is desktop. Use any Tailwind size (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` ... `text-9xl`), or an exact value such as `text-[42px]`.
- **Where headings are:** home hero in `components/sections/Hero.tsx`; section titles in `components/ui/SectionHeading.tsx`; inner page titles in `components/ui/PageHero.tsx`; property title in `app/properties/[slug]/page.tsx`.
- **Colors:** the site uses `bg-black`, `bg-white`, `text-black`, `text-white` and Tailwind's `neutral-*` grays. Change a color by editing the class on the element (for example `bg-black` to `bg-neutral-900`, or `bg-[#C9A24B]` for gold).
- **Section spacing:** each section's vertical padding is `py-20 sm:py-28 lg:py-36` in `components/ui/Section.tsx`.
- **Page width:** `max-w-[90rem]` in `components/ui/Container.tsx`.
- **Global styles:** `app/globals.css` holds the default body text size and color, the heading font, and the animations. Edit it like normal CSS.

If a change does not appear, restart the dev server, make sure only one `npm run dev` is running, and open the exact URL it prints (for example `http://localhost:3000`, or 3001 if 3000 was busy).

### Fonts

Fonts are loaded in `lib/fonts.ts` with `next/font`. Swap `Plus_Jakarta_Sans` for `Manrope` (or any Google font) and keep the `variable` names (`--font-heading`, `--font-body`). They are applied in `app/globals.css`.

## 7. WhatsApp number and messages

Everything is in `data/site.ts` under `whatsapp`:

```ts
whatsapp: {
  number: "971500000000",   // digits only, international format, no + or spaces
  messages: {
    generic: "...", properties: "...", contact: "...",
    property: "... {title} ... {url}",   // used on property pages
    agent: "Hello {agent}, ...",
  },
}
```

Placeholders: `{name}` (company), `{title}` (property), `{url}` (property link), `{agent}`. The floating button picks the right message per page, and property pages include the title and URL.

## 8. Email for the enquiry form

1. Create a Resend account and an API key.
2. Add and verify your sending domain in Resend (DNS records).
3. Set in `.env.local` (and in Vercel):
   ```
   RESEND_API_KEY=re_xxx
   ENQUIRY_TO_EMAIL=contact@yourdomain.ae
   ENQUIRY_FROM_EMAIL="Your Company <enquiries@yourdomain.ae>"
   ```
4. Submit the contact form to test. Replies go to the visitor's email when they provided one.

For quick tests without a domain, use `onboarding@resend.dev` as the sender. Resend only delivers those to your own account email.

**Anti-spam:** the API route includes a hidden honeypot field and an in-memory rate limit (5 requests per 10 minutes per IP). On Vercel each serverless instance has its own memory, so for strict limits replace `lib/rate-limit.ts` with Upstash Redis (`@upstash/ratelimit`).

**Newsletter:** the footer form sends you an email for each subscriber. For real campaigns, connect Resend Audiences, Mailchimp or similar inside `app/api/enquiry/route.ts`.

**Nodemailer instead of Resend:** replace the `Resend` block in `app/api/enquiry/route.ts` with a Nodemailer transport. The rest of the flow is unchanged.

## 9. Deploy on Vercel and connect a domain

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Vercel choose **Add New, Project** and import the repository. The Next.js preset is detected automatically.
3. Under **Environment Variables** add the variables from section 3. Set `NEXT_PUBLIC_SITE_URL` to your final domain, for example `https://yourdomain.ae`.
4. Deploy.
5. Go to **Settings, Domains**, add your domain, and create the DNS records Vercel shows (an `A` record for the root domain and a `CNAME` for `www`).
6. After DNS propagates, redeploy once so every canonical URL uses the final domain.

## 10. Post-launch SEO checklist

- [ ] `NEXT_PUBLIC_SITE_URL` points to the live domain; redeploy.
- [ ] Open `/sitemap.xml` and `/robots.txt` and confirm they load.
- [ ] **Google Search Console:** add the property (Domain verification via DNS is easiest), then submit `https://yourdomain.ae/sitemap.xml`.
- [ ] Request indexing for the home page and your top listings.
- [ ] **Google Business Profile:** create or claim the listing with the same name, address and phone as in `data/site.ts`. Add photos and hours, and link the website.
- [ ] **Analytics:** create a GA4 property and set `NEXT_PUBLIC_GA_ID`.
- [ ] Validate structured data with Google's Rich Results Test on the home page and one property page.
- [ ] Share a property link on WhatsApp or LinkedIn to confirm the Open Graph card.
- [ ] Replace placeholder copy, photos, phone numbers, agents and testimonials with real ones.
- [ ] Add real keywords naturally in area and listing descriptions (for example "apartments for rent in Dubai Marina").
- [ ] Ask satisfied clients for Google reviews.

## 11. Performance checklist and Lighthouse

- [ ] Run against a production build: `npm run build && npm run start`.
- [ ] Open Chrome DevTools, **Lighthouse** tab, choose **Mobile**, and run all four categories. Use an incognito window so extensions don't skew scores.
- [ ] Also test with PageSpeed Insights after deploying.
- [ ] Use properly sized images and keep `priority` only on the hero image.
- [ ] Keep hero and gallery images under about 300 KB at source quality 80.
- [ ] Avoid adding heavy third-party scripts. Analytics loads `afterInteractive`.
- [ ] Animations use only transform and opacity, and are reduced for users who enable "reduce motion".

The site is built for 90+ scores: Server Components by default, `next/font` with swap, `next/image` with AVIF and WebP, lazy-loaded lightbox and map, and no layout shifts. Real scores vary with your images, network and device, so measure after you replace placeholders.

## 12. Upgrade to a CMS later

Components read data only through `lib/properties.ts` and the files in `data/`.

1. Model `Property`, `Agent`, `Testimonial` and `FAQ` in Sanity, Strapi, Contentful or a database (Postgres with Prisma, for example), using the same fields as `types/index.ts`.
2. Rewrite the functions in `lib/properties.ts` to fetch from the CMS and return the same `Property` shape. They become `async`, so add `await` at their call sites (all are in Server Components and `generateStaticParams`).
3. Do the same for agents, testimonials and FAQs by replacing the imports of `data/agents.ts`, `data/testimonials.ts` and `data/faqs.ts`.
4. Add the CMS image hostname to `images.remotePatterns` in `next.config.ts`.
5. Set `export const revalidate = 3600;` on the property pages, or add a webhook that calls `revalidatePath`, so edits appear without a rebuild.
6. The property filter page filters in memory. With a large catalogue, move filtering and pagination into the CMS query.

## 13. Common errors and fixes

| Problem | Fix |
| --- | --- |
| `Error: Invalid src prop ... hostname is not configured under images` | Add the hostname to `images.remotePatterns` in `next.config.ts` and restart `npm run dev`. |
| An image shows gray | The remote URL returned an error (often a removed Unsplash photo). Replace the URL. |
| Fonts fail to download during `npm run build` | The build needs internet access to fetch Google Fonts. Check your connection or proxy. |
| Enquiry form says the email service is unavailable | `RESEND_API_KEY` is missing in production. Add it in Vercel and redeploy. |
| Resend returns "domain is not verified" | Verify your domain in Resend or use `onboarding@resend.dev` while testing. |
| Canonical or OG URLs show `localhost` | Set `NEXT_PUBLIC_SITE_URL` in Vercel and redeploy. |
| Property page returns 404 | The `slug` is missing or misspelled. `dynamicParams` is `false`, so only slugs in `data/properties.ts` exist. Restart the dev server after adding one. |
| Area filter returns nothing | `location.area` doesn't exactly match a name used in the filter. Use the exact same spelling. |
| Scrolling feels stuck inside a modal or menu | Add `data-lenis-prevent` to the scrollable element. |
| Hydration warning in development | Usually caused by a browser extension. Test in a private window. |
| `npm install` peer dependency warnings | Use Node 20+ and a fresh `node_modules`. Delete `node_modules` and `package-lock.json`, then reinstall. |
| `Port 3000 is in use` | Run `npm run dev -- -p 3001`. |
| Type errors after editing data | Run `npm run typecheck`. The `Property` interface in `types/index.ts` shows the required fields. |
