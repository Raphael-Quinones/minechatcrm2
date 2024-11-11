"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { columns } from "../opportunities/table-components/columns";
import { NewOpportunityForm } from "../opportunities/components/NewOpportunityForm";
import { OpportunitiesDataTable } from "../opportunities/table-components/data-table";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const OpportunitiesView = ({
  crmData,
  accountId,
}: {
  crmData: any;
  accountId?: string;
}) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { data } = useSWR('/api/opportunities', fetcher, {
    refreshInterval: 5000,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const { users, accounts, contacts, saleTypes, saleStages, campaigns } =
    crmData;

  const handleMineOpportunities = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_FACEBOOK_API_URL || 'http://3.25.53.53:8000';
      
      const response = await fetch(`${apiUrl}/analyze-facebook-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          page_id: "116011844875573",
          access_token: "EAAESTTZCVScsBO8xJVQfZA9sOOZB7ZCR4dW3ljKPyUs5uZBMMHi2i64ljmrQdBToZClKr7PPsu3RSmTSRmIMveUT7snIAYXoMQRbZChJdoxaeuGkQHgdnMYOiq1upgWw4IGFoZBDwnYHZCTqUm3qWXyWICADGZAAuAKEQft9SKCq7MCenDZBdOLZCsMp3q8ugfDrboCh9wowHE6ffZB3gLZAfu",
          excluded_name: "Condo Living by Justine Guerrero",
          user_email: "wapquinones28@gmail.com"
        })
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to mine leads: ${errorData}`);
      }
      
      const data = await response.json();
      console.log('Leads mining initiated successfully:', data);
    } catch (error) {
      console.error('Error mining leads:', error);
    }
  };

  //console.log(accountId, "accountId");
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between">
          <div>
            <CardTitle
              onClick={() => router.push("/crm/opportunities")}
              className="cursor-pointer"
            >
              Opportunities
            </CardTitle>
            <CardDescription></CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="my-2 cursor-pointer"
              onClick={handleMineOpportunities}
            >
              Mine Opportunities
            </Button>
            <Sheet open={open} onOpenChange={() => setOpen(false)}>
              <Button
                className="my-2 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                +
              </Button>
              <SheetContent className="min-w-[1000px] space-y-2">
                <SheetHeader>
                  <SheetTitle>Create new opportunity form</SheetTitle>
                </SheetHeader>
                <div className="h-full overflow-y-auto">
                  <NewOpportunityForm
                    users={users}
                    accounts={accounts}
                    contacts={contacts}
                    salesType={saleTypes}
                    saleStages={saleStages}
                    campaigns={campaigns}
                    accountId={accountId}
                    onDialogClose={() => setDialogOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        {!data || data.length === 0 ? (
          "No assigned opportunities found"
        ) : (
          <OpportunitiesDataTable data={data} columns={columns} />
        )}
      </CardContent>
    </Card>
  );
};

export default OpportunitiesView;
