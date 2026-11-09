import { useEffect, useRef, useState } from "react";
import { fetchServerDelete, fetchServerNext } from "../utils/fetchServer";
import { DataType } from "../model/types";
import { Button } from "@mui/material";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { StatsGrid } from "./StatsGrid";

type ResponseNextProps = {
    generation: number,
    alives: number;
}

type Props = {
    datas: DataType[] | undefined;
    setDatas: (datas: DataType[] | undefined) => void;
    serverAreaSize: number;
    setServerAreaSize: (n: number | undefined) => void;
    initialAlives: number
}

const nf = new Intl.NumberFormat('en-US');

export const ServerGeneration: React.FC<Props> = ({ datas, setDatas, serverAreaSize, setServerAreaSize, initialAlives }) => {
    const matrixTotalSize = serverAreaSize ** 2;
    const [toggleCalculating, setToggleCalculating] = useState<boolean>(false);
    const [errorServerConnection, setErrorServerConnection] = useState<string>('');
    const [startCalculating, setStartCalculating] = useState<boolean>(false);
    const stopped = useRef<boolean>(false);

    const last = datas && datas.length > 0 ? datas[datas.length - 1] : undefined;
    const alives = last ? last.alive : initialAlives;
    const density = matrixTotalSize ? `${((alives / matrixTotalSize) * 100).toFixed(1)}%` : '—';

    async function handleServerComputing() {
        if (!toggleCalculating) return;

        const resp: ResponseNextProps = await fetchServerNext(setErrorServerConnection);
        if (stopped.current) return;

        if (resp.generation === -1 || resp.alives === -1) {
            setToggleCalculating(false);
            return;
        }

        const data: DataType = {
            dataKey: resp.generation.toString(),
            alive: resp.alives,
            dead: matrixTotalSize - resp.alives
        };
        setDatas([...(datas ?? []), data]);
    }

    useEffect(() => {
        handleServerComputing();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datas, toggleCalculating]);

    function handleStop() {
        stopped.current = true;
        setToggleCalculating(false);
        setServerAreaSize(undefined);
        setDatas(undefined);
        fetchServerDelete();
    }

    return (
        <>
            <div className="muted">
                Matrix on server: {serverAreaSize}&times;{serverAreaSize} ({nf.format(matrixTotalSize)} cells)
            </div>

            <StatsGrid
                items={[
                    { label: 'Generation', value: last ? last.dataKey : '0' },
                    { label: 'Alive cells', value: nf.format(alives) },
                    { label: 'Density', value: density },
                ]}
            />

            {errorServerConnection && <div className="alert" role="alert">{errorServerConnection}</div>}

            <div className="btn-row">
                {!startCalculating &&
                    <Button variant="contained" startIcon={<PlayArrowRoundedIcon />}
                        onClick={() => { setStartCalculating(true); setToggleCalculating(true); }}>
                        Start computing
                    </Button>
                }
                {startCalculating && toggleCalculating &&
                    <Button variant="contained" startIcon={<PauseRoundedIcon />}
                        onClick={() => setToggleCalculating(false)}>
                        Pause
                    </Button>
                }
                {startCalculating && !toggleCalculating &&
                    <Button variant="contained" startIcon={<PlayArrowRoundedIcon />}
                        onClick={() => { setErrorServerConnection(''); setToggleCalculating(true); }}>
                        Continue
                    </Button>
                }
                <Button variant="outlined" color="inherit" startIcon={<StopRoundedIcon />} onClick={handleStop}>
                    Stop and reset
                </Button>
            </div>
        </>
    )
}
