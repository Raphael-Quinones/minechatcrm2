"use server";

import { prismadb } from "@/lib/prisma";

export const getOpportunitiesFull = async (userSessionId: string) => {
  const data = await prismadb.crm_Opportunities.findMany({
    where: {
      createdBy: userSessionId,
    },
    include: {
      assigned_account: {
        select: {
          name: true,
        },
      },
      assigned_sales_stage: {
        select: {
          name: true,
        },
      },
      assigned_to_user: {
        select: {
          name: true,
        },
      },
      assigned_type: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      created_on: "desc",
    },
  });

  return data;
};
