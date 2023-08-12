const path = require("path");

const Io = require("../utils/Io")
const Feedbacks = new Io("./databases/feedbacks.json")

const Feedback = require("../models/Feedback.model")

const addBeedback = async (req, res) =>
{
    try
    {
        const { first_name, last_name, profession, feedback } = req.body;
        const photo = req.files?.photo;

        const feedbacks = await Feedbacks.read()

        const mimetype = path.extname(photo.name)
        const imageName = photo.md5 + "_" + mimetype;
        photo.mv(`${process.cwd()}/uploads_feedback/${imageName}`);

        const id = (feedbacks[feedbacks.length -1]?.id || 0) +1;

        const newFeedback = new Feedback(id, first_name, last_name, profession, feedback );

        const result = feedbacks.length ? [...feedbacks, newFeedback] : [newFeedback];

        await Feedbacks.write(result);

        res.status(201).json({message: "Feedback added!"});

    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
}; 

const getAllFeedback = async (req, res) =>
{
    try
    {
        const feedbacks = await Feedbacks.read()
        res.status(201).json(feedbacks)
    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
};

const deleteByIdFeedback = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const feedbacks = await Feedbacks.read()

        let findFeedback = feedbacks.find((feedback) => feedback.id == id);

        if(!findFeedback)
        {
            return res.status(201).json({message : "There is no feedback with such ID!"})
        }
        else
        {  
            findFeedback = feedbacks.filter((feedback) => feedback.id != id)

            await Feedbacks.write(findFeedback)
        }
        
        res.status(201).json({message : "Successfully deleted!"})
    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
};


module.exports = {addBeedback, getAllFeedback, deleteByIdFeedback}