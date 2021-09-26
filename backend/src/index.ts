import server from './app';

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening: http://localhost:${process.env.PORT}`);
});
