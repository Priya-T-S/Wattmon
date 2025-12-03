import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // ⭐ use relative paths so /login.html works correctly in build
  server: {
    // ⭐ when you run `npm run dev`, open login.html first instead of index.html
    open: "/login.html",
  },
});
