import { ArrowUpRight } from "lucide-react";

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
}

const PromptCard: React.FC<CardProps> = ({ title, subtitle, description }) => {
  return (
    <div className="flex-shrink-0 max-w-sm p-[2px] bg-gradient-to-r from-[#FF8E8E] to-[#9747FF] rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-[#FF8E8E]/50 cursor-pointer w-[258px]">
      <div className="bg-zinc-950 text-zinc-50 rounded-lg p-5 flex flex-col justify-between h-[170px]">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-semibold leading-none">
            {title}
            <span className="block mt-1">{subtitle}</span>
          </h2>
          <div>
            <button className="flex items-center gap-2 p-1 border rounded-full border-zinc-50">
              <ArrowUpRight size={23} />
            </button>
          </div>
        </div>
        <p className="text-xs text-zinc-50">{description}</p>
      </div>
    </div>
  );
};

export default PromptCard;
