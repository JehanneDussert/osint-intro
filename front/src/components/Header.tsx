import { useNavigate } from "react-router-dom";

export const Header = () => {
	const	navigate = useNavigate();

	return (
		<div className="py-6 px-20 flex justify-between">
            {/* <button onClick={() => navigate('/')} className="md:text-xl pr-10 text-[#3E4261]">
                    Viginum
            </button> */}
			{/* <nav>
                <button onClick={() => navigate('/')} className="md:text-xl pr-10 text-[#3E4261]">
                    Accueil
                </button>
                <button onClick={() => navigate('/graphs')} className="md:text-xl text-[#3E4261]">
                    Graphiques
                </button>
            </nav> */}
		</div>
	);
};
