import { useEffect, useState } from "react";
import { DataType } from "../model/types";
import { ServerConnection } from "./ServerConnection";
import { ServerGeneration } from "./ServerGeneration";
import { fetchServerWakeUp } from "../utils/fetchServer";
import { Typography } from "@mui/material";
import LightbulbIcon from '@mui/icons-material/Lightbulb';

type SetDatasType = {
    datas: DataType[] | undefined;
    setDatas: (datas: DataType[] | undefined) => void;
}

export const ServerComputing: React.FC<SetDatasType> = ({ datas, setDatas }) => {
    const [serverAreaSize, setServerAreaSize] = useState<number>();
    const [initialAlives, setInitialAlives] = useState<number>();
    const [serverResponse, setServerResponse] = useState<string>();
    const [serverError, setServerError] = useState<string>();
    const [countdown, setCountdown] = useState<number>(60);

    useEffect(() => {
        const wakeUp = async () => {
            setServerResponse('');
            setServerError('');
            try {
                const response = await fetchServerWakeUp();
                setServerResponse(response);
            } catch (e: any) {
                setServerError(e.message);
            }
        }
        wakeUp();
    }, [])

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (countdown > 0 && !serverResponse && !serverError) {
            timer = setInterval(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [countdown])

    return (
        <div className="flex flex-col justify-center items-center">
            <Typography variant="button" gutterBottom sx={{ display: 'block', fontWeight: 'bold' }}>Back-end Calculation</Typography>


            {serverResponse && <div className="flex flex-row text-green-600"><LightbulbIcon />
                <Typography>{serverResponse}</Typography></div>}
            {serverError && <div className="flex flex-row text-red-600"><LightbulbIcon />
                <Typography>{serverError}</Typography></div>}
            {!serverResponse && !serverError && <div className="flex flex-row text-orange-500"><LightbulbIcon />
                <Typography>Wait until the server is awake... {countdown}</Typography></div>}

            <ServerConnection setDatas={setDatas} serverAreaSize={serverAreaSize} setServerAreaSize={setServerAreaSize}
                setInitialAlives={setInitialAlives} />

            {serverAreaSize &&
                <ServerGeneration datas={datas} setDatas={setDatas} serverAreaSize={serverAreaSize} setServerAreaSize={setServerAreaSize}
                    initialAlives={initialAlives!} />
            }

        </div>)
}