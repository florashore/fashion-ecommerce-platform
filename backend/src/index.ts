import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';

import { PrismaClient } from '@prisma/client'

// **** Run **** //



const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here

  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice3@prisma.io',
  //     posts: {
  //       create: { title: 'Hello World' },
  //     },
  //     profile: {
  //       create: { bio: 'I like turtles' },
  //     },
  //   },
  // })

  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },})

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true, 
      profile: true
    }
  })
  // console.log(allUsers, { depth: null})
  console.log(post)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
