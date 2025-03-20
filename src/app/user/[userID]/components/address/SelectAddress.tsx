"use client";
import { useAuth } from "@/app/AuthContext";
import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { useState } from "react";

export function SelectFormAddress() {
  const { dataUser, accessToken, setDataUser } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const handleDeleteAddress = async (idx: number) => {
    const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/patch/delete-address`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        idx: idx,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      setDataUser(data);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };
  return (
    <div>
      {dataUser?.data.info.address.map((value, idx) => {
        return (
          <div key={idx} className="relative">
            <p className="my-2 border py-2 px-2 rounded-sm">
              Địa chỉ {idx + 1}: {value.address} - {value.phone}
            </p>
            <Button
              className="absolute top-0 right-0 shadow-none bg-inherit hover:bg-inherit text-black/55"
              title="xóa địa chỉ"
              onClick={() => handleDeleteAddress(idx)}
            >
              x
            </Button>
          </div>
        );
      })}
      {showAlert && 
       <Alert className="absolute top-1/5 right-0 w-auto px-10 mr-1 bg-red-200/30 text-red-400/65 border-0">
       <Terminal />
       <AlertTitle>Xóa địa chỉ thành công!</AlertTitle>
       <AlertDescription></AlertDescription>
     </Alert>
      }
    </div>
  );
}
