import { prismadb } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "bson";

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return new Response('Unauthorized', { status: 401 });
  }

  const user = await prismadb.users.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true
    }
  });

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  const headers = {
    'Cache-Control': 'no-store, must-revalidate',
    'Pragma': 'no-cache',
  }

  const userObjectId = typeof user.id === 'string' ? new ObjectId(user.id) : user.id;
  const userIdString = userObjectId.toString();
  const data = await prismadb.crm_Leads.findMany({
    where: {
      createdBy: userIdString
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

  const serializedData = data.map(lead => ({
    ...lead,
    createdAt: lead.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: lead.updatedAt?.toISOString() ?? new Date().toISOString(),
  }));

  return new Response(JSON.stringify(serializedData), {
    headers: headers
  });
} 