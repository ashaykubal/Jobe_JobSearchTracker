import React, { useState, useMemo } from 'react';

interface SankeyNode {
  id: string;
  label: string;
  value: number;
  x: number;
  y: number;
  height: number;
  color: string;
  column: number;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  sourceY: number;
  targetY: number;
  color: string;
}

interface SankeyDiagramProps {
  width?: number;
  height?: number;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ 
  width = 800, 
  height = 400 
}) => {
  const [hoveredElements, setHoveredElements] = useState<{
    nodes: Set<string>;
    links: Set<string>;
  }>({ nodes: new Set(), links: new Set() });

  // Mock data based on the reference image
  const mockData = {
    nodes: [
      { id: 'applications', label: 'Applications', value: 17 },
      { id: 'interviews', label: 'Interviews', value: 4 },
      { id: 'rejected', label: 'Rejected', value: 9 },
      { id: 'no-answer', label: 'No Answer', value: 4 },
      { id: 'offers', label: 'Offers', value: 2 },
      { id: 'no-offer', label: 'No Offer', value: 2 },
      { id: 'accepted', label: 'Accepted', value: 1 },
      { id: 'declined', label: 'Declined', value: 1 },
    ],
    links: [
      { source: 'applications', target: 'interviews', value: 4 },
      { source: 'applications', target: 'rejected', value: 9 },
      { source: 'applications', target: 'no-answer', value: 4 },
      { source: 'interviews', target: 'offers', value: 2 },
      { source: 'interviews', target: 'no-offer', value: 2 },
      { source: 'offers', target: 'accepted', value: 1 },
      { source: 'offers', target: 'declined', value: 1 },
    ]
  };

  // Color mapping based on status - matching the design system
  const getStatusColor = (nodeId: string) => {
    switch (nodeId) {
      case 'applications':
        return '#6b7280'; // gray-500
      case 'interviews':
        return '#3b82f6'; // blue-500
      case 'rejected':
        return '#ef4444'; // red-500
      case 'no-answer':
        return '#f59e0b'; // amber-500
      case 'offers':
        return '#10b981'; // emerald-500
      case 'no-offer':
        return '#ef4444'; // red-500
      case 'accepted':
        return '#059669'; // emerald-600
      case 'declined':
        return '#d97706'; // amber-600
      default:
        return '#6b7280';
    }
  };

  const { nodes, links } = useMemo(() => {
    const padding = 60;
    const nodeWidth = 20;
    const columnSpacing = (width - 2 * padding - nodeWidth) / 3;

    // Position nodes in columns
    const processedNodes: SankeyNode[] = mockData.nodes.map(node => {
      let x = padding;
      let column = 0;

      // Determine column based on node type
      if (node.id === 'applications') {
        column = 0;
      } else if (['interviews', 'rejected', 'no-answer'].includes(node.id)) {
        column = 1;
      } else if (['offers', 'no-offer'].includes(node.id)) {
        column = 2;
      } else {
        column = 3;
      }

      x = padding + column * columnSpacing;

      // Calculate node height based on value
      const maxValue = Math.max(...mockData.nodes.map(n => n.value));
      const nodeHeight = Math.max(40, (node.value / maxValue) * (height - 2 * padding) * 0.3);

      // Position nodes vertically within their column
      let y = padding;
      if (column === 1) {
        if (node.id === 'interviews') y = padding + 10;
        else if (node.id === 'rejected') y = padding + 100;
        else if (node.id === 'no-answer') y = padding + 200;
      } else if (column === 2) {
        if (node.id === 'offers') y = padding + 10;
        else if (node.id === 'no-offer') y = padding + 80;
      } else if (column === 3) {
        if (node.id === 'accepted') y = padding + 10;
        else if (node.id === 'declined') y = padding + 80;
      }

      return {
        id: node.id,
        label: node.label,
        value: node.value,
        x,
        y,
        height: nodeHeight,
        color: getStatusColor(node.id),
        column
      };
    });

    // Create links with proper positioning
    const processedLinks: SankeyLink[] = mockData.links.map(link => {
      const sourceNode = processedNodes.find(n => n.id === link.source)!;
      const targetNode = processedNodes.find(n => n.id === link.target)!;

      return {
        source: link.source,
        target: link.target,
        value: link.value,
        sourceY: sourceNode.y + sourceNode.height / 2,
        targetY: targetNode.y + targetNode.height / 2,
        color: targetNode.color
      };
    });

    return { nodes: processedNodes, links: processedLinks };
  }, [width, height]);

  // Generate SVG path for curved links
  const generatePath = (link: SankeyLink, sourceNode: SankeyNode, targetNode: SankeyNode) => {
    const sourceX = sourceNode.x + 20;
    const targetX = targetNode.x;
    const sourceY = link.sourceY;
    const targetY = link.targetY;
    
    const controlPointOffset = (targetX - sourceX) * 0.5;
    
    const linkHeight = Math.max(8, (link.value / 17) * 40);
    
    const path = `
      M ${sourceX} ${sourceY - linkHeight/2}
      C ${sourceX + controlPointOffset} ${sourceY - linkHeight/2}
        ${targetX - controlPointOffset} ${targetY - linkHeight/2}
        ${targetX} ${targetY - linkHeight/2}
      L ${targetX} ${targetY + linkHeight/2}
      C ${targetX - controlPointOffset} ${targetY + linkHeight/2}
        ${sourceX + controlPointOffset} ${sourceY + linkHeight/2}
        ${sourceX} ${sourceY + linkHeight/2}
      Z
    `;
    
    return path;
  };

  // Get only the direct path from a specific node (not the entire tree)
  const getDirectPath = (startNodeId: string): { nodes: Set<string>; links: Set<string> } => {
    const visitedNodes = new Set<string>([startNodeId]);
    const visitedLinks = new Set<string>();
    
    // Only get direct connections, not the entire tree
    links.forEach(link => {
      const linkId = `${link.source}-${link.target}`;
      
      if (link.source === startNodeId) {
        // Direct outgoing connection
        visitedLinks.add(linkId);
        visitedNodes.add(link.target);
      } else if (link.target === startNodeId) {
        // Direct incoming connection
        visitedLinks.add(linkId);
        visitedNodes.add(link.source);
      }
    });
    
    return { nodes: visitedNodes, links: visitedLinks };
  };

  // Get path for a specific link
  const getLinkPath = (linkSource: string, linkTarget: string): { nodes: Set<string>; links: Set<string> } => {
    const linkId = `${linkSource}-${linkTarget}`;
    return {
      nodes: new Set([linkSource, linkTarget]),
      links: new Set([linkId])
    };
  };

  const handleHover = (elementType: 'node' | 'link', elementId: string, linkTarget?: string) => {
    if (elementType === 'node') {
      const path = getDirectPath(elementId);
      setHoveredElements(path);
    } else if (elementType === 'link' && linkTarget) {
      const path = getLinkPath(elementId, linkTarget);
      setHoveredElements(path);
    }
  };

  const handleMouseLeave = () => {
    setHoveredElements({ nodes: new Set(), links: new Set() });
  };

  const isNodeHighlighted = (nodeId: string) => {
    return hoveredElements.nodes.size === 0 || hoveredElements.nodes.has(nodeId);
  };

  const isLinkHighlighted = (link: SankeyLink) => {
    const linkId = `${link.source}-${link.target}`;
    return hoveredElements.links.size === 0 || hoveredElements.links.has(linkId);
  };

  const hasHoveredElements = hoveredElements.nodes.size > 0 || hoveredElements.links.size > 0;

  return (
    <div className="w-full overflow-x-auto">
      <svg 
        width={width} 
        height={height} 
        className="w-full"
      >
        {/* Links */}
        {links.map((link, index) => {
          const sourceNode = nodes.find(n => n.id === link.source)!;
          const targetNode = nodes.find(n => n.id === link.target)!;
          const isHighlighted = isLinkHighlighted(link);
          
          return (
            <path
              key={`link-${index}`}
              d={generatePath(link, sourceNode, targetNode)}
              fill={link.color}
              fillOpacity={hasHoveredElements ? (isHighlighted ? 0.9 : 0.1) : 0.7}
              stroke="none"
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => handleHover('link', link.source, link.target)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const isHighlighted = isNodeHighlighted(node.id);
          
          // Smart text positioning to avoid branch overlap
          let textX, textY, textAnchor;
          
          if (node.id === 'applications') {
            // Position above the node
            textX = node.x + 10;
            textY = node.y - 15;
            textAnchor = 'middle';
          } else if (node.id === 'rejected' || node.id === 'no-answer') {
            // Position below the node
            textX = node.x + 10;
            textY = node.y + node.height + 35;
            textAnchor = 'middle';
          } else if (node.column === 3) {
            // Rightmost column - position to the right
            textX = node.x + 35;
            textY = node.y + node.height / 2;
            textAnchor = 'start';
          } else {
            // Other nodes - position to the left
            textX = node.x - 15;
            textY = node.y + node.height / 2;
            textAnchor = 'end';
          }
          
          return (
            <g key={node.id}>
              {/* Node rectangle */}
              <rect
                x={node.x}
                y={node.y}
                width={20}
                height={node.height}
                fill={node.color}
                fillOpacity={hasHoveredElements ? (isHighlighted ? 1 : 0.2) : 1}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => handleHover('node', node.id)}
                onMouseLeave={handleMouseLeave}
              />
              
              {/* Node value */}
              <text
                x={textX}
                y={textY - 8}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fill={hasHoveredElements ? (isHighlighted ? '#f3f4f6' : '#6b7280') : '#e5e7eb'}
                className="text-lg font-bold transition-all duration-300 cursor-pointer pointer-events-none select-none"
                onMouseEnter={() => handleHover('node', node.id)}
                onMouseLeave={handleMouseLeave}
              >
                {node.value}
              </text>
              
              {/* Node label */}
              <text
                x={textX}
                y={textY + 12}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                fill={hasHoveredElements ? (isHighlighted ? '#d1d5db' : '#6b7280') : '#9ca3af'}
                className="text-sm transition-all duration-300 cursor-pointer pointer-events-none select-none"
                onMouseEnter={() => handleHover('node', node.id)}
                onMouseLeave={handleMouseLeave}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SankeyDiagram;