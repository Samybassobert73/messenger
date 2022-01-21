const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  // console.log(req.body);
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  // console.log(req.body);
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      // console.log(user);
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
});

//get a user
router.get("/", async (req, res) => {

  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ?  await User.findById(userId) : await User.findOne({ username: username });
    // console.log(user._doc);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  }
   catch (err) {
    res.status(500).json(err);
  }
});




//get all user
router.get("/all", async (req, res) => {
try{
  const users = await User.find();
  res.status(200).json(users)
}catch(err) {
  console.log(err);
      res.status(400).json(err)
    }

});

//get certains username
router.post("/users", async (req, res) => {
  const alluse = [...req.body]
  // console.log("back",alluse);
  try{
    const users = await User.find({
'_id':{ $in : alluse}
    });
    res.status(200).json(users)
    // console.log(users);
  }catch(err) {
    console.log(err);
        res.status(400).json(err)
      }
  
  });
  



module.exports = router;