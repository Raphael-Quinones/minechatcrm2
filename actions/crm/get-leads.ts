import { prismadb } from "@/lib/prisma";

export const getLeads = async (userSessionId: string) => {
  const data = await prismadb.crm_Leads.findMany({
    where: {
      createdBy: userSessionId,
    },
    include: {
      assigned_to_user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
