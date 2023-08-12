const { Router } = require("express")
const { addContact, getByIdContact } = require("../controllers/contact.controller");
const { isAdmin } = require("../middlewares/login.middelware")

const router = Router()

router.post("/add_contact", addContact);
router.get("/getContact/:id", isAdmin, getByIdContact);

module.exports = router;