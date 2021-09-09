import * as dotenv from 'dotenv';
import express from 'express';

import { validateRequest } from './services/service-users';

dotenv.config();

const app = express();
const port = process.env.PORT__LABEL_BACKEND_V2;

const extractUserPassswordFromAuthorization = (authorization: string) => {
  if (authorization) {
    const splittedAuthorization = authorization.split(' ');
    if (splittedAuthorization[0] === 'Bearer') {
      return Buffer.from(splittedAuthorization[1] ?? '', 'base64').toString(
        'utf-8',
      );
    }
  }

  return '';
};

app.get('/', (req, res) => {
  const userPassword = extractUserPassswordFromAuthorization(
    req.headers.authorization,
  );
  if (validateRequest(userPassword)) {
    res.send('Hello World!');
  } else {
    res.sendStatus(403);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
