module.exports = {
  apps: [
    {
      name: 'api.contag.id',
      exec_mode: 'cluster',
      instances: '1',
      script: './dist/main.js',
    },
  ],
};
