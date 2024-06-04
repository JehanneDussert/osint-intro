import React, { Dispatch } from "react";

interface SearchbarProps {
    query: string;
    setIsSubmitted: Dispatch<React.SetStateAction<boolean>>;
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Searchbar: React.FC<SearchbarProps> = ({ query, setIsSubmitted, handleChange }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <form className="flex items-end justify-end py-4" onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Rechercher</label>
            <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-l-lg"
                placeholder="Rechercher une personne"
                required
                value={query}
                onChange={handleChange}
            />
            <button 
                type="submit"
                className="flex items-center justify-center w-1/12 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-r-lg"
            >
                🔎
            </button>
        </form>
    );
};
