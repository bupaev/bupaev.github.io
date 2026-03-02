import React from 'react';

export const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 127 127" {...props}>
    <style>
      {`
        .st0 {
          fill: none;
          stroke: var(--accent-color);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-miterlimit: 4;
        }
      `}
    </style>
    <line className="st0" x1="20" y1="101.2" x2="29.3" y2="92.2" />
    <line className="st0" x1="92.5" y1="33.2" x2="101.8" y2="24.2" />
    <line className="st0" x1="63.5" y1="20.7" x2="63.5" y2="8.2" />
    <line className="st0" x1="63.5" y1="118" x2="63.5" y2="105.6" />
    <line className="st0" x1="105.3" y1="63" x2="119" y2="63.1" />
    <line className="st0" x1="7.4" y1="63" x2="21" y2="63.1" />
    <line className="st0" x1="23" y1="23.8" x2="32.2" y2="33.7" />
    <line className="st0" x1="93.1" y1="93.2" x2="102.3" y2="103.1" />
    <circle className="st0" cx="63" cy="63" r="29.5" />
  </svg>
);
