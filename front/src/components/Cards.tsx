import { EngineInfo } from "../type";
import CollapsibleTable from "./CollapsibleTable";
import { Resume } from "./Resume";

type CardsProps = {
    currentPageItems: EngineInfo[];
};

export const Cards = ({ currentPageItems }: CardsProps) => {
    return <div className="flex flex-col">
        { currentPageItems.length !== 1 && <div>
                <Resume currentPageItems={currentPageItems} /> 
                <CollapsibleTable />
            </div>
        }
    </div>
}