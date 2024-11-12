import { prismadb } from "@/lib/prisma";

export const getLeadsCount = async (userId: string) => {
  const data = await prismadb.crm_Leads.count({
    where: {
      createdBy: userId,
    },
  });  return data;
};
