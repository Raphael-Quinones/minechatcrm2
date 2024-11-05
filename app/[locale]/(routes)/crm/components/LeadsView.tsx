"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RightViewModal from "@/components/modals/right-view-modal";

import { columns } from "../leads/table-components/columns";
import { NewLeadForm } from "../leads/components/NewLeadForm";
import { LeadDataTable } from "../leads/table-components/data-table";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  
  // Transform dates back to Date objects
  return data.map((lead: any) => ({
    ...lead,
    createdAt: new Date(lead.createdAt),
    updatedAt: new Date(lead.updatedAt),
  }));
};

const LeadsView = ({ initialData, crmData }: any) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // SWR hook for real-time updates
  const { data = initialData } = useSWR('/api/leads', fetcher, {
    refreshInterval: 5000, // Refresh every 5 seconds
    fallbackData: initialData,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const { users, accounts } = crmData;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div>
            <CardTitle
              onClick={() => router.push("/crm/leads")}
              className="cursor-pointer"
            >
              Leads
            </CardTitle>
            <CardDescription></CardDescription>
          </div>
          <div className="flex space-x-2">
            <RightViewModal label={"+"} title="Create new lead" description="">
              <NewLeadForm users={users} accounts={accounts} />
            </RightViewModal>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          "No assigned leads found"
        ) : (
          <LeadDataTable data={data} columns={columns} />
        )}
      </CardContent>
    </Card>
  );
};

export default LeadsView;
