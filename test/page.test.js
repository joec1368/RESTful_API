const { expect } = require('chai');

const supertest = require('supertest');
require('../dist/index.bundle');

const api = supertest('http://localhost:3000'); 

before((done) => {
  api.delete('/header/clear') 
    .end((err, res) => {
      
    });
    done();
});

describe('Page Add Page', () => {
  it('Add Page', (done) => {
    api.post('/page/setPage/c')
   .send([
     {
        "page":"5"
     },
     {
        "page":"6"
     },
     {
        "page":"7"
     }
   ])
   .end((err, res) => {
    if (err) {
     reject(new Error('An error occured, err: ' + err))
    }
    expect(res.body.fail.length).to.equal(0);
    done();
   })
  });
  var final_page = 0
  it('Iterate page', (done) => {
    api.get('/header/GetHead/c') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(1);
        api.post('/page/getPage/')
          .send({"id":res.body[0].article_key.trim()})
          .end((error,result) => {
            if (error) {
              reject(new Error('An error occured, err: ' + error));
            }
            expect(result.body[0].value).to.equal('5');
            expect(result.body[1].id).to.not.be.a('null');
            var id = result.body[1].id;
            api.post('/page/getPage/')
              .send({"id":id})
              .end((e,r) => {
                if (e) {
                  reject(new Error('An error occured, err: ' + error));
                }
                expect(r.body[0].value).to.equal('6');
                expect(r.body[1].id).to.not.be.a('null');
                id=r.body[1].id;
                final_page = id;
                api.post('/page/getPage/')
                  .send({"id":id})
                  .end((er,re) => {
                    if (er) {
                      reject(new Error('An error occured, err: ' + error));
                    }
                    expect(re.body[0].value).to.equal('7');
                    expect(re.body[1].id).to.be.a('null');
                    done();
                })
            })
          })
        })
  })

  it('check final page', (done) => {
    api.get('/header') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(2);
        let list = []
        list.push(res.body[0])
        list.push(res.body[1])
        list.sort(function(a, b) {
          var nameA = a.user.trim();
          var nameB = b.user.trim();
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        expect(list[0].final.trim()).to.equal(final_page);
        done();
      })
  })
});

