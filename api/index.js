import { createRequire } from 'module'; const require = createRequire(import.meta.url);

// api/index.ts
var config = {
  runtime: "nodejs"
};
async function handler(_req, res) {
  return res.json({
    status: "ok"
  });
}
export {
  config,
  handler as default
};
//# sourceMappingURL=index.js.map
