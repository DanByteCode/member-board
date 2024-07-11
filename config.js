import dotenv from 'dotenv'
dotenv.config()

export const config = {
  PORT: process.env.PORT || '3000',
  MDB: process.env.MDB,
  SECRET: process.env.SECRET,
  SALT_ROUNDS: Number.parseInt(process.env.SALT_ROUNDS),
  CODE_MEMBER: process.env.CODE_MEMBER,
  CODE_ADMIN: process.env.CODE_ADMIN
}
