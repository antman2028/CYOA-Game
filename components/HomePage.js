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
                <h1 className="home-title font-bold">Choose your own story game powered by OpenAIs GPT 3.5 model</h1>
                <p>The stories are endless here.</p>
                <button className="home-button">
                    Start
                </button>
            </div>
        </div>

    )
}
