
import React from 'react';

const Wheel = ({ names, rotation }) => {
  const numSegments = names.length;
  const angle = 360 / numSegments;
  const radius = 150;
  const cx = 150;
  const cy = 150;

  const colors = ['#8d5b4c', '#d2b48c', '#4a2c2a', '#c8a18f', '#f5f5dc', '#bfa288', '#7d5a4b', '#d7bea8', '#947a6d', '#a67b5b'];

  const getCoordinatesForPercent = (percent) => {
    const x = cx + radius * Math.cos(2 * Math.PI * percent);
    const y = cy + radius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      className="wheel-svg"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <g transform={`rotate(-90 ${cx} ${cy})`}>
        {names.map((name, i) => {
          const startPercent = i / numSegments;
          const endPercent = (i + 1) / numSegments;
          const [startX, startY] = getCoordinatesForPercent(startPercent);
          const [endX, endY] = getCoordinatesForPercent(endPercent);
          const largeArcFlag = numSegments > 2 ? (angle > 180 ? 1 : 0) : 1;

          const pathData = [
            `M ${cx},${cy}`,
            `L ${startX},${startY}`,
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY}`,
            'Z'
          ].join(' ');

          const textAngle = (i + 0.5) * angle;
          const textRadius = radius * 0.6;
          const textX = cx + textRadius * Math.cos(textAngle * Math.PI / 180);
          const textY = cy + textRadius * Math.sin(textAngle * Math.PI / 180);

          return (
            <g key={i}>
              <path d={pathData} fill={colors[i % colors.length]} />
              <text
                x={textX}
                y={textY}
                fill="#fff"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
              >
                {name.length > 10 ? `${name.substring(0, 9)}...` : name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default Wheel;
