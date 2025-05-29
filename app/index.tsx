
import AdminTabs from "@/app/src/navigation/AdminTabs";
import CorretorTabs from "@/app/src/navigation/CorretorTabs";
import { UserContext } from "./src/context/UserContext";
import { useContext } from "react";

export default function Index() {

  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {user === 'admin' && <AdminTabs/>}
      {user === 'corretor' && <CorretorTabs/>}
    </>
  );
}
