import { prisma } from "@/Lib/prisma";

const page = async function Dashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = Number(id)

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullname: true,
    },
  });
  return <h1>داشبورد کاربر {user?.fullname}</h1>;
}

export default page
