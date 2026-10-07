import "dotenv/config"


if (!process.env.PORT) {
    throw new Error("PORT is not provided in the Enviornment Variables")
}
if (!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL is not provided in the Enviornment Variables")
}

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not provided in the Enviornment Variables")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not provided in the Enviornment Variables")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not provided in the Enviornment Variables")
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not provided in the Enviornment Variables")
}

if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error("GOOGLE_REFRESH_TOKEN is not provided in the Environment Variables")
}

if (!process.env.GOOGLE_USER) {
    throw new Error("GOOGLE_USER is not provided in the Environment Variables")
}


const config = {
    PORT: process.env.PORT,
    CLIENT_URL:process.env.CLIENT_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER
}

export default config;