const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  console.log(
    '[node-ssr-test-app] Main page hit — staging log marker: orange-mango-bicycle-4281234',
    { path: req.path, ip: req.ip }
  );
  res.render('index', {
    title: 'Cloudways SSR Test App v2',
    nodeVersion: process.version,
    port: PORT,
    env: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memoryUsage: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    pid: process.pid,
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    node: process.version,
    uptime: process.uptime(),
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'node-ssr-test-app',
    renderMode: 'SSR',
    framework: 'Express',
    templateEngine: 'EJS',
    nodeVersion: process.version,
    env: process.env.NODE_ENV || 'development',
    port: PORT,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SSR Test App running on port ${PORT}`);
});
