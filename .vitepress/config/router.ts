export const routerConfig = {
  rewrites: {
    "docs/:page": ":page",
    "docs/:pkg/:page/(.*)": ":pkg/:page/index.md",
  },
};
