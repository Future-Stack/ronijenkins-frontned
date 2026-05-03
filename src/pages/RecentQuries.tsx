import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrainCircuit } from 'lucide-react';

// --- Types ---
interface QueryItem {
  question_text: string;
  confidence_score: number;
  threads_processed: number;
  timestamp: string;
}

interface RecentQueriesData {
  queries: QueryItem[];
  total_queries_analyzed: number;
  avg_confidence: number;
  analysis_period: string;
}

// --- API ---
const API_URL = 'https://navelle-ai-ay11.onrender.com/api/ai/analyze/chat-insights';

// --- Helpers ---
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

const RecentQueries: React.FC = () => {
  const [data, setData] = useState<RecentQueriesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(API_URL, '', {
        headers: { accept: 'application/json' },
      });
      setData(res.data.recent_queries);
      console.log('Recent Queries Data:', res.data.recent_queries);
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
    fetchData();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-[40px] p-3 xl:p-8 shadow-sm border border-gray-50">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-base md:text-lg font-extrabold text-titleColor mt-3 leading-6">
          Recent Queries Analysis
        </h2>
        <p className="text-subTitleColor text-sm font-medium leading-5">
          Live stream of model interaction performance
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-6 bg-[#FBF8F6] rounded-[28px] animate-pulse"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
              </div>
              <div className="space-y-1 text-right">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-3 bg-gray-100 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <p className="text-sm text-red-500 font-medium">{error}</p>
          <button
            onClick={fetchData}
            className="text-xs font-bold text-white bg-red-400 hover:bg-red-500 px-4 py-2 rounded-xl transition-all"
          >
            Retry
          </button>
        </div>
      )}

      {/* Data State */}
      {!loading && !error && data && (
        <>
          <div className="space-y-4">
            {data.queries.map((item, index) => {
              const confidencePct = Math.round(item.confidence_score * 100);
              return (
                <div
                  key={index}
                  className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-[#FBF8F6] rounded-[28px] border border-orange-50/50 hover:shadow-md transition-all duration-300"
                >
                  {/* Left: Icon & Text */}
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 shrink-0 bg-white rounded-2xl flex items-center justify-center text-[#846584] shadow-sm border border-gray-50 group-hover:scale-110 transition-transform">
                      <BrainCircuit size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-titleColor text-sm leading-5">
                        "{item.question_text}"
                      </h4>
                      <p className="text-[10px] font-bold text-[#4A3A3766] uppercase tracking-4 mt-1">
                        {item.threads_processed.toLocaleString()} TOKENS PROCESSED · {formatDate(item.timestamp)}
                      </p>
                    </div>
                  </div>

                  {/* Right: Confidence */}
                  <div className="mt-4 md:mt-0 text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                    <div
                      className={`font-black text-xs leading-4 ${
                        confidencePct >= 95 ? 'text-[#00A63E]' : 'text-[#E68A00]'
                      }`}
                    >
                      {confidencePct}% Confidence
                    </div>
                    <div className="text-[10px] font-extrabold text-[#4A3A3733] uppercase mt-0.5">
                      RESPONSE QUALITY
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer meta */}
          <p className="text-[10px] font-bold text-[#4A3A3744] uppercase tracking-widest mt-6 text-right">
            {data.total_queries_analyzed} queries · avg {Math.round(data.avg_confidence * 100)}% confidence · {data.analysis_period} period
          </p>
        </>
      )}
    </div>
  );
};

export default RecentQueries;





