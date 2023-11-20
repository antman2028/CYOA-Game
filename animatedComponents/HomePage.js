import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
    () => import('@/components/SelectScreen'),
    {ssr: false}
)


export default function HomePage() {

    return (
        <div>
            <DynamicComponentWithNoSSR/>
            <div className="hidden">
                <h1 className="home-title font-bold">Choose your story</h1>

                <button className="home-button">
                    Start
                </button>
            </div>
        </div>

    )
}
