import { useState } from 'react';
import ChartArea from '../components/ChartArea';
import { ServerComputing } from '../components/ServerComputing';
import { DataType } from '../model/types';

export const BackCompute: React.FC = () => {

    const [datas, setDatas] = useState<DataType[]>();

    return (
        <div className='flex flex-col sm:flex-row justify-center h-[90vh] overflow-y-scroll scrollbar-hide'>
            {datas && <ChartArea data={datas} />}
            <ServerComputing datas={datas} setDatas={setDatas} />
        </div>
    )

}