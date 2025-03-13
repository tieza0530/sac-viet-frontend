import Image from "next/image"
import ImageRegister from '../../../public/imageLogin.jpg'
export const ImageLR = () => {
    return(
        <div>
            <Image src={ImageRegister} alt="img-login-register" className="w-full h-auto object-cover" priority  />
        </div>
    )
}