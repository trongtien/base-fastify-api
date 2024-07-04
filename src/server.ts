import { App } from "./app";

const bootstraps = async () => {
  const server = new App();

  
  try {
    await server.start();
  } catch (err) {
    server.app.log.error(err);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

bootstraps();
