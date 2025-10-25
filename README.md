# Countries Next.js App

This is a personalized countries explorer app built with Next.js, React, Redux Toolkit, Supabase, and Material-UI. It allows users to search, filter, and view details about countries, with features like authentication, favourites, weather info, and theme switching.

## Live Demo

Check out the deployed app: [Countries Next.js App](https://countries-nextjs-react25k-ruddy.vercel.app/)

## Features

- Search countries
- View country details
- Add countries to favourites (Supabase auth)
- Email/password and Google login (Supabase)
- Weather info (OpenWeather API)
- Light/dark theme toggle
- Sticky header and footer with app name and tagline
- Custom favicon
- Favourites analytics
- Accessibility improvements
- My Profile page
- Edit profile (display name, username, bio, avatar)

## Getting Started

1. **Clone the repository:**
	```bash
	git clone https://github.com/TJsohn/countries-nextjs-react25k.git
	cd countries-nextjs-react25k
	```

2. **Install dependencies:**
	```bash
	npm install
	# or
	yarn install
	```

3. **Set up environment variables:**
	- Copy `.env.example` to `.env`:
	  ```bash
	  cp .env.example .env
	  ```
	- Fill in your own values for:
	  - `NEXT_PUBLIC_SUPABASE_URL`
	  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
	  - `NEXT_PUBLIC_OPENWEATHERAPI`
	  - `SUPABASE_SERVICE_ROLE_KEY` (do not share this publicly)

	> **Note:** For assignment review, you may request demo credentials from the author or use your own Supabase/OpenWeather accounts.

4. **Run the development server:**
	```bash
	npm run dev
	# or
	yarn dev
	```
	Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` — Next.js app router, pages, layout, providers
- `src/lib/` — Redux store, slices, Supabase client
- `public/` — Static assets, favicon, logo

## Environment Variables

See `.env.example` for required variables. **Do not commit your real `.env` file.**

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_OPENWEATHERAPI=your_openweather_api_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Assignment Notes

- All sensitive keys are excluded from the repository.
- For full functionality, reviewers should add their own API keys to `.env`.
- Contact the author privately for demo credentials if needed.

## License

This project is for educational purposes.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.