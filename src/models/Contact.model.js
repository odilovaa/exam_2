class Contact 
{
    constructor (id, name, phone_number, email, message, view)
    {
        this.id = id,
        this.name = name,
        this.phone_number = phone_number,
        this.email = email,
        this.message = message,
        this.view = false
    }
}

module.exports = Contact