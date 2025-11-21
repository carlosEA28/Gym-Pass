import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],

  // Workspaces deve ficar aqui!
  test: {
    include: ["src/**/*.spec.ts"],
  },
});
