
import AdminTabs from "@/src/navigation/AdminTabs";
import CorretorTabs from "@/src/navigation/CorretorTabs";
import { useState } from "react";


export default function Index() {
  const [user, setUser] = useState('corretor')


  return (
    <>
      {user === 'admin' && <AdminTabs/>}
      {user === 'corretor' && <CorretorTabs/>}
    </>
  );
}
