const Io = require("../utils/Io")
const Contacts = new Io("./databases/contacts.json")

const Contact = require("../models/Contact.model")

const addContact = async (req, res) =>
{
    try
    {
        const {name, phone_number, email, message} = req.body;

        const contacts = await Contacts.read()

        let findContact = contacts.find((contact) => contact.phone_number === phone_number);

        if(findContact)
        {
            return res.status(400).json("Already exists");
        }

        const id = (contacts[contacts.length -1]?.id || 0) +1;

        const newContact = new Contact(id, name, phone_number, email, message);

        const result = contacts.length ? [...contacts, newContact] : [newContact];

        await Contacts.write(result);

        res.status(201).json({message: "Contact added!"});

    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
};

const getByIdContact = async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const contacts = await Contacts.read()

        let findContact = contacts.find((contact) => contact.id == id);
        
        if(findContact)
        {
            findContact.view = true
            const result = [...contacts];
            
            await Contacts.write(result);

            res.status(201).json(findContact);
        }
        else
        {
            res.status(201).json({message : "There is no Contact with such ID!"});
        }
    }
    catch(error)
    {
        res.status(500).json({message : "INTERNAL SERVER ERROR"});
    }
};

module.exports = { addContact, getByIdContact}