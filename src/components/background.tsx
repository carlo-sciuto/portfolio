export function Background() {
  return (
    <div className="fixed left-0 top-0 -z-50 h-full w-full overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Radial Gradient Orbs */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 opacity-30 blur-[100px] animate-pulse" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 opacity-30 blur-[100px] animate-pulse" />
      <div className="absolute left-[40%] top-[40%] h-[300px] w-[300px] rounded-full bg-purple-500/10 opacity-20 blur-[100px]" />
    </div>
  );
}
