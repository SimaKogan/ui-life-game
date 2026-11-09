import { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, TooltipProps, ResponsiveContainer } from 'recharts';
import { DataType } from '../model/types';

const toPercent = (decimal: number, fixed = 0): string => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number): string => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};

type TooltipPayload = {
  name: string;
  value: number;
  color: string;
};

type TooltipContentProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label: string;
};

const renderTooltipContent = ({ active, payload, label }: TooltipContentProps): JSX.Element | null => {
  if (!active || !payload || payload.length === 0) return null;
  const total = payload.reduce((result: number, entry) => result + entry.value, 0);

  return (
    <div className="chart-tooltip">
      <p>{`Generation ${label} (total: ${total})`}</p>
      <ul>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} (${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

type DataTypeProps = {
  data: DataType[];
}

const tick = { fill: 'var(--muted)', fontSize: 12 };

export default class ChartArea extends PureComponent<DataTypeProps> {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} stackOffset="expand" margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="dataKey" tick={tick} stroke="var(--border)" />
          <YAxis tickFormatter={(value) => toPercent(value, 0)} tick={tick} stroke="var(--border)" />
          <Tooltip content={renderTooltipContent as unknown as TooltipProps<number, string>['content']} />
          <Area type="monotone" dataKey="alive" name="alive" stackId="1" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.85} />
          <Area type="monotone" dataKey="dead" name="dead" stackId="1" stroke="var(--border)" fill="var(--surface-2)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
