import { useEffect, useState } from "react";
import { DataType } from "../model/types";
import { ServerConnection } from "./ServerConnection";
import { ServerGeneration } from "./ServerGeneration";
import { fetchServerWakeUp } from "../utils/fetchServer";

type SetDatasType = {
    datas: DataType[] | undefined;
    setDatas: (datas: DataType[] | undefined) => void;
}

export const ServerComputing: React.FC<SetDatasType> = ({ datas, setDatas }) => {
    const [serverAreaSize, setServerAreaSize] = useState<number>();
    const [initialAlives, setInitialAlives] = useState<number>();
    const [serverResponse, setServerResponse] = useState<string>('');
    const [serverError, setServerError] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(60);

    useEffect(() => {
        const wakeUp = async () => {
            try {
                setServerResponse(await fetchServerWakeUp());
            } catch (e: unknown) {
                setServerError(e instanceof Error ? e.message : 'Server is unavailable');
            }
        }
        wakeUp();
    }, [])

    useEffect(() => {
        if (serverResponse || serverError || countdown <= 0) return;
        const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, serverResponse, serverError])

    const statusClass = serverResponse ? 'ok' : serverError ? 'bad' : 'wait';
    const statusText = serverResponse
        ? serverResponse
        : serverError
            ? serverError
            : `Waking up the server… ${countdown}s`;

    return (
        <>
            <div className="panel-head">
                <h2>Back-end calculation</h2>
                <div className={`status ${statusClass}`} role="status">{statusText}</div>
            </div>

            <ServerConnection setDatas={setDatas} serverAreaSize={serverAreaSize}
                setServerAreaSize={setServerAreaSize} setInitialAlives={setInitialAlives} />

            {serverAreaSize !== undefined &&
                <ServerGeneration datas={datas} setDatas={setDatas} serverAreaSize={serverAreaSize}
                    setServerAreaSize={setServerAreaSize} initialAlives={initialAlives!} />
            }
        </>)
}
