import express from 'express';
import pageCtrl from '../controllers/page.controller';

const router = express.Router();

router.route('/getPage')
  .post(pageCtrl.pageGet) 

router.route('/setPage/:name')
  .post(pageCtrl.pagePost) 

router.route('/:name')
  .put(pageCtrl.pageUpdate);
  
router.route('/:name')
  .delete(pageCtrl.pageDelete);


router.route('/test')
  .get(pageCtrl.test)


export default router;
