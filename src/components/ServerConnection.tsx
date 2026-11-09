import { fetchServerInit } from "../utils/fetchServer";
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { DataType } from "../model/types";

const MIN_SIZE = 10;
const MAX_SIZE = 1000;

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
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorServerConnection, setErrorServerConnection] = useState<string>('');

    const size = Number(value);
    const valid = Number.isInteger(size) && size >= MIN_SIZE && size <= MAX_SIZE;

    async function handleServerConnection() {
        setLoading(true);
        setDatas([]);
        setErrorServerConnection('');
        const serverInit: ResponseInitProps | null = await fetchServerInit({ areaSize: size, setErrorServerConnection });
        setLoading(false);
        if (serverInit && typeof serverInit.areaSize === 'number' && serverInit.areaSize > 0) {
            const total: number = serverInit.areaSize ** 2;
            setServerAreaSize(serverInit.areaSize);
            setDatas([{ dataKey: "0", alive: serverInit.alives, dead: total - serverInit.alives }]);
            setInitialAlives(serverInit.alives);
        } else {
            setServerAreaSize(undefined);
        }
    }

    if (serverAreaSize !== undefined) return null;

    return (
        <div className="group">
            <TextField
                label="Matrix size, cells"
                helperText={`Integer from ${MIN_SIZE} to ${MAX_SIZE.toLocaleString('en-US')}`}
                value={value}
                size="small"
                fullWidth
                error={value !== '' && !valid}
                inputProps={{ inputMode: 'numeric' }}
                onChange={e => setValue(e.target.value.replace(/\D/g, '').slice(0, 4))}
            />
            <Button
                variant="contained"
                disabled={!valid || loading}
                onClick={handleServerConnection}
                endIcon={<SendIcon />}>
                {loading ? 'Initializing…' : 'Initialize matrix on server'}
            </Button>
            {errorServerConnection && <div className="alert" role="alert">{errorServerConnection}</div>}
        </div>
    )
}