describe('Page Update Page', () => {
  it('update first page', (done) => {
    const payload = {"originPage":"5","newPage":"10"};
    api.put('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  it('update second page', (done) => {
    const payload = {"originPage":"6","newPage":"11"};
    api.put('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  it('update final page', (done) => {
    const payload = {"originPage":"7","newPage":"12"};
    api.put('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  let final_page = 0
  it('Iterate page', (done) => {
    api.get('/header/GetHead/c') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(1);
        api.post('/page/getPage/')
          .send({"id":res.body[0].article_key.trim()})
          .end((error,result) => {
            if (error) {
              reject(new Error('An error occured, err: ' + error));
            }
            expect(result.body[0].value).to.equal('10');
            expect(result.body[1].id).to.not.be.a('null');
            var id = result.body[1].id.trim();
            api.post('/page/getPage/')
              .send({"id":id})
              .end((e,r) => {
                if (e) {
                  reject(new Error('An error occured, err: ' + error));
                }
                expect(r.body[0].value).to.equal('11');
                expect(r.body[1].id).to.not.be.a('null');
                id=r.body[1].id;
                final_page = id;
                api.post('/page/getPage/')
                  .send({"id":id})
                  .end((er,re) => {
                    if (er) {
                      reject(new Error('An error occured, err: ' + error));
                    }
                    expect(re.body[0].value).to.equal('12');
                    expect(re.body[1].id).to.be.a('null');
                    done();
                })
            })
          })
        })
  })

  it('check final page', (done) => {
    api.get('/header') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(2);
        let list = []
        list.push(res.body[0])
        list.push(res.body[1])
        list.sort(function(a, b) {
          var nameA = a.user.trim();
          var nameB = b.user.trim();
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        expect(list[0].final.trim()).to.equal(final_page);
        done();
      })
  })
});

describe('Page delete Page 1', () => {
  it('delete middle page', (done) => {
    const payload = {"page":"11"};
    api.delete('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  it('Iterate page without middle', (done) => {
    api.get('/header/GetHead/c') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(1);
        api.post('/page/getPage/')
          .send({"id":res.body[0].article_key.trim()})
          .end((error,result) => {
            if (error) {
              reject(new Error('An error occured, err: ' + error));
            }
            expect(result.body[0].value).to.equal('10');
            expect(result.body[1].id).to.not.be.a('null');
            var id = result.body[1].id.trim();
            api.post('/page/getPage/')
              .send({"id":id})
              .end((e,r) => {
                if (e) {
                  reject(new Error('An error occured, err: ' + error));
                }
                expect(r.body[0].value).to.equal('12');
                expect(r.body[1].id).to.be.a('null');
                done();
                
            })
          })
        })
  })
  it('delete first page', (done) => {
    const payload = {"page":"10"};
    api.delete('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  let final_page = 0
  it('Iterate page without first page', (done) => {
    api.get('/header/GetHead/c') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(1);
        final_page = res.body[0].article_key.trim();
        api.post('/page/getPage/')
          .send({"id":res.body[0].article_key.trim()})
          .end((error,result) => {
            if (error) {
              reject(new Error('An error occured, err: ' + error));
            }
            expect(result.body[0].value).to.equal('12');
            expect(result.body[1].id).to.be.a('null');
            done();
          })
        })

  })

  it('check final page', (done) => {
    api.get('/header/') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        let list = []
        list.push(res.body[0])
        list.push(res.body[1])
        list.sort(function(a, b) {
          var nameA = a.user.trim();
          var nameB = b.user.trim();
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        expect(list[0].final.trim()).to.equal(final_page);
        done();
      })
  })

  it('delete final page', (done) => {
    const payload = {"page":"12"};
    api.delete('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  it('check header first and final', (done) => {
    api.get('/header/') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        let list = []
        list.push(res.body[0])
        list.push(res.body[1])
        list.sort(function(a, b){
          var nameA = a.user.trim();
          var nameB = b.user.trim();
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        expect(list[0].final).to.be.a('null');
        expect(list[0].article_key).to.be.a('null');
        done();
      })
  })
});

describe('Page delete Page 2', () => {
  it('Add Page', (done) => {
    api.post('/page/setPage/c')
   .send([
     {
        "page":"10"
     },
     {
        "page":"11"
     },
     {
        "page":"12"
     }
   ])
   .end((err, res) => {
    if (err) {
     reject(new Error('An error occured, err: ' + err))
    }
    expect(res.body.fail.length).to.equal(0);
    done();
   })
  });

  it('delete first page', (done) => {
    const payload = {"page":"10"};
    api.delete('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  it('Iterate page without first', (done) => {
    api.get('/header/GetHead/c') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(1);
        api.post('/page/getPage/')
          .send({"id":res.body[0].article_key.trim()})
          .end((error,result) => {
            if (error) {
              reject(new Error('An error occured, err: ' + error));
            }
            expect(result.body[0].value).to.equal('11');
            expect(result.body[1].id).to.not.be.a('null');
            var id = result.body[1].id.trim();
            api.post('/page/getPage/')
              .send({"id":id})
              .end((e,r) => {
                if (e) {
                  reject(new Error('An error occured, err: ' + error));
                }
                expect(r.body[0].value).to.equal('12');
                expect(r.body[1].id).to.be.a('null');
                done();
                
            })
          })
        })
  })
  it('delete final page', (done) => {
    const payload = {"page":"12"};
    api.delete('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  let final_page = 0
  it('Iterate page without first page', (done) => {
    api.get('/header/GetHead/c') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.length).to.equal(1);
        final_page = res.body[0].article_key.trim();
        api.post('/page/getPage/')
          .send({"id":res.body[0].article_key.trim()})
          .end((error,result) => {
            if (error) {
              reject(new Error('An error occured, err: ' + error));
            }
            expect(result.body[0].value).to.equal('11');
            expect(result.body[1].id).to.be.a('null');
            done();
          })
        })

  })

  it('check final page', (done) => {
    api.get('/header/') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        let list = []
        list.push(res.body[0])
        list.push(res.body[1])
        list.sort(function(a, b) {
          var nameA = a.user.trim();
          var nameB = b.user.trim();
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        expect(list[0].final.trim()).to.equal(final_page);
        done();
      })
  })

  it('delete middle page', (done) => {
    const payload = {"page":"11"};
    api.delete('/page/c')
      .send(payload) 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        expect(res.body.fail.length).to.equal(0);
        done();
      })
  })

  it('check header first and final', (done) => {
    api.get('/header/') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        let list = []
        list.push(res.body[0])
        list.push(res.body[1])
        list.sort(function(a, b){
          var nameA = a.user.trim();
          var nameB = b.user.trim();
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        expect(list[0].final).to.be.a('null');
        expect(list[0].article_key).to.be.a('null');
        done();
      })
  })
});

describe('time out and delete all page', () => {
  it('Add Page', (done) => {
    api.post('/page/setPage/c')
   .send([
     {
        "page":"10"
     },
     {
        "page":"11"
     },
     {
        "page":"12"
     }
   ])
   .end((err, res) => {
    if (err) {
     reject(new Error('An error occured, err: ' + err))
    }
    expect(res.body.fail.length).to.equal(0);
   })
   api.post('/page/setPage/e')
   .send([
     {
        "page":"10"
     },
     {
        "page":"11"
     },
     {
        "page":"12"
     }
   ])
   .end((err, res) => {
    if (err) {
     reject(new Error('An error occured, err: ' + err))
    }
    expect(res.body.fail.length).to.equal(0);
   })
   done();
  });

  it('delete all page and check', (done) => {
    api.delete('/header/clear') 
    .end((err, res) => {
      api.get('/header') 
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured, err: ' + err));
        }
        let list = []
        list.push(res.body[0])
        list.push(res.body[1])
        list.sort(function(a, b){
          var nameA = a.user.trim();
          var nameB = b.user.trim();
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        expect(list[0].final).to.be.a('null');
        expect(list[0].article_key).to.be.a('null');
        expect(list[1].final).to.be.a('null');
        expect(list[1].article_key).to.be.a('null');
        done();
      })
    });
  });
});