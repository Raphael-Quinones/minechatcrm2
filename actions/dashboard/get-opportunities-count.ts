import { prismadb } from "@/lib/prisma";

export const getOpportunitiesCount = async (userId: string) => {
  const data = await prismadb.crm_Opportunities.count({
    where: {
      createdBy: userId,
    },
  });
  return data;
};
