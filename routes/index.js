/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'It\'s OK - Okize.com' });
};
