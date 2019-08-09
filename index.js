const server = require('./api/server.js');

const port = process.env.PORT || 8000

server.get('/', (req, res) => {
    res.status(200).json({server:'is running' });
});
server.listen(port, () => console.log(`\n**API running on port ${port}**\n`))