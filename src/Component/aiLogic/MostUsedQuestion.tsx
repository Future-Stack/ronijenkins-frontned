import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Question {
  question_text: string;
  ask_count: number;
  trend: string;
  threads_processed: number;
}

interface MostUsedData {
  questions: Question[];
  total_unique_questions: number;
  analysis_period: string;
  timestamp: string;
}

interface Props {
  data: MostUsedData | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const MostUsedQuestions: React.FC<Props> = ({ data, loading, error, onRetry }) => {
  return (
    <div className="w-full h-full bg-white rounded-[40px] p-3 xl:p-8 shadow-sm border border-orange-50/50">
      <div className="mb-8">
        <h2 className="text-base md:text-lg font-extrabold text-titleColor leading-6 mb-2 mt-3">
          Most Used Questions
        </h2>
        <p className="text-subTitleColor text-sm font-medium leading-5">
          Top performing user inquiries across all segments
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-5 bg-[#fdfaf8] rounded-[24px] animate-pulse"
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
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
            onClick={onRetry}
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
            {data.questions.map((q, i) => {
              const isPositive = !q.trend.startsWith('-');
              return (
                <div
                  key={i}
                  className="group flex items-center justify-between p-5 bg-[#fdfaf8] rounded-[24px] hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-orange-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-50 text-[#846584]">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-titleColor text-sm leading-5">
                        {q.question_text}
                      </h4>
                      <p className="text-[10px] font-bold text-[#4A3A3766] uppercase tracking-4 mt-1">
                        {q.ask_count.toLocaleString()} TIMES ASKED
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-black text-xs leading-4 ${
                      isPositive ? 'text-[#00A63E]' : 'text-[#FB2C36]'
                    }`}
                  >
                    {q.trend}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] font-bold text-[#4A3A3744] uppercase tracking-widest mt-6 text-right">
            {data.total_unique_questions} unique questions · {data.analysis_period} period
          </p>
        </>
      )}
    </div>
  );
};

export default MostUsedQuestions;