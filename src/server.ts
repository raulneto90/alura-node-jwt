import { dataSource } from '@config/typeorm';

import { app } from './app';

const port = process.env.PORT || 3333;

dataSource.initialize().then(() => {
  app.listen(port, () => console.info(`Server started on port ${port}`));
});
