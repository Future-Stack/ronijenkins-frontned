import React from 'react';

interface AnalyticsCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  rightTop?: string;
  rightBottom?: string;
  rightColor?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  icon,
  title,
  subtitle,
  rightTop,
  rightBottom,
  rightColor = 'text-[#00A63E]',
}) => {
  return (
    <div className="group flex items-center justify-between p-5 bg-[#fdfaf8] rounded-[24px] hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-orange-100">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-50 text-[#846584]">
          {icon}
        </div>

        <div>
          <h4 className="font-bold text-titleColor text-sm leading-5">
            {title}
          </h4>
          <p className="text-[10px] font-bold text-[#4A3A3766] uppercase tracking-4 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className={`font-black text-xs leading-4 ${rightColor}`}>
        {rightTop}
      </div>

    </div>
  );
};

export default AnalyticsCard;