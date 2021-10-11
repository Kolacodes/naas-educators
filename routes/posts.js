var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var flash           =  require("connect-flash");
var post = require("../models/post");
var comment = require("../models/comment");
var user = require("../models/User");



// INDEX ROUTE 1


router.get("/", function(req, res){
    // get all posts from posts DB
    post.find({}, function(err, all_posts){
        if(err){console.log(err);
        }else{
            res.render("posts/index", {all_posts:all_posts, currentUser: req.user})
        }
    })
});

// NEW - shows form to create new post 2
  
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("posts/new")
   });


//  CREATE ROUTE 3

router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form
    var title = req.body.title;
    var body = req.body.body;
    var author = req.body.author
    var image = req.body.image;
    var date = req.body.date;
    var postedBy = {
        id: req.user._id,
        username: req.user.username
    };
    var new_post = {title:title, body:body, author: author, image:image, date:date, postedBy:postedBy};
    // create new post and save in the DB 
    post.create(new_post, function(err, new_post){
        if(err){console.log(err)
        }else{
            res.redirect("/");
        }
    });
});


// SHOW ROUTE 4 -- shows more info about a new post

router.get("/:id", function(req, res){
    // FIND THE POST WITH PROVIDED ID
    post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){console.log(err);
        }else{
            // render show template with the specific book
            console.log(foundPost);
            res.render("posts/show", {found_post:foundPost})
        }
    })
})



  
// POST EDIT ROUTE 
// router.get("/:id/edit", middleware.checkPostOwnership, function(req, res){
//     post.findById(req.params.id, function(err, foundPost){
//       if(err){
//         res.redirect("back");
//       } else {
//         res.render("posts/edit", {found_post:foundPost})
  
//       };
//     })
//   });


//@desc Show edit page
//@route GET /stories/edit/:id
// router.get("/:id/edit", middleware.checkPostOwnership, async (req,res)=>{  
//     try{
//         const found_post = await post.findById(req.params.id)
//             res.render('posts/edit', { found_post })
//     }
//     catch(err){
//         console.error(err)
//         return res.redirect('/')
//     }
    
// })


  // EDIT BOOK ROUTE
  router.get("/:id/edit", middleware.checkPostOwnership, function(req, res){
    post.findById(req.params.id, function(err, found_post){
                 res.render("posts/edit", {found_post});
    });
    
  });
 



  //@desc  Update Post
//@route PUT /stories/:id
// router.put('/:id', middleware.checkPostOwnership, (req,res)=>{  
//     try{
//         let found_post = await post.findById(req.params.id).lean()
//             post.findByIdAndUpdate(req.params.id, req.body.found_post
//             )
//             console.log('update successful')
//             res.redirect('/posts/' + req.params.id )
//         // }
//     }
//     catch(err){
//         console.log(err)
//         return res.redirect('/')
//     }

// })

// POST UPDATE ROUTE
router.put("/:id/", middleware.checkPostOwnership, function(req, res){
    // find the actual post and update
    post.findByIdAndUpdate(req.params.id, req.body.found_post, function(err, updatedPost){
        if(err){
            console.log(err)
        } else {
            res.redirect('/posts/' + req.params.id)
        }
    } )
})



//   DELETE ROUTE
router.delete('/:id', middleware.checkPostOwnership, function(req, res){
    post.findByIdAndRemove(req.params.id, function(err, deletedPost){
        if(err){
            console.log(err)
        } else{
            res.redirect('/posts')
        }
    })
})



module.exports = router;