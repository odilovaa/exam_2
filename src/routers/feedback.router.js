const { Router } = require("express");
const { addBeedback, getAllFeedback, deleteByIdFeedback } = require("../controllers/feedback.controller")
const { isAdmin } = require("../middlewares/login.middelware")

const router = Router();

router.post("/add_feedback", addBeedback);
router.get("/get_all/feedbacks", getAllFeedback);
router.delete("/deleteFeedback/:id", isAdmin, deleteByIdFeedback)

module.exports = router