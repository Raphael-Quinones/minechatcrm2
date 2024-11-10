import { prismadb } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "bson";

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log('Session:', session?.user);
  
  if (!session?.user?.email) {
    console.log('No session or email found');
    return new Response('Unauthorized', { status: 401 });
  }

  console.log('Looking for user with email:', session.user.email);
  // First, find the user's ObjectId from their email
  const user = await prismadb.users.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true
    }
  });
  console.log('Found user:', user);

  if (!user) {
    console.log('No user found in database');
    return new Response('User not found', { status: 404 });
  }

  const headers = {
    'Cache-Control': 'no-store, must-revalidate',
    'Pragma': 'no-cache',
  }

  // Convert the user.id to ObjectId if it's a string
  const userObjectId = typeof user.id === 'string' ? new ObjectId(user.id) : user.id;
  console.log('Searching for opportunities with createdBy:', userObjectId);
  // Convert the ObjectId to string for Prisma
  const userIdString = userObjectId.toString();
  const data = await prismadb.crm_Opportunities.findMany({
    where: {
      createdBy: userIdString
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
  console.log('Found opportunities count:', data.length);
  console.log('First opportunity:', data[0]);

  // Transform the data to handle dates
  const serializedData = data.map(opportunity => ({
    ...opportunity,
    createdAt: opportunity.createdAt?.toISOString() ?? new Date().toISOString(),
    updatedAt: opportunity.updatedAt?.toISOString() ?? new Date().toISOString(),
  }));

  return new Response(JSON.stringify(serializedData), {
    headers: headers
  });
} 