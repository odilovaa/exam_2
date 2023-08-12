require("dotenv/config")

const { env } = process

const config = 
{
    port : env.PORT || 3000,
}

module.exports = config