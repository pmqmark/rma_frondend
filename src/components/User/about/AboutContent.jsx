import { about_us } from "@/data/about_us.js"
import MemberCard from "./MemberCard";

function AboutContent({ currentIndex, setCurrentIndex }) {
    return (
        <div className="w-full flex max-lg:flex-col  mt-10">
            <div data-aos='fade-up' data-aos-duration='700' className="w-4/12 max-sm:w-10/12 max-lg:w-full max-md:mx-auto">
                {
                    about_us.map((item, index) => (
                        <div key={index} className={`cursor-pointer ${currentIndex === index ? 'text-primaryColor font-semibold' : 'text-gray-900 font-medium'} mb-2 `} onClick={() => setCurrentIndex(index)}>
                            {item.title}
                        </div>
                    ))
                }
            </div>
            <div data-aos='fade-up' data-aos-duration='700' className="w-8/12 max-sm:w-10/12 max-lg:w-full max-md:mx-auto max-lg:mt-10">
                {
                    about_us[currentIndex].content.map((item, index) => {
                        if (Array.isArray(item)) {
                            return (
                                <ul key={index} className="list-disc ml-4">
                                    {item.map((subItem, subIndex) => (
                                        <li key={subIndex}>{subItem}</li>
                                    ))}
                                </ul>
                            );
                        }
                        if (typeof item === 'object') {
                            return (
                                <div key={index} className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 gap-x-4 gap-y-5">
                                    {item.members.map((member, subIndex) => (
                                        <MemberCard key={subIndex} {...member} />
                                    ))}
                                </div>
                            );
                        }
                        return <div key={index}> {index !== 0 ? <><br /></> : null}{item}</div>;
                    })
                }
            </div>
        </div>
    )
}

export default AboutContent
