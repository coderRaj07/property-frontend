import ClientProvider from "../ClientProvider";
import PropertiesSearchPage from "./PropertiesSearchPage";

export default function Page() {
  return (
    <ClientProvider>
      <PropertiesSearchPage />
    </ClientProvider>
  );
}
