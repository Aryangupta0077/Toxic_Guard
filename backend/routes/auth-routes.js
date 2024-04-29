const router = require("express").Router();
const passport = require("passport");


router.get("/logout",(req,res)=>{
  req.logOut();
  res.send({stat:true,user:req.user})
})
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email",'https://www.googleapis.com/auth/youtube.readonly','https://www.googleapis.com/auth/youtube.force-ssl'],
  })
);
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("http://localhost:3000/posts")
});

module.exports = router;
