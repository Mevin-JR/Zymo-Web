import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: ['.loca.lt'], // Allow all LocalTunnel domains
        host:true,
        historyApiFallback: true,
      },
   
});
