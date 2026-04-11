module.exports = {
  apps: [
    {
      name: "creatrweb",
      script: "node",
      args: "dist/server/entry.mjs",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 5000,
      },
    },
  ],
};
