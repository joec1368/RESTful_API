import express from 'express';
// Router
import page from './page.route';
import header from './header.route';

import config from './../../config/config';

const router = express.Router();

router.use('/page', page);
router.use('/header', header);


export default router;
