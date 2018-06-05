module.exports = function(app){
    var HomeController = {
        index: function(req, res){
            res.sendfile('./public/index.html'); 
        }
    };    
    return HomeController;
};