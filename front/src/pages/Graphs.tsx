import { useEffect, useState } from "react";
import { useFetch } from "../utils/hooks";
import { GET_GOOGLE_INFOS } from "../constants";
import { Searchbar } from "../components/Searchbar";
import { EngineInfo, Network } from "../type";
import { PieChart } from "@mui/x-charts";

export const Graphs = () => {
    const [query, setQuery] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

	const data: Network[] = [
        { id: 0, value: 18, label: "LinkedIn" },
        { id: 1, value: 2, label: "Facebook" },
        { id: 2, value: 39, label: "X" },
        { id: 3, value: 14, label: "Instagram" },
        { id: 4, value: 10, label: "Autre" },
    ]

    // search keywords?
    // put social networks from emails

    return (
        <div className="w-full flex items-center flex-col h-full">
            <div className="w-11/12 mb-8 h-full">
                <Searchbar 
                    query={query}
                    setIsSubmitted={setIsSubmitted}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                />
                <div className="flex items-center justify-center h-full">
                    <PieChart
                        series={[
                            { data: data },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
            </div>
        </div>
    );
};
