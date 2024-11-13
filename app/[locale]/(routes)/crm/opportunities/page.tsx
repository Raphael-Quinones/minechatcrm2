import { Suspense } from "react";

import SuspenseLoading from "@/components/loadings/suspense";

import Container from "../../components/ui/Container";
import OpportunitiesView from "../components/OpportunitiesView";
import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { getOpportunitiesFull } from "@/actions/crm/get-opportunities-with-includes";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const AccountsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const userId = session?.user?.id;
  const crmData = await getAllCrmData();
  const opportunities = await getOpportunitiesFull(userId);

  return (
      <Suspense fallback={<SuspenseLoading />}>
        <OpportunitiesView crmData={crmData} initialData={opportunities} />
      </Suspense>
  );
};

export default AccountsPage;
