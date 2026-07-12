import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Play, Pause, RefreshCw, Cpu, Target } from 'lucide-react';

export default function InspectorSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [useMouse, setUseMouse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Simulated tracking coordinates
  const [coords, setCoords] = useState({ x: 120, y: 150 });
  const [fps, setFps] = useState(13.4);
  const [inferenceTime, setInferenceTime] = useState(74.6);
  const [status, setStatus] = useState<'WAITING' | 'PASS' | 'ALIGNING'>('WAITING');

  // Conveyor work zone (predefined check bounds)
  const zone = { x: 140, y: 80, width: 140, height: 140 };

  // Smooth looping path for auto mode
  useEffect(() => {
    if (!isPlaying || useMouse) return;

    let startTime = Date.now();
    let frameId: number;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Calculate a figure-8 Lissajous curve inside the viewport (scaled 0 to 400x300)
      const x = 200 + Math.sin(elapsed * 1.5) * 110;
      const y = 150 + Math.cos(elapsed * 3.0) * 65;

      setCoords({ x: Math.round(x), y: Math.round(y) });

      // Simulate slight micro-variations in FPS & inference
      if (Math.random() > 0.92) {
        setFps(+(13.2 + Math.random() * 0.4).toFixed(1));
        setInferenceTime(+(72.5 + Math.random() * 4).toFixed(1));
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, useMouse]);

  // Mouse hover tracking
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!useMouse || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Constraint coordinates to viewport bounding box (0-400x300 scale)
    const relativeX = (x / rect.width) * 400;
    const relativeY = (y / rect.height) * 300;
    
    setCoords({
      x: Math.round(Math.max(20, Math.min(380, relativeX))),
      y: Math.round(Math.max(20, Math.min(280, relativeY))),
    });

    if (Math.random() > 0.8) {
      setFps(+(13.3 + Math.random() * 0.3).toFixed(1));
      setInferenceTime(+(71.8 + Math.random() * 3).toFixed(1));
    }
  };

  // Perform spatial verification (Centroid checking)
  useEffect(() => {
    const isInsideX = coords.x >= zone.x && coords.x <= zone.x + zone.width;
    const isInsideY = coords.y >= zone.y && coords.y <= zone.y + zone.height;

    if (isInsideX && isInsideY) {
      setStatus('PASS');
    } else if (
      (coords.x >= zone.x - 20 && coords.x <= zone.x + zone.width + 20) &&
      (coords.y >= zone.y - 20 && coords.y <= zone.y + zone.height + 20)
    ) {
      setStatus('ALIGNING');
    } else {
      setStatus('WAITING');
    }
  }, [coords]);

  const handleReset = () => {
    setCoords({ x: 120, y: 150 });
    setStatus('WAITING');
  };

  return (
    <div id="inspector-sim" className="w-full bg-surface border border-border rounded-xl overflow-hidden shadow-2xl relative z-10 font-mono text-[11px] flex flex-col h-[380px] hover:border-border2 transition-all">
      
      {/* Visual Header / Control Bar */}
      <div className="px-4 py-2.5 bg-bg2 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green flex items-center justify-center relative">
            <span className="w-full h-full rounded-full bg-green absolute animate-ping opacity-60" />
          </span>
          <span className="font-bold text-[10px] tracking-wider text-text uppercase">CAM_01: ASSEMBLY_STREAM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            type="button"
            onClick={() => setUseMouse(!useMouse)} 
            className={`px-2 py-0.5 rounded text-[9px] font-semibold border transition-all ${
              useMouse 
                ? 'bg-cyan/10 border-cyan/30 text-cyan' 
                : 'bg-border/40 border-border text-text2 hover:text-text'
            }`}
          >
            {useMouse ? 'MOUSE_ON' : 'AUTO_PATH'}
          </button>
          <button 
            type="button"
            onClick={() => setIsPlaying(!isPlaying)} 
            disabled={useMouse}
            className={`p-1 rounded hover:bg-border/50 text-text2 hover:text-text disabled:opacity-30`}
            title={isPlaying ? "Pause simulation" : "Play simulation"}
          >
            {isPlaying && !useMouse ? <Pause size={12} /> : <Play size={12} />}
          </button>
          <button 
            type="button"
            onClick={handleReset} 
            className="p-1 rounded hover:bg-border/50 text-text2 hover:text-text"
            title="Reset position"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="flex-1 bg-black relative overflow-hidden select-none cursor-crosshair group/viewport"
        style={{ backgroundImage: 'radial-gradient(circle, #0e1117 10%, transparent 11%)', backgroundSize: '16px 16px' }}
      >
        {/* Real-time floating HUD overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 text-[9px] pointer-events-none bg-black/70 backdrop-blur-md p-2 rounded border border-white/5">
          <div className="flex items-center gap-1.5 text-text2">
            <Cpu size={10} className="text-green" />
            <span>MODEL: YOLOv8x-Spatial</span>
          </div>
          <div className="flex items-center gap-1.5 text-text2">
            <Target size={10} className="text-cyan" />
            <span>RESOLUTION: 400x300</span>
          </div>
          <div className="text-text3 mt-0.5">// CENTROID COORDS</div>
          <div className="text-cyan font-bold">X: {coords.x.toString().padStart(3, '0')} | Y: {coords.y.toString().padStart(3, '0')}</div>
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1 text-[9px] pointer-events-none bg-black/70 backdrop-blur-md p-2 rounded border border-white/5">
          <div className="text-text2">FPS: <span className="text-green font-bold">{fps}</span></div>
          <div className="text-text2">LATENCY: <span className="text-green font-bold">{inferenceTime}ms</span></div>
        </div>

        {/* Dynamic Scanlines */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-green/[0.005] to-transparent bg-[length:100%_4px]" />

        {/* Camera Grid lines */}
        <div className="absolute inset-0 pointer-events-none flex justify-between px-10">
          <div className="w-[1px] h-full bg-white/[0.03]" />
          <div className="w-[1px] h-full bg-white/[0.03]" />
          <div className="w-[1px] h-full bg-white/[0.03]" />
        </div>
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-10">
          <div className="h-[1px] w-full bg-white/[0.03]" />
          <div className="h-[1px] w-full bg-white/[0.03]" />
          <div className="h-[1px] w-full bg-white/[0.03]" />
        </div>

        {/* Anchor Corner Reticles */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/20 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/20 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/20 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/20 pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          {/* Defined Zone Frame */}
          <rect
            x={zone.x}
            y={zone.y}
            width={zone.width}
            height={zone.height}
            fill="none"
            stroke={status === 'PASS' ? 'var(--green)' : status === 'ALIGNING' ? '#f59e0b' : 'rgba(255, 255, 255, 0.12)'}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            className="transition-colors duration-300"
          />
          
          {/* Centroid Path line */}
          <line
            x1="200"
            y1="150"
            x2={coords.x}
            y2={coords.y}
            stroke={status === 'PASS' ? 'rgba(0, 249, 100, 0.15)' : 'rgba(0, 225, 255, 0.1)'}
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Centroid Reticle */}
          <circle
            cx={coords.x}
            cy={coords.y}
            r="12"
            fill="none"
            stroke={status === 'PASS' ? 'var(--green)' : '#00e1ff'}
            strokeWidth="1"
            className="transition-colors duration-200"
          />
          <circle
            cx={coords.x}
            cy={coords.y}
            r="2"
            fill={status === 'PASS' ? 'var(--green)' : '#00e1ff'}
          />

          {/* Crosshair extended lines */}
          <line x1={coords.x - 18} y1={coords.y} x2={coords.x + 18} y2={coords.y} stroke={status === 'PASS' ? 'var(--green)' : '#00e1ff'} strokeWidth="0.75" />
          <line x1={coords.x} y1={coords.y - 18} x2={coords.x} y2={coords.y + 18} stroke={status === 'PASS' ? 'var(--green)' : '#00e1ff'} strokeWidth="0.75" />

          {/* HUD Label for detected item */}
          <g transform={`translate(${coords.x + 16}, ${coords.y - 16})`}>
            <rect
              width="82"
              height="16"
              fill="rgba(0,0,0,0.85)"
              stroke={status === 'PASS' ? 'var(--green)' : '#00e1ff'}
              strokeWidth="1"
              rx="2"
            />
            <text
              x="5"
              y="11"
              fill={status === 'PASS' ? 'var(--green)' : '#00e1ff'}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
            >
              drill_tool : 0.98
            </text>
          </g>
        </svg>

        {/* Prompt Instruction Overlay */}
        {useMouse && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-[8px] bg-cyan/95 text-black font-semibold px-2 py-0.5 rounded shadow">
            HOVER TO CHASE CENTROID
          </div>
        )}
      </div>

      {/* Spatial Verification Output Panel */}
      <div className={`px-4 py-3 border-t border-border flex items-center justify-between transition-colors duration-300 ${
        status === 'PASS' 
          ? 'bg-green/5' 
          : status === 'ALIGNING' 
            ? 'bg-amber-500/5' 
            : 'bg-bg2'
      }`}>
        <div className="flex flex-col">
          <span className="text-text3 text-[9px] uppercase tracking-wider">Zone Spatial Guard Status</span>
          <span className={`text-[12px] font-bold transition-colors ${
            status === 'PASS' 
              ? 'text-green' 
              : status === 'ALIGNING' 
                ? 'text-amber-500' 
                : 'text-text2'
          }`}>
            {status === 'PASS' 
              ? '▶ SYSTEM PASS: TOOL_IN_ZONE_A' 
              : status === 'ALIGNING' 
                ? '⟁ ALIGNING: DEVIATION DETECTED' 
                : '■ SYSTEM IDLE: WAITING_FOR_TOOL'}
          </span>
        </div>
        
        {/* Verification coordinates */}
        <div className="text-right flex flex-col">
          <span className="text-text3 text-[9px] uppercase tracking-wider">Centroid Delta</span>
          <span className="font-semibold text-text">
            dx: {Math.abs(coords.x - 210)}px | dy: {Math.abs(coords.y - 150)}px
          </span>
        </div>
      </div>

    </div>
  );
}
