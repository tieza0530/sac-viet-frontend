"use client"
import { useEffect, useState } from "react";
import { FormCapital } from "./address/FormCapital";
import { FormDistrict } from "./address/FormDistrict";
import { FormCommune } from "./address/FormCommune";
import { InputFormDetail } from "./address/FormDetail";
import { SelectFormAddress } from "./address/SelectAddress";

export function FormUpdateAddress() {
  const [valueCapital , setValueCapital] = useState('')
  const [ checkCapital, setCheckCapital] = useState(false)
  const [valueDistrict , setValueDistrict] = useState('')
  const [ checkDistrict, setCheckDistrict] = useState(false)
  const [valueCommune , setValueCommune] = useState('')

  useEffect(() => {
    if(valueCapital !== ''){
        setCheckCapital(true)
    }
    if(valueDistrict !== '' && valueCapital !== ''){
        setCheckDistrict(true)
    }
  }, [valueCapital, valueDistrict])
  
  return (
    <div >
        <p className="text-2xl mb-4 font-medium">Danh sách địa chỉ <span className="text-xs">- Tối đa 3 địa chỉ</span></p>
        <div className="h-32 mb-4">
        <SelectFormAddress />
        </div>
        <p className="text-2xl mb-10 font-medium">Cập nhật địa chỉ nhận hàng</p>
        <div className="w-full flex">
        <FormCapital setValueCapital={setValueCapital}/>
        <FormDistrict setValueDistrict={setValueDistrict} valueCapital={valueCapital} checkCapital={checkCapital}/>
        <FormCommune checkDistrict={checkDistrict} setValueCommnune={setValueCommune} valueDistrict={valueDistrict}/>
        </div>
        <InputFormDetail valueCommune={valueCommune} />
    </div>
  );
}
