import NewsCard from '@/components/User/News/NewsCard'
import { baseUrl, getAllNews } from '@/utils/Endpoint'

// This can be an async function in the app directory
async function Page() {
    let newsData = []

    try {
        const res = await fetch(`${baseUrl}${getAllNews}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store' // Ensures the data is fetched on each request (similar to SSR behavior)
        })

        const data = await res.json()
        newsData = data?.news || []
    } catch (error) {
        console.error("Error fetching news:", error)
    }

    return (
        <div className='w-10/12 mx-auto mb-20'>
            <h1 data-aos='fade-up' data-aos-duration='700' className='text-title py-8 font-semibold'>
                News
            </h1>
            <div className='w-full flex flex-wrap gap-4 '>
                {newsData.length > 0 ? (
                    newsData.map((newsItem, i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-duration="700"
                            data-aos-delay={i * 100}
                        >
                            <NewsCard News={newsItem} />
                        </div>
                    ))
                ) : (
                    <p>No news available</p>
                )}
            </div>
        </div>
    )
}

export default Page
