import image1 from "@/../public/Assets/user/membership/membership_img_1.webp";
import image2 from "@/../public/Assets/user/membership/membership_img_2.webp";
import image3 from "@/../public/Assets/user/membership/membership_img_3.webp";
import image4 from "@/../public/Assets/user/membership/membership_img_4.webp";
import MemberRegisterProcess from "@/components/User/membership/MemberRegisterProcess";
import MembershipForm from "@/components/User/membership/MembershipFrom";
import Image from "next/image";
const images = [image1, image2, image4, image3];
function Page() {
  return (
    <div className="md:w-10/12 mx-auto p-3  mb-10 md:mb-20">
      <h1 data-aos='fade-up' data-aos-duration='700' className="text-[#101828] font-bold text-2xl self-start my-5">
        The Member Registration Process:
      </h1>
      <div className="flex flex-col md:flex-row h-fit my-10 gap-3">
        <div className="w-full">
          <MemberRegisterProcess />
        </div>
        <div className="w-full">
          <MembershipForm />
        </div>
      </div>
    </div>
  );
}

export default Page;
