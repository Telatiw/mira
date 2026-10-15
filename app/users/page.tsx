import React from 'react'
import { prisma } from '@/Lib/prisma'
const page = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullname: true,
      username: true,
      createdAt: true,
    },
  });
  return (
    <div>
      <h2>لیست کاربران</h2>
      <ul>
      {users.map(user => (
        <li key={user.id}>{user.fullname}</li>
      ))}
      </ul>
    </div>
  )
}

export default page
