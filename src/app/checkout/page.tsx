import DeliveryAddress from "./components/DeliveryAddress";
import  ProductChoisePay  from "./components/ProductChoisePay";

export default function Checkout () {
    return (
        <div className="mx-28 max-2xl:mx-24 max-xl:mx-20 max-lg:mx-10 w-full mt-10">
            <DeliveryAddress />
            <ProductChoisePay />
        </div>
    )
}