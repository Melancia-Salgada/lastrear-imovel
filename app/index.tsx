
import AdminTabs from "@/src/navigation/AdminTabs";
import CorretorTabs from "@/src/navigation/CorretorTabs";
import { useContext } from "react";
import { UserContext } from "@/src/context/UserContext";

export default function Index() {
  const { user, setUser } = useContext(UserContext);


  return (
    <>
      {user === 'admin' && <AdminTabs/>}
      {user === 'corretor' && <CorretorTabs/>}
    </>
  );
}
