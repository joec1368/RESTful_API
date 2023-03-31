import express from 'express';
import articleCtrl from '../controllers/article.controller';

const router = express.Router();

router.route('/getPage')
  .post(articleCtrl.articleGet) 
router.route('/setPage')
  .post(articleCtrl.articlePost) 

router.route('/:name')
  .put(articleCtrl.articleUpdate);
  
router.route('/:name')
  .delete(articleCtrl.articleDelete);


router.route('/test')
  .get(articleCtrl.test)


export default router;
