import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "/portfolio/",
  plugins: [
    react(),
    sitemap({
      hostname: "https://carlo-sciuto.github.io/portfolio",
      dynamicRoutes: [
        "/",
        "/#hero",
        "/#about",
        "/#experience",
        "/#skills",
        "/#projects",
        "/#contact",
      ],
      readable: true,
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "apple-touch-icon.png",
        "pwa-192x192.png",
        "pwa-512x512.png",
      ],
      manifest: {
        name: "Carlo Sciuto - Portfolio",
        short_name: "Carlo Sciuto",
        description: "Senior Full Stack Developer - Portfolio showcasing my work and skills",
        theme_color: "#3b82f6",
        background_color: "#0f172a",
        display: "standalone",
        orientation: "portrait",
        scope: "/portfolio/",
        start_url: "/portfolio/",
        icons: [
          {
            src: "/portfolio/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/portfolio/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/portfolio/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/portfolio/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,json}"],
        globIgnores: ["**/node_modules/**/*", "**/test-results/**/*"],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.credly\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "credly-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/github\.com\/.*\.png$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "github-images-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("i18next")) {
              return "vendor";
            }
            if (id.includes("framer-motion")) {
              return "motion";
            }
            if (id.includes("@radix-ui")) {
              return "ui";
            }
          }
        },
      },
    },
  },
});
