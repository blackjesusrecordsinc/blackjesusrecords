export default function ReadabilityOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] isolate" aria-hidden="true">
      {/* Base ciné (stable partout) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />

      {/* “Lift” centre léger pour lecture (sans éclaircir trop) */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_38%,rgba(0,0,0,0.10),rgba(0,0,0,0.55)_60%,rgba(0,0,0,0.80)_100%)]" />

      {/* Vignette douce premium */}
      <div className="absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.65)]" />

      {/* Grain ultra léger (pas “sale”) */}
      <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay bg-[url('/noise.png')]" />

      {/* Micro “soften” (évite photos trop nettes/claquantes) */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
