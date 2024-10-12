/**
 * @jsconfig
 *
 * @name: myproject;
 *
 * @version: 0.0.1;
 *
 * @private: true;
 *
 * @workspaces[]:
 *  packages/*,
 *  examples/*,
 *  docs;
 *
 * @author: Ivan Jeremic;
 *
 * @license: MIT;
 *
 * @dependencies[]:
 *  react: ^18.3.1,
 *  react-dom: "^18.3.1;
 *
 * @devDependencies[]:
 *  vite: "^5.4.8",
 *  vitest": "^2.1.2;
 */

// frome here on you can write dynamic config for libaries.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

defineConfig({
  plugins: [react()],
});
