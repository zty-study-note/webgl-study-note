import { defineConfig } from "vitepress";
import { markdownConfig } from "./config/markdown";
import { sidebarConfig } from "./config/sidebar";
import { headConfig } from "./config/head";
import { navConfig } from "./config/nav";
import { themeConfig } from "./config/theme";
import { routerConfig } from "./config/router";
import { viteConfig } from "./config/vite";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "WebGL学习笔记",
  description: "生活没有翻不过去的坎，只有翻不完的坎。",
  head: headConfig as any,
  // base: "/demo/",
  // srcDir: "docs",
  themeConfig: {
    // 主题配置
    ...(themeConfig as any),

    // 导航配置
    nav: navConfig,

    // 侧栏配置
    sidebar: sidebarConfig,
  },

  // 路由配置
  ...(routerConfig as any),

  // markdown 配置
  markdown: markdownConfig,

  // vite 配置
  vite: viteConfig,
});
