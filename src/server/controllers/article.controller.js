var md5 = require('md5');
import articleModule from '../modules/article.module';
import userModule from '../modules/test.module';
function print(text){
  res.status(200).send((text).toString());
}


const articleGet = (req, res) => {
  const id = req.body.id;

  articleModule.getData(id).then((result) => {
    res.send(result); 
  }).catch((err) => { return res.send(err); }); 
};

const articleUpdate = (req,res) => {
  const insertValues = req.body;
  const user = req.params.name;
  const originArticle = req.body.originArticle;
  const newArticle = req.body.newArticle;
  const originArticleID = md5(originArticle  + user);
  const newArticleID = md5(newArticle  + user);
  const array = []
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  if(newArticle == null || originArticle == null || user == null){
    res.send("error input");
  }
  articleModule.updateArticleAndSet(user).then((result) => {
    if(result.rowCount == 0 ){
      res.send("user error");
    }else{
      let head = result.rows[0].article_key.trim();
      let final = result.rows[0].final.trim();
      let list = []
      list.push(articleModule.modifyArticle(originArticleID,newArticleID,newArticle));
      if(head === originArticleID){
        // res.send("equal head " + head + " origin : " + originArticleID);
        list.push(userModule.modifyUserID(user,newArticleID))
        list.push(articleModule.modifyArticlePre(originArticleID,newArticleID));
      }else if(final === originArticleID){
        // res.send("equal , final " + head + " origin : " + originArticleID);
        list.push(userModule.modifyUserFinal(user,newArticleID))
        list.push(articleModule.modifyArticleNext(originArticleID,newArticleID));
      }else{
        // res.send("no equal , head " + head + " origin : " + originArticleID + "");
        list.push(articleModule.modifyArticleNext(originArticleID,newArticleID));
        list.push(articleModule.modifyArticlePre(originArticleID,newArticleID));
      }
      Promise.allSettled(list).then(values => {
        values.forEach(function(i){
          if(i["status"] == 'rejected'){
            returnO["fail"].push(i);
          }else{
            returnO["succeed"].push(i);
          }
        });
        res.send(returnO);
      });
    }
  }).catch((err) => { return res.send(err); }); 

}


const articlePost = (req, res) => {
  const insertValues = req.body;
  const array = []
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  let count = 0
  let user=0
  // user=insertValues.user;
  insertValues.forEach(function(i){
    if (i.hasOwnProperty('user')){
      user = i.user;
    }
  });
  insertValues.forEach(function(i){
    if(!i.hasOwnProperty('user')){
      i.id = md5(i.article + user)
      array[count] = i 
      count += 1 
    }
  });
  
  articleModule.updateArticleAndSet(user).then((result) => {
    if(result.rowCount == 0 ){
      res.send("user error");
    }else{
      let head = result.rows[0].article_key;
      let final = result.rows[0].final;
      let list = []
      if(head == null){
        list.push(userModule.modifyUserID(user,array[0].id));
      }
      list.push(userModule.modifyUserFinal(user,array[ array.length - 1].id));  
      for(let i = 0 ; i < array.length - 1 ; i++){
        array[i].next = array[i+1].id;
      }
      for(let i = 1 ; i < array.length ; i++){
        array[i].pre = array[i-1].id; 
      }
      if(final != null){
        list.push(articleModule.modifyArticleNext(final,array[0].id));
      }
      array[0].pre = final;
      array[ array.length - 1].next = null;
      array.forEach(function(i) {
        list.push(articleModule.createData(i));
      });
      Promise.allSettled(list).then(values => {
        values.forEach(function(i){
          if(i["status"] == 'rejected'){
            returnO["fail"].push(i);
          }else{
            returnO["succeed"].push(i);
          }
        });
        res.send(returnO);
      });
    }
  }).catch((err) => { return res.send(err); }); 
}

const articleDelete = (req,res) => {
  const user = req.params.name;
  const article = req.body.article;
  const articleID = md5(article + user);
  const returnO = {};
  returnO["succeed"] = [];
  returnO["fail"] = [];
  if(article == null || user == null){
    res.send("error input");
  }
  const list = []
  const info = 0
  let head, final;  
  articleModule.updateArticleAndSet(user)
    .then(function(result){
      head = result.rows[0].article_key.trim();
      final = result.rows[0].final.trim();
      return articleModule.getDataAllInfo(articleID);
    })
    .then((result) => {
      // res.send(result)
      if(head == articleID && final == articleID){
        list.push(userModule.modifyUserID(user,null));
        list.push(userModule.modifyUserFinal(user,null));
      }
      else if(head == articleID){
        list.push(userModule.modifyUserID(user,result["next"]));
        list.push(articleModule.modifyArticlePre(result["next"],result["previous"]));
      }else if(final == articleID){
        list.push(userModule.modifyUserFinal(user,result["previous"]))
        list.push(articleModule.modifyArticleNext(result["previous"],null));
      }else{
        list.push(articleModule.modifyArticleNext(result["previous"],result["next"]));
        list.push(articleModule.modifyArticlePre(result["next"],result["previous"]));
      }
      list.push(articleModule.deleteData(articleID));
      Promise.allSettled(list).then(values => {
        values.forEach(function(i){
          if(i["status"] == 'rejected'){
            returnO["fail"].push(i);
          }else{
            returnO["succeed"].push(i);
          }
        });
        res.send(returnO);
      });
    }).catch((err) => { return res.send(err); }); 

}

const test = (req, res) => {
  res.send('測試');
};




export default {
  test,
  articleGet,
  articlePost,
  articleUpdate,
  articleDelete
};
