import { Suspense } from "react";

import SuspenseLoading from "@/components/loadings/suspense";

import Container from "../../components/ui/Container";
import LeadsView from "../components/LeadsView";

import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { getLeads } from "@/actions/crm/get-leads";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


const LeadsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const userId = session?.user?.id;
  const crmData = await getAllCrmData();
  const leads = await getLeads(userId)
  return (
      <Suspense fallback={<SuspenseLoading />}>
        <LeadsView crmData={crmData} initialData={leads}/>
      </Suspense>
  );
};

export default LeadsPage;
