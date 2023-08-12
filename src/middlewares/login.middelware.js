const Io = require("../utils/Io")
const Admins = new Io("./databases/admins.json")

const isAdmin = async (req, res, next) =>
{
    const { admin_name, admin_password } = req.body;

    const admins = await Admins.read()

    let findAdmin = admins.find((admin) => admin.admin_name == admin_name && admin.admin_password == admin_password);

    if(!findAdmin)
    {
        return res.status(201).json({message : "Invalid name or password!"})
    }

    next()
}

module.exports = {isAdmin}