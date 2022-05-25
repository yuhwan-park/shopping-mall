import { Router } from 'express';
import is from '@sindresorhus/is';

import { adminRequired } from '../middlewares';

const adminRouter = Router();

adminRouter.get('/', adminRequired, (req, res) => {
  res.status(200).json({
    result: 'approach-success'
  })
});

adminRouter.post('/')

export { adminRouter };
