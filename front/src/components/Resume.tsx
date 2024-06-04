import { useEffect } from "react";
import { EngineInfo, Network } from "../type";
import { Gauge, PieChart } from "@mui/x-charts";

type CardsProps = {
    currentPageItems: EngineInfo[];
};

// compter le nb d'apparition par type de site
// calcul sentiment général

export const Resume = ({ currentPageItems }: CardsProps) => {
    const networkData: Network[] = [
        { id: 0, value: 18, label: "LinkedIn" },
        { id: 1, value: 2, label: "Facebook" },
        { id: 2, value: 39, label: "X" },
        { id: 3, value: 14, label: "Instagram" },
        { id: 4, value: 10, label: "Autre" },
    ]

    useEffect(() => {
        console.log('current is: ', currentPageItems)
    }, [])

    return <div className="flex flex-row py-6 my-6 border">
        <div className="flex w-1/2 justify-center flex-col items-center">
            <h1 className="pb-4">Présence sur les réseaux sociaux</h1>
            <PieChart
                series={[{ data: networkData },]}
                width={400}
                height={200}
            />
        </div>
        <div className="w-1/2 flex justify-center flex-col items-center">
            <h1 className="pb-4">Sentiment général</h1>
            <Gauge color="green" width={400} height={200} value={currentPageItems[0] ? currentPageItems[0].average_sentiment : 0} />
        </div>
    </div>
}