// vitest.unit.config.ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: "unit",
    dir: "src/use-cases",
    include: ["**/*.spec.ts"],
    environment: "node",
  },
});
