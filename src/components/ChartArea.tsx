import React, { PureComponent } from 'react';
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
    payload: TooltipPayload[];
    label: string;
  };
  
  const renderTooltipContent = ({ payload, label }: TooltipContentProps): JSX.Element => {
    const total = payload.reduce((result: number, entry) => result + entry.value, 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

type DataTypeProps = {
  data: DataType[];
}

export default class ChartArea extends PureComponent<DataTypeProps> {

  render() {
    const { data } = this.props; 
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          stackOffset="expand"
          margin={{
            top: 10,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey='dataKey' />
          <YAxis tickFormatter={(value) => toPercent(value, 1)} />
          <Tooltip content={renderTooltipContent as unknown as TooltipProps<number, string>['content']} />          
          <Area type="monotone" dataKey="alive" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="dead" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
