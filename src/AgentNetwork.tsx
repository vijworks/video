import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

interface Node {
  x: number;
  y: number;
  label: string;
  color: string;
}

const NODES: Node[] = [
  { x: 20, y: 30, label: "Research", color: "#8b5cf6" },
  { x: 80, y: 25, label: "Content", color: "#06b6d4" },
  { x: 15, y: 70, label: "Authority", color: "#f59e0b" },
  { x: 85, y: 75, label: "Freshness", color: "#10b981" },
  { x: 50, y: 50, label: "AEO Core", color: "#3b82f6" },
];

const CONNECTIONS = [
  [0, 4], [1, 4], [2, 4], [3, 4], // All connect to center
  [0, 1], [2, 3], // Cross connections
];

const PLATFORM_ICONS = [
  { name: "Google", x: 35, y: 15, color: "#4285f4" },
  { name: "ChatGPT", x: 65, y: 15, color: "#10a37f" },
  { name: "Claude", x: 25, y: 85, color: "#cc785c" },
  { name: "Perplexity", x: 50, y: 90, color: "#20b2aa" },
  { name: "Gemini", x: 75, y: 85, color: "#8e44ad" },
];

export const AgentNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Overall network fade in
  const networkOpacity = interpolate(
    frame,
    [0, fps * 0.5],
    [0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Pulse animation for nodes
  const pulsePhase = (frame / fps) * Math.PI * 2;

  return (
    <AbsoluteFill style={{ opacity: networkOpacity }}>
      <svg width={width} height={height} className="absolute inset-0">
        <defs>
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {CONNECTIONS.map(([from, to], i) => {
          const fromNode = NODES[from];
          const toNode = NODES[to];
          const x1 = (fromNode.x / 100) * width;
          const y1 = (fromNode.y / 100) * height;
          const x2 = (toNode.x / 100) * width;
          const y2 = (toNode.y / 100) * height;

          // Animated dash offset for data flow effect
          const dashOffset = -frame * 2 + i * 50;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#connectionGradient)"
              strokeWidth="2"
              strokeDasharray="8 8"
              strokeDashoffset={dashOffset}
              filter="url(#glow)"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const x = (node.x / 100) * width;
          const y = (node.y / 100) * height;
          const pulse = 1 + Math.sin(pulsePhase + i * 0.8) * 0.15;
          const size = node.label === "AEO Core" ? 24 : 16;

          return (
            <g key={i}>
              {/* Outer glow */}
              <circle
                cx={x}
                cy={y}
                r={size * pulse * 1.5}
                fill={node.color}
                opacity={0.2}
                filter="url(#glow)"
              />
              {/* Inner node */}
              <circle
                cx={x}
                cy={y}
                r={size * pulse}
                fill={node.color}
                opacity={0.8}
              />
              {/* Label */}
              <text
                x={x}
                y={y + size + 16}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="10"
                fontWeight="500"
                fontFamily="system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Platform icons around the edges */}
        {PLATFORM_ICONS.map((platform, i) => {
          const x = (platform.x / 100) * width;
          const y = (platform.y / 100) * height;
          const delay = fps * 0.3 + i * 5;

          const iconOpacity = interpolate(
            frame,
            [delay, delay + fps * 0.3],
            [0, 0.7],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Connect to nearest node with flowing line
          const centerX = (50 / 100) * width;
          const centerY = (50 / 100) * height;

          return (
            <g key={i} opacity={iconOpacity}>
              {/* Connection to center */}
              <line
                x1={x}
                y1={y}
                x2={centerX}
                y2={centerY}
                stroke={platform.color}
                strokeWidth="1"
                strokeDasharray="4 6"
                strokeDashoffset={-frame * 1.5}
                opacity={0.3}
              />
              {/* Platform badge */}
              <rect
                x={x - 30}
                y={y - 10}
                width="60"
                height="20"
                rx="10"
                fill={platform.color}
                opacity={0.15}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={platform.color}
                fontSize="10"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {platform.name}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
