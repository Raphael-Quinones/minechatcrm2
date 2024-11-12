import { prismadb } from "@/lib/prisma";

export const getContractsCount = async (userId: string) => {
  const data = await prismadb.crm_Contracts.count({
    where: {
      createdBy: userId,
    },
  });
  return data;
};
