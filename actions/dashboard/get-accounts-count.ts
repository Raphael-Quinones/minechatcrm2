import { prismadb } from "@/lib/prisma";

export const getAccountsCount = async (userId: string) => {
  const data = await prismadb.crm_Accounts.count({
    where: {
      createdBy: userId,
    },
  });
  return data;
};
