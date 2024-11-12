import { prismadb } from "@/lib/prisma";

export const getContactCount = async (userId: string) => {
  const data = await prismadb.crm_Contacts.count({
    where: {
      createdBy: userId,
    },
  });  return data;
};
