import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import glsl from "vite-plugin-glsl";

export const viteConfig = {
  //   publicDir: "docs/public",
  plugins: [
    glsl(),
    vitePluginForArco({
      style: "css",
    }),
    AutoImport({
      imports: ["vue"],
      dts: "unplugin/auto-imports.d.ts",
      resolvers: [ArcoResolver()],
    }),
    Components({
      dts: "unplugin/components.d.ts",
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or 'modern'
      },
    },
  },

  ssr: { noExternal: ["@arco-design/web-vue"] },
};
