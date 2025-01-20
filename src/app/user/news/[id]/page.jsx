'use client'
import React, { useEffect, useState } from 'react';
import cover from "@/../../public/Assets/user/news/cover.png";
import Image from 'next/image';
import { baseUrl, getAllNews } from '@/utils/Endpoint';

const NewsDetailed = ({ params }) => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = async (id) => {
        try {
            const res = await fetch(`${baseUrl}${getAllNews}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            setNews(data.news);
        } catch (err) {
            console.error("Failed to fetch news:", err);
            setError("Failed to load news.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params?.id) {
            fetchNews(params.id);
        }
    }, [params?.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(news)

    return (
        <div className="max-w-[1280px] mx-auto w-full p-3 flex flex-col items-center justify-center 
      my-5 mb-10 md:mb-20 gap-8">
            <h1 data-aos='fade-up' data-aos-duration='700' className=" text-[#101828] font-bold text-xl self-start ">{news?.title}</h1>

            <div className='w-full flex flex-col sm:flex-row gap-8'>
                {news?.thumbnail ? (
                    <img
                        src={`${baseUrl}${news?.thumbnail?.location}`}
                        alt="image"
                        className="w-full sm:w-1/2 h-[400px] object-cover rounded-lg"
                    />
                ) : (
                    <Image
                        data-aos='fade-up' data-aos-duration='700'
                        src={cover}
                        alt="image"
                        className="w-full sm:w-1/2 h-[400px] object-cover rounded-lg"
                    />
                )}

                <div className='w-full sm:w-1/2 flex flex-col gap-4 '>
                    <div
                        data-aos='fade-up' data-aos-duration='700'
                        dangerouslySetInnerHTML={{ __html: news?.description }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsDetailed;
