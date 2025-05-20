import DeliveryAddress from "./components/DeliveryAddress";
import  ProductChoisePay  from "./components/ProductChoisePay";

export default function Checkout () {
    return (
        <div className="lg:mx-24 xl:mx-48 2xl:mx-80 w-full mt-10">
            <DeliveryAddress />
            <ProductChoisePay />
        </div>
    )
}