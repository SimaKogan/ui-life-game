import { useState } from 'react';
import ChartArea from '../components/ChartArea';
import { ServerComputing } from '../components/ServerComputing';
import { DataType } from '../model/types';

export const BackCompute: React.FC = () => {
  const [datas, setDatas] = useState<DataType[]>();

  return (
    <div className="page layout">
      <section className="board-wrap">
        {datas && datas.length > 0 ? (
          <div className="chart-box">
            <ChartArea data={datas} />
          </div>
        ) : (
          <div className="empty">
            <p>No data yet</p>
            <p className="muted">Initialize a matrix on the server to see the chart.</p>
          </div>
        )}
      </section>

      <aside className="panel">
        <ServerComputing datas={datas} setDatas={setDatas} />
      </aside>
    </div>
  );
};
