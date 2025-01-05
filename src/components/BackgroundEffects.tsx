export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
      <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-[#fff]/5 rounded-full blur-[128px] opacity-50" />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#f700ff]/10 rounded-full blur-[128px] opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f00]/10 rounded-full blur-[160px] opacity-30" />
    </div>
  );
}
