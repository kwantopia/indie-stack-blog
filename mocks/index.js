const { rest } = require("msw");
const { setupServer } = require("msw/node");

const handlers = [
  rest.get("/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        test: "test",
      })
    );
  }),
];

const server = setupServer(...handlers);

server.listen({ onUnhandledRequest: "bypass" });
console.info("🔶 Mock server running");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
