import { prismadb } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prismadb.crm_Leads.findMany({
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

  // Transform the data to handle dates
  const serializedData = data.map(lead => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  }));

  return NextResponse.json(serializedData);
} 