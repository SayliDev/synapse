const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-[600px] px-7 sm:gap-7 sm:px-0">
      <h1 className="text-xl sm:text-4xl font-medium mb-4 text-zinc-50 text-center">
        How can we
        <span className="bg-gradient-to-r from-[#FF8E8E] to-[#9747FF] bg-clip-text text-transparent">
          {" "}
          assist{" "}
        </span>
        you today?
      </h1>

      <p className="text-sm sm:text-xl text-zinc-50 text-center">
        Get expert guidance powered by AI agents specializing in Sales,
        Marketing, and Negotiation. Choose the agent that suits your needs and
        start your conversation with ease.
      </p>
    </div>
  );
};

export default HeroSection;
