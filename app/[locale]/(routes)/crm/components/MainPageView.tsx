import React from "react";

import { getAccounts } from "@/actions/crm/get-accounts";
import { getContacts } from "@/actions/crm/get-contacts";
import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { getLeads } from "@/actions/crm/get-leads";
import { getContractsWithIncludes } from "@/actions/crm/get-contracts";
import { getOpportunitiesFull } from "@/actions/crm/get-opportunities-with-includes";

import AccountsView from "./AccountsView";
import ContactsView from "./ContactsView";
import OpportunitiesView from "./OpportunitiesView";
import LeadsView from "./LeadsView";
import ContractsView from "./ContractsView";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const MainPageView = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const userId = session?.user?.id;
  const crmData = await getAllCrmData();
  const accounts = await getAccounts(userId);
  const contacts = await getContacts(userId);
  const leads = await getLeads(userId);
  const contracts = await getContractsWithIncludes(userId);
  const opportunities = await getOpportunitiesFull(userId);
  return (
    <>
      <AccountsView crmData={crmData} data={accounts} />
      <OpportunitiesView crmData={crmData} initialData={opportunities} />
      <ContactsView crmData={crmData} data={contacts} />
      <LeadsView crmData={crmData} data={leads} />
      <ContractsView crmData={crmData} data={contracts} />
    </>
  );
};

export default MainPageView;
