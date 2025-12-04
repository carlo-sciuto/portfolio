# Carlo Sciuto - Portfolio

A modern, responsive, and internationalized portfolio website built with the latest web technologies.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Internationalization:** [i18next](https://www.i18next.com/) (English, Italian, Spanish)
- **Deployment:** GitHub Pages

## 🛠️ Features

- 🎨 **Modern UI/UX:** Clean design with dark/light mode support.
- 🌍 **Multi-language:** Seamless switching between EN, IT, and ES.
- 📱 **Responsive:** Fully optimized for all device sizes.
- ⚡ **Fast:** Built with Vite for lightning-fast performance.
- 📲 **PWA Support:** Install as an app, works offline with service worker caching.
- 🔍 **SEO Optimized:** Meta tags, Open Graph, JSON-LD structured data, and sitemap.
- 🎯 **Feature Flags:** Control visibility of sections via environment variables.
- 🔧 **Developer Tools:** Husky hooks, commitlint, lint-staged, prettier.

## 🏃‍♂️ Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/carlo-sciuto/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory to enable optional features:

```bash
# Feature Flags
VITE_FEATURE_PROJECTS=true
VITE_FEATURE_CERTIFICATIONS=true
VITE_FEATURE_BLOG=false
VITE_FEATURE_TESTIMONIALS=false
```

See `.env.example` for all available options.

## 📲 PWA (Progressive Web App)

This portfolio is installable as a Progressive Web App:

- **Offline Support:** Core content cached and available offline
- **Install Prompt:** Users can install it like a native app
- **Auto Updates:** Service worker updates automatically
- **Optimized Caching:** Fonts, images, and assets cached strategically

### Testing PWA Locally

1. Build the project: `bun run build`
2. Preview: `bun run preview`
3. Open Chrome DevTools > Application tab
4. Check Manifest and Service Workers

## 📦 Deployment

This project is configured to deploy to GitHub Pages.

```bash
bun run deploy
```

The PWA service worker will be automatically registered in production.

## 📄 License

MIT
