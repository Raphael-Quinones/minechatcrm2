import { Suspense } from "react";

import SuspenseLoading from "@/components/loadings/suspense";

import Container from "../../components/ui/Container";
import ContactsView from "../components/ContactsView";
import { getContacts } from "@/actions/crm/get-contacts";
import { getAllCrmData } from "@/actions/crm/get-crm-data";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


const AccountsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const userId = session?.user?.id;
  const crmData = await getAllCrmData();
  const contacts = await getContacts(userId);
  return (
    <Container
      title="Contacts"
      description={"Everything you need to know about your contacts"}
    >
      <Suspense fallback={<SuspenseLoading />}>
        <ContactsView crmData={crmData} data={contacts} />
      </Suspense>
    </Container>
  );
};

export default AccountsPage;
