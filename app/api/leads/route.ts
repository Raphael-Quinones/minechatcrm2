import { prismadb } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
  const headers = {
    'Cache-Control': 'no-store, must-revalidate',
    'Pragma': 'no-cache',
  }

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
    createdAt: lead.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: lead.updatedAt?.toISOString() ?? new Date().toISOString(),
  }));

  return new Response(JSON.stringify(serializedData), {
    headers: headers
  });
} 