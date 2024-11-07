import { Suspense } from "react";

import SuspenseLoading from "@/components/loadings/suspense";

import Container from "../../components/ui/Container";
import LeadsView from "../components/LeadsView";

import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { getLeads } from "@/actions/crm/get-leads";

const LeadsPage = async () => {
  const crmData = await getAllCrmData();
  const leads = await getLeads();

  return (
      <Suspense fallback={<SuspenseLoading />}>
        <LeadsView initialData={leads} crmData={crmData} />
      </Suspense>
  );
};

export default LeadsPage;
