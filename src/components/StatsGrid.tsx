type Item = { label: string; value: string };

export const StatsGrid: React.FC<{ items: Item[] }> = ({ items }) => (
  <div className="stats">
    {items.map(it => (
      <div className="stat" key={it.label}>
        <span className="label">{it.label}</span>
        <span className="value">{it.value}</span>
      </div>
    ))}
  </div>
);
