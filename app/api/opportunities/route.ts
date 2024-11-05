import { prismadb } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET() {
  const headers = {
    'Cache-Control': 'no-store, must-revalidate',
    'Pragma': 'no-cache',
  }

  const data = await prismadb.crm_Opportunities.findMany({
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

  // Transform the data to handle all date fields
  const serializedData = data.map(opportunity => ({
    ...opportunity,
    createdAt: opportunity.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: opportunity.updatedAt?.toISOString() ?? new Date().toISOString(),
    close_date: opportunity.close_date?.toISOString() ?? null,
  }));

  return new Response(JSON.stringify(serializedData), {
    headers: headers
  });
} 