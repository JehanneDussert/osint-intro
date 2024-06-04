import { EngineInfo, NetworkAppearances } from "../type";
import { CollapsibleTable } from "./CollapsibleTable";
import { Resume } from "./Resume";

type CardsProps = {
    currentPageItems: EngineInfo[];
    networkAppearances: NetworkAppearances[];
};

export const Cards = ({ currentPageItems, networkAppearances }: CardsProps) => {
    return <div className="flex flex-col">
        <Resume 
            currentPageItems={currentPageItems}
            networkAppearances={networkAppearances}
        /> 
        <CollapsibleTable
            currentPageItems={currentPageItems}
        />
    </div>
}