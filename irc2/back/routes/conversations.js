const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv
router.post("/", async (req, res) => {
  
const members = [req.body.sender, ...req.body.receivers]
  
  const newConversation = new Conversation({
    members
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  
  try {
    const conversation = await Conversation.find({
      members : {$in : req.params.userId} 
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:convId", async function(req, res) {
  try{
    await Conversation.findByIdAndDelete(req.params.convId);
      res.status(200).json("conversations has been deleted");
  }catch (err) {
    res.status(500).json(err);
  }
})

router.get("/conv/:convId", async (req, res) => {
  const convId = req.params.convId;
 
  try {
    const conversation = await Conversation.findById(convId);
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/name/:id", async (req, res) => {
  console.log("conv",req.body);
try {
  const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  
  res.status(200).json(conversation.name);
  console.log("conv",conversation);
} catch (err) {
  return res.status(500).json(err);
}
});
module.exports = router;