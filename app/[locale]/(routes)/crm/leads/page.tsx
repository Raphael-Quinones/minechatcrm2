import { Suspense } from "react";

import SuspenseLoading from "@/components/loadings/suspense";

import Container from "../../components/ui/Container";
import LeadsView from "../components/LeadsView";

import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { getLeads } from "@/actions/crm/get-leads";

const LeadsPage = async () => {
  const crmData = await getAllCrmData();

  return (
      <Suspense fallback={<SuspenseLoading />}>
        <LeadsView crmData={crmData} />
      </Suspense>
  );
};

export default LeadsPage;
