import { useEffect, useState } from "react";

// ----------------------------------------------------------
// SAFER 2-HOP GREEDY (Always moves forward, guaranteed reach)
// ----------------------------------------------------------
function findGreedyPath(nodes, source, destination) {
  const indexMap = Object.fromEntries(nodes.map((n, i) => [n.id, i]));
  const path = [source];

  let current = source;
  let safety = 0;

  while (current !== destination) {
    safety++;
    if (safety > nodes.length + 5) break;

    const idx = indexMap[current];

    // ensure only forward progress
    const next1 = nodes[idx + 1];
    const next2 = nodes[idx + 2];

    const choices = [];

    if (next1) choices.push(next1);
    if (next2) choices.push(next2);

    // if no forward nodes, stop
    if (choices.length === 0) break;

    // if destination is ahead, force include it
    if (indexMap[destination] > idx) {
      const destIndex = indexMap[destination];

      // if destination is exactly next1 or next2
      if (destIndex === idx + 1) {
        path.push(destination);
        break;
      }
      if (destIndex === idx + 2) {
        path.push(next2.id);
        current = next2.id;
        if (current === destination) break;
        continue;
      }
    }

    // pick best of next 2
    choices.sort((a, b) => a.delay - b.delay);
    const chosen = choices[0];

    current = chosen.id;
    path.push(current);

    if (current === destination) break;
  }

  return path;
}

// ----------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------
export const AODVVisualization = () => {
  const [configured, setConfigured] = useState(false);
  const [nodeCount, setNodeCount] = useState(2);
  const [nodesData, setNodesData] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const [step, setStep] = useState(0);
  const [finalPath, setFinalPath] = useState([]);
  const [dynamicNodes, setDynamicNodes] = useState([]);
  const [pathLinks, setPathLinks] = useState([]);

  // ----------------------------------------------------------
  // START
  // ----------------------------------------------------------
  const handleStart = () => {
    if (!source || !destination)
      return alert("Please select source & destination!");

    if (nodesData.length > 6)
      return alert("Maximum 6 nodes allowed!");

    // Place nodes randomly in 3 rows
    const rows = [150, 260, 360];
    const placed = nodesData.map((n, i) => ({
      ...n,
      x: 150 + i * 180,
      y: rows[Math.floor(Math.random() * rows.length)],
    }));
    setDynamicNodes(placed);

    // compute path
    const path = findGreedyPath(placed, source, destination);
    setFinalPath(path);

    // build links
    const links = [];
    for (let i = 0; i < path.length - 1; i++) {
      const a = placed.find(n => n.id === path[i]);
      const b = placed.find(n => n.id === path[i + 1]);
      if (a && b) links.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
    setPathLinks(links);

    setConfigured(true);
  };

  // ----------------------------------------------------------
  // ANIMATION
  // ----------------------------------------------------------
  useEffect(() => {
    if (!configured) return;
    const t = setInterval(() => setStep(s => (s + 1) % 3), 2000);
    return () => clearInterval(t);
  }, [configured]);

  const CloudBubble = ({ x, y, lines }) => (
    <g transform={`translate(${x - 110}, ${y - 140})`}>
      <rect width={220} height={lines.length * 18 + 30} rx="12" fill="white" stroke="blue" />
      {lines.map((t, i) => (
        <text key={i} x={110} y={25 + i * 16} fontSize="11" fontWeight="600" textAnchor="middle">
          {t}
        </text>
      ))}
    </g>
  );

  const reasons = {
    1: { node: finalPath[1], text: ["Checking next nodes", "Comparing delays"] },
    2: { node: finalPath[finalPath.length - 1], text: ["Destination reached", "Path complete"] },
  };

  // ----------------------------------------------------------
  // CONFIG SCREEN
  // ----------------------------------------------------------
  if (!configured) {
    return (
      <div className="p-6 space-y-4 max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-center">Setup Your Network</h2>

        <input
          type="number"
          min="2"
          max="6"
          value={nodeCount}
          onChange={(e) => {
            let v = Number(e.target.value);
            if (v > 6) { alert("Max 6 nodes"); v = 6; }
            setNodeCount(v);
          }}
          className="w-full p-2 border rounded"
        />

        {[...Array(nodeCount)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <input
              placeholder="Node ID"
              className="p-2 border rounded w-1/2"
              onChange={(e) => {
                const arr = [...nodesData];
                arr[i] = { ...arr[i], id: e.target.value.toUpperCase() };
                setNodesData(arr.slice(0, 6));
              }}
            />
            <input
              placeholder="Delay (ms)"
              className="p-2 border rounded w-1/2"
              type="number"
              onChange={(e) => {
                const arr = [...nodesData];
                arr[i] = { ...arr[i], delay: Number(e.target.value) };
                setNodesData(arr.slice(0, 6));
              }}
            />
          </div>
        ))}

        <select className="p-2 border rounded w-full" onChange={e => setSource(e.target.value)}>
          <option>Select Source</option>
          {nodesData.map((n, i) => <option key={i}>{n.id}</option>)}
        </select>

        <select className="p-2 border rounded w-full" onChange={e => setDestination(e.target.value)}>
          <option>Select Destination</option>
          {nodesData.map((n, i) => <option key={i}>{n.id}</option>)}
        </select>

        <button className="w-full p-3 bg-blue-600 text-white rounded" onClick={handleStart}>
          Start Visualization
        </button>
      </div>
    );
  }

  // ----------------------------------------------------------
  // VISUALIZATION
  // ----------------------------------------------------------
  return (
    <div className="w-full p-10 flex flex-col items-center">
      <svg viewBox="0 0 1800 500" className="w-full max-w-7xl">

        {step > 0 && reasons[step] &&
          (() => {
            const r = reasons[step];
            const obj = dynamicNodes.find(n => n.id === r.node);
            return obj ? <CloudBubble x={obj.x} y={obj.y} lines={r.text} /> : null;
          })()
        }

        {/* Path lines */}
        <g stroke="blue" strokeWidth="4">
          {pathLinks.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
          ))}
        </g>

        {/* Nodes */}
        {dynamicNodes.map(node => (
          <g key={node.id}>
            <text
              x={node.x}
              y={node.y - 28}
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              {finalPath.includes(node.id) ? "Selected" : "Rejected"}
            </text>

            <circle
              cx={node.x}
              cy={node.y}
              r={26}
              fill={
                node.id === source
                  ? "blue"
                  : node.id === destination
                  ? "green"
                  : finalPath.includes(node.id)
                  ? "#00bcd4"
                  : "#b0bec5"
              }
            />

            <text x={node.x} y={node.y + 4} fontSize="13" fill="white" fontWeight="700" textAnchor="middle">
              {node.id}
            </text>

            <text x={node.x} y={node.y + 34} fontSize="10" textAnchor="middle">
              {node.delay} ms
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

