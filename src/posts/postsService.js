const xss = require('xss');

const sanitize = function (post) {

  return {
    id: post.id,
    content: post.content,
    date_added: post.date_added
  };

};

const postsService = {

  getAllPosts(db) {
    return db
      .select('*')
      .from('posts');
  },

  createPost(db, newPost) {
    newPost = sanitize(newPost);
    return db
      .insert(newPost)
      .into('posts')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  
  getPost(db, id) {
    return db
      .select('*')
      .from('posts')
      .where('id', id);
  }
};

module.exports = postsService;