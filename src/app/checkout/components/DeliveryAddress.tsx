"use client";
import { useAuth } from "@/app/AuthContext";
import { UserAddressProps } from "@/app/components/type/user.type";
import { NEXT_PUBLIC_LOCAL } from "@/app/helper/constant";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { AlertDialogAdd } from "./AlertDialogAdd";
import { FormUpdateAddress } from "@/app/user/[userID]/components/FormUpdateAddress";

export default function DeliveryAddress() {
  const { accessToken, dataUser } = useAuth();
  const [userAddress, setUserAddress] = useState<
    UserAddressProps | undefined
  >();
  useEffect(() => {
    const getAddress = async () => {
      if (accessToken) {
        const res = await fetch(`${NEXT_PUBLIC_LOCAL}/api/get/user-address`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await res.json();
        setUserAddress(data.data);
      }
    };
    getAddress();
  }, [accessToken, dataUser, setUserAddress]);

  return (
    <div className="bg-white rounded-xl p-6 w-full">
      <p className="flex items-center text-xl">
        <FaLocationDot className="mr-2" /> Địa chỉ nhận hàng
      </p>
      {userAddress?.list_address.length ? (
        userAddress?.list_address.map((value) => {
          if (!value.is_default) {
            return;
          }
          return (
            <div key={value._id} className="text-black mt-2 ml-2">
              <strong>
                {value.name} {value.phone}
              </strong>
              <span className="ml-4">{value.address}</span>{" "}
              <span className="text-xs border p-0.5 text-[var(--color-text-root)] ml-2">
                {value.is_default && "Mặc định"}
              </span>
              <AlertDialogAdd
                userAddress={userAddress}
                setUserAddress={setUserAddress}
              />
            </div>
          );
        })
      ) : (
        <div className="flex items-center mt-6">
            <p className="mr-6">Thêm địa chỉ mới: </p><FormUpdateAddress /> 
        </div>
      )}
    </div>
  );
}
