export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-grid-fade bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)] opacity-20" />
      <div className="blob w-[620px] h-[620px] bg-accent/20 -top-40 -right-32 animate-[float_18s_ease-in-out_infinite]" />
      <div className="blob w-[480px] h-[480px] bg-accent/10 top-1/3 -left-40 animate-[float_22s_ease-in-out_infinite_reverse]" />
      <div className="blob w-[420px] h-[420px] bg-accent/10 bottom-0 right-1/4 animate-[float_26s_ease-in-out_infinite]" />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.08); }
          66% { transform: translate(-30px, 30px) scale(0.95); }
        }
      `}</style>
    </div>
  )
}
