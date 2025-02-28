import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        editProfile: resolve(__dirname, "./profile/edit/index.html"),
        listing: resolve(__dirname, "./listing/index.html"),
        editListing: resolve(__dirname, "./listing/edit/index.html"),
        createListing: resolve(__dirname, "./listing/create/index.html"),
        singleListing: resolve(__dirname, "./listing/singleListing/index.html"),
      },
    },
  },
});