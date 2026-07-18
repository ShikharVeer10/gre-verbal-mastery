import React, { useEffect, useRef } from 'react';

export default function RelationshipGraph({ wordObj }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!wordObj || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const center = { x: width / 2, y: height / 2 };

    // Define nodes surrounding center
    const nodes = [
      { label: `Root: ${wordObj.root}`, type: 'root', color: '#f59e0b', angle: 0 },
      { label: `Synonym: ${wordObj.synonyms[0]}`, type: 'synonym', color: '#10b981', angle: 60 },
      { label: `Antonym: ${wordObj.antonyms[0]}`, type: 'antonym', color: '#f43f5e', angle: 120 },
      { label: `Prefix: ${wordObj.prefix}`, type: 'prefix', color: '#6366f1', angle: 180 },
      { label: `Suffix: ${wordObj.suffix}`, type: 'suffix', color: '#06b6d4', angle: 240 },
      { label: `Family: ${wordObj.wordFamily[0]}`, type: 'family', color: '#a855f7', angle: 300 },
    ];

    const radius = 160;

    // Draw connecting lines first
    nodes.forEach((n) => {
      const rad = (n.angle * Math.PI) / 180;
      const nx = center.x + radius * Math.cos(rad);
      const ny = center.y + radius * Math.sin(rad);

      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      n.x = nx;
      n.y = ny;
    });

    // Draw outer nodes
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 32, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fill();
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label.slice(0, 16), n.x, n.y);
    });

    // Draw Center Target Word Node
    ctx.beginPath();
    ctx.arc(center.x, center.y, 45, 0, Math.PI * 2);
    ctx.fillStyle = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
    ctx.fill();
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = 'bold 14px Outfit, sans-serif';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(wordObj.word.toUpperCase(), center.x, center.y);

  }, [wordObj]);

  return (
    <div style={{ textAlign: 'center', background: 'rgba(15, 23, 42, 0.6)', padding: 20, borderRadius: 16, border: '1px solid var(--border-glass)' }}>
      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: '#fff', marginBottom: 12 }}>
        Interactive Visual Relationship Graph for "{wordObj?.word}"
      </h4>
      <canvas ref={canvasRef} width={500} height={420} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
}
