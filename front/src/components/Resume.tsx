import { useEffect } from "react";
import { EngineInfo, Network, NetworkAppearances } from "../type";
import { Gauge, PieChart } from "@mui/x-charts";

type CardsProps = {
    currentPageItems: EngineInfo[];
    networkAppearances: NetworkAppearances[];
};

export const Resume = ({ currentPageItems, networkAppearances }: CardsProps) => {
    const networkData: Network[] = networkAppearances.map((network, index) => ({
        id: index,
        value: network.appearances,
        label: network.type
    }));

    useEffect(() => {
        console.log('current is: ', currentPageItems)
    }, [])

    return <div className="flex flex-row py-6 my-6 border">
        <div className="flex justify-center flex-col items-center w-8/12">
            <h1 className="pb-4 pr-32">Présence sur les réseaux sociaux</h1>
            <div className="pr-32">
            <PieChart
                series={[{ data: networkData },]}
                width={1200}
                height={200}
            /></div>
        </div>
        <div className="flex justify-center flex-col items-center">
            <h1 className="pb-4">Sentiment général</h1>
            <Gauge color="green" width={500} height={200} value={currentPageItems[0] ? currentPageItems[0].average_sentiment * 100 : 0} />
        </div>
    </div>
}