const { Router } = require("express")
const { createService, getAllServices, getByIdService, deleteByIdService } = require("../controllers/service.controller")
const { isAdmin } = require("../middlewares/login.middelware")

const router = Router();

router.post("/add_service", isAdmin, createService);
router.get("/get_all/services", getAllServices);
router.get("/getService/:id", getByIdService);
router.delete("/deleteService/:id", isAdmin, deleteByIdService);

module.exports = router;


