import { defineConfig } from "@umijs/max";
import routes from './src/routes/index'
import proxy from './src/config/proxy'
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: "Valluna",
  },
  // proxy:proxy.dev,
  proxy:proxy.pre,
  routes,
  npmClient: "npm",
  tailwindcss: {},
});
