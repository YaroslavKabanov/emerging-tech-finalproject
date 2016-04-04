exports.render = function (req, res) {

    res.render('index', {
        title: 'Hello Michael',
        userFullname:req.user ? req.user.fullName:'',
        user: JSON.stringify(req.user)
    });
};
   
    
    
    

