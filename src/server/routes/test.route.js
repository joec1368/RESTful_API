import express from 'express';
import userCtrl from '../controllers/test.controller';

const router = express.Router();

router.route('/').post(userCtrl.userPost);
  
router.route('/').get(userCtrl.userGet);

router.route('/:name')
  .put(userCtrl.userPut)
  .delete(userCtrl.userDelete);


export default router;
