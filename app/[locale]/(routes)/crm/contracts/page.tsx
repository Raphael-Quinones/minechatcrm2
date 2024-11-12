import React, { Suspense } from "react";
import Container from "../../components/ui/Container";
import SuspenseLoading from "@/components/loadings/suspense";
import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { getContractsWithIncludes } from "@/actions/crm/get-contracts";
import ContractsView from "../components/ContractsView";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


const ContractsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const userId = session?.user?.id;

  const crmData = await getAllCrmData();
  const contracts = await getContractsWithIncludes(userId);
  return (
    <Container
      title="Contracts"
      description={"Everything you need to know about your contracts"}
    >
      <Suspense fallback={<SuspenseLoading />}>
        <ContractsView crmData={crmData} data={contracts} />
      </Suspense>
    </Container>
  );
};

export default ContractsPage;
