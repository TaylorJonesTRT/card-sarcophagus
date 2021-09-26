/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import server from './app';

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening: http://localhost:${process.env.PORT}`);
});
