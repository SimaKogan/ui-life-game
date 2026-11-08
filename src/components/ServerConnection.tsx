import { fetchServerInit } from "../utils/fetchServer";
import { Button, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { DataType } from "../model/types";

type ResponseInitProps = {
    message: string;
    areaSize: number;
    alives: number;
}

type Props = {
    setDatas: (datas: DataType[]) => void;
    serverAreaSize: number | undefined;
    setServerAreaSize: (n: number | undefined) => void;
    setInitialAlives: (n: number) => void;
}

export const ServerConnection: React.FC<Props> = ({ setDatas, serverAreaSize, setServerAreaSize, setInitialAlives }) => {
    const [tmpAreaSize, setTmpAreaSize] = useState<number>();
    const [errorServerConnection, setErrorServerConnection] = useState<string>('');

    async function handleServerConnection() {
        setDatas([]);
        setErrorServerConnection('');
        const serverInit: ResponseInitProps | null = await fetchServerInit({ areaSize: tmpAreaSize!, setErrorServerConnection });
        console.log("serverInit: ", serverInit);
        if (serverInit && typeof serverInit.areaSize === 'number' && serverInit.areaSize > 0) {
            const areaSize_2: number = serverInit.areaSize ** 2;
            setServerAreaSize(serverInit.areaSize);
            const data: DataType = {
                dataKey: "0",
                alive: serverInit.alives,
                dead: areaSize_2 - serverInit.alives
            };
            setDatas([data]);
            setInitialAlives(serverInit.alives);
        } else {
            console.error("confirmed matrix size is not a suitable number");
            setServerAreaSize(undefined);
        }
    }

    return (
        <>
            {!serverAreaSize && 
            <>
            <Typography variant="subtitle2" gutterBottom>Input game area for server computig, cells</Typography>
            <TextField id="standard-basic" label="[10 - 1'000]"
                value={tmpAreaSize}
                variant="standard"
                onChange={e => {
                    if (!isNaN(Number(e.target.value))) {
                        const value = e.target.value.replace('-', '').replace(/\./g, '');
                        setTmpAreaSize(Number(value))
                    }
                }} />
                </>}

            {tmpAreaSize && !serverAreaSize
                && <Button onClick={() => handleServerConnection()}
                    variant="contained"
                    sx={{ fontSize: '16px', backgroundColor: 'green', margin: '10px' }}
                    endIcon={<SendIcon />}>
                    Initialize matrix on server
                </Button>
            }
            {errorServerConnection && <Typography style={{ color: 'red' }}>{errorServerConnection}</Typography>}
        </>
    )
}