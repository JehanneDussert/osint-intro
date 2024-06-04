import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useFetch } from "../utils/hooks";
import { Cards } from "../components/Cards";
import { GET_GOOGLE_INFOS } from "../constants";
import { Searchbar } from "../components/Searchbar";
import { ParamsMenu } from "../components/ParamsMenu";
import { EngineInfo, NetworkAppearances } from "../type";

export const Home = () => {
    const   [query, setQuery] = useState<string>("");
    const   [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const   [currentPage, setCurrentPage] = useState<number>(0);
    const   itemsPerPage = 5;
    const   [socialNetworks, setSocialNetworks] = useState<string[]>([]);
    const   [docTypes, setDocTypes] = useState<string[]>([]);
    const   [engines, setEngines] = useState<string[]>(["Google"]);
    const   { data, error, loadingData, fetchData } = useFetch(GET_GOOGLE_INFOS);
	const   [engineInfos, setEngineInfos] = useState<EngineInfo[]>([]);
	const   [networkAppearances, setNetworkAppearances] = useState<NetworkAppearances[]>([]);
    
    const get_query_with_networks = () => {
        const newQuery = socialNetworks.reduce((accumulator, network, index) => {
            if (index === 0) 
                return `${accumulator}+site:${network}.com`;
            else
                return `${accumulator}+OR+site:${network}.com`;
            }, query);
        
        return newQuery;
    }

    const get_query_with_doctypes = (queryWithNetworks: string) => {
        const newQuery = docTypes.reduce((accumulator, doctype, index) => {
            if (index === 0) 
                return `${accumulator}+doctype:${doctype}`;
            else
                return `${accumulator}+OR+doctype:${doctype}`;
            }, queryWithNetworks);
        
        return newQuery;
    }

    useEffect(() => {
        if (isSubmitted) {

            if (query.length === 0) return ;
            
            const queryWithNetworks = get_query_with_networks();
            const queryWithDoctypes = get_query_with_doctypes(queryWithNetworks);

            fetchData(queryWithDoctypes);
            setIsSubmitted(false);
        }
    }, [isSubmitted, query, fetchData]);

    useEffect(() => {
        if (!data) return;
        setEngineInfos(data.EngineResults);
        setNetworkAppearances(data.NetworkAppearances);
    }, [data]);


    useEffect(() => {
        console.log('ici eng: ', engineInfos)
        console.log(currentPageItems)
    }, [engineInfos])

    useEffect(() => {
        console.log('ici net: ', networkAppearances)
        console.log(currentPageItems)
    }, [networkAppearances])

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    useEffect(() => {
        console.log('data: ', data)
    }, [data])

    if (loadingData) return <div className="flex justify-center items-center w-full">Chargement de la page...</div>;
    if (error) return <div>Erreur : {error.message}</div>;

    const offset = currentPage * itemsPerPage;
    const currentPageItems = engineInfos ? engineInfos.slice(offset, offset + itemsPerPage) : [];

    console.log('curr: ', currentPageItems)
    return (
        <div className="w-full flex items-center flex-col">
            <div className="w-11/12 mb-8">
                <Searchbar 
                    query={query}
                    setIsSubmitted={setIsSubmitted}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                />
                <ParamsMenu 
                    socialNetworks={socialNetworks}
                    setSocialNetworks={setSocialNetworks}
                    engines={engines}
                    setEngines={setEngines}
                    docTypes={docTypes}
                    setDocTypes={setDocTypes}
                />
                <Cards 
					currentPageItems={currentPageItems}
                    networkAppearances={networkAppearances}
				/>
                <ReactPaginate
                    previousLabel={"Précédent"}
                    nextLabel={"Suivant"}
                    breakLabel={"..."}
                    pageCount={engineInfos ? Math.ceil(engineInfos.length / itemsPerPage) : 0}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </div>
    );
};
