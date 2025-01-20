import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import cover from "../../../../public/Assets/user/news/cover.png"
import Image from "next/image";
import { baseUrl } from "@/utils/Endpoint";

function NewsCard({ News }) {
    console.log(News)
    return (
        <div className="w-full sm:max-w-sm rounded overflow-hidden relative">
            {
                News?.thumbnail?.location
                    ?
                    <Link href={`/user/news/${News._id}`}>
                        <img
                            className="w-full rounded-lg aspect-[4/3] object-cover"
                            src={`${baseUrl}${News?.thumbnail?.location}`}
                            alt="Spices"
                        />
                    </Link>
                    :
                    <Image
                        className="w-full rounded-lg aspect-[4/3]"
                        src={cover}
                        alt="Spices"
                    />

            }
            <div className="pt-2 relative">
                <p className="mb-2 line-clamp-2 overflow-hidden">{News.title}</p>
                <Link
                    href={`/user/news/${News._id}`}
                    className="absolute bottom-0 right-0 text-primaryColor font-medium bg-white px-2 underline"
                >
                    Read more
                </Link>
            </div>
            <Link href={`/user/news/${News._id}`}>
                <MdArrowOutward
                    className="absolute top-3 right-3 text-white"
                    size={22}
                />
            </Link>
        </div>
    )
}

export default NewsCard
