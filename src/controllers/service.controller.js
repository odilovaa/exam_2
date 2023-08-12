const path = require("path");

const Io = require("../utils/Io")
const Services = new Io("./databases/services.json")

const Service = require("../models/Service.model")

const createService = async (req, res) =>
{
    try
    {
        const {title, description} = req.body;
        const photo = req.files?.photo;

        const services = await Services.read()

        let findService = services.find((service) => service.title === title);

        if(findService)
        {
            return res.status(400).json("Already exists");
        }

        const mimetype = path.extname(photo.name)
        const imageName = photo.md5 + "_" + mimetype;
        photo.mv(`${process.cwd()}/uploads_service/${imageName}`);

        const id = (services[services.length -1]?.id || 0) +1;

        const newService = new Service(id, title, description);

        const result = services.length ? [...services, newService] : [newService];

        await Services.write(result);

        res.status(201).json({message: "Service added!"});

    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
};


const getAllServices = async (req, res) =>
{
    try
    {
        const services = await Services.read()
        res.status(201).json(services)
    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
}; 

const getByIdService = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const services = await Services.read()

        let findService = services.find((service) => service.id == id);
        
        if(findService)
        {
            res.status(201).json(findService);
        }
        else
        {
            res.status(201).json({message : "There is no service with such ID!"});
        }
        

    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
};


const deleteByIdService = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const services = await Services.read()

        let findService = services.find((service) => service.id == id);

        if(!findService)
        {
            return res.status(201).json({message : "There is no service with such ID!"})
        }
        else
        {  
            findService = services.filter((service) => service.id != id)

            await Services.write(findService)
        }
        
        res.status(201).json({message : "Successfully deleted!"})
    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
};



module.exports = {createService, getAllServices, getByIdService, deleteByIdService}