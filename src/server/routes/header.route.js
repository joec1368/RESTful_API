import express from 'express';
import headerCtrl from '../controllers/header.controller';

const router = express.Router();

router.route('/GetHead/:name')
  .get(headerCtrl.headerGetCertain);

router.route('/')
  .post(headerCtrl.headerPost);
  
router.route('/')
  .get(headerCtrl.headerGet);

router.route('/clearAll')
  .delete(headerCtrl.clearHeaderPage)

router.route('/clear')
  .delete(headerCtrl.clearAll);

router.route('/:name')
  .put(headerCtrl.headerPut)
  .delete(headerCtrl.headerDelete);


export default router;
