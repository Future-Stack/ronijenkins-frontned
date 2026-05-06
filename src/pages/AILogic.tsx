import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MostUsedQuestions from "../Component/aiLogic/MostUsedQuestion";
import RecentQueries from "./RecentQuries";

const API_URL = 'https://navelle-ai-ay11.onrender.com/api/ai/analyze/chat-insights';

interface Insights {
  most_used: any;
  recent_queries: any;
}

// ✅ Component এর বাইরে রাখো — route change এ reset হবে না
let cachedInsights: Insights | null = null;

const AiLogic = () => {
  const [insights, setInsights] = useState<Insights | null>(cachedInsights);
  const [loading, setLoading] = useState(cachedInsights === null);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(API_URL, '', {
        headers: { accept: 'application/json' },
      });
      cachedInsights = res.data; 
      setInsights(res.data);
      hasFetched.current = true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || err.message);
      } else {
        setError('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cachedInsights) return; 
    if (hasFetched.current) return;
    fetchData();
  }, []);

  return (
    <div className="w-full p-3 md:p-8">
      <h1 className="text-titleColor text-xl sm:text-2xl md:text-[30px] font-extrabold leading-6 md:leading-[36px]">
        Mennie™ AI Logic
      </h1>
      <p className="text-subTitleColor text-sm font-medium leading-5 mt-0.5">
        Model intelligence and interaction monitoring
      </p>

      <div className="flex flex-col xl:flex-row items-stretch w-full gap-7 mt-6">
        <div className="w-full xl:w-1/2">
          <MostUsedQuestions
            data={insights?.most_used}
            loading={loading}
            error={error}
            onRetry={fetchData}
          />
        </div>
        <div className="w-full xl:w-1/2">
          <RecentQueries
            data={insights?.recent_queries}
            loading={loading}
            error={error}
            onRetry={fetchData}
          />
        </div>
      </div>
    </div>
  );
};

export default AiLogic;

// import MostUsedQuestions from "../Component/aiLogic/MostUsedQuestion"
// import RecentQueries from "./RecentQuries"



// const AiLogic= () => {
//   return (
    
//     <div className="w-full p-3 md:p-8 ">
      
//       <h1 className="text-titleColor text-xl sm:text-2xl md:text-[30px] font-extrabold leading-6 md:leading-[36px]">Mennie™ AI Logic</h1>
//           <p className="text-subTitleColor text-sm font-medium leading-5 mt-0.5">Model intelligence and interaction monitoring</p>
     
            


//             <div className="flex flex-col xl:flex-row  items-stretch w-full gap-7 mt-6 ">
//         <div className="w-full xl:w-1/2">
//               <MostUsedQuestions/>
//             </div>
//               <div className="w-full xl:w-1/2">
//               <RecentQueries/>
//             </div>
//           </div>
//     </div>
    
//   )
// }

// export default AiLogic