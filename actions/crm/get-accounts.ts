import { prismadb } from "@/lib/prisma";

export const getAccounts = async (userSessionId: string) => {
  const data = await prismadb.crm_Accounts.findMany({
    where: {
      createdBy: userSessionId,
    },
    include: {
      assigned_to_user: {
        select: {
          name: true,
        },
      },
      contacts: {
        select: {
          first_name: true,
          last_name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
