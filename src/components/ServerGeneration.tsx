import { useEffect, useState } from "react";
import { fetchServerNext } from "../utils/fetchServer";
import { DataType } from "../model/types";
import { Button, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';

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

export const ServerGeneration: React.FC<Props> = ({ datas, setDatas, serverAreaSize, setServerAreaSize, initialAlives }) => {
    const matrixTotalSize = serverAreaSize ** 2;
    const [toggleCalculating, setToggleCalculating] = useState<boolean>(false);
    const [errorServerConnection, setErrorServerConnection] = useState<string>('');

    const [startCalculating, setStartCalculating] = useState<boolean>(false);
    const [flPause, setFlPause] = useState<boolean>(false);

    async function handleServerComputing() {
        if (toggleCalculating) {

            const resp: ResponseNextProps = await fetchServerNext(setErrorServerConnection);

            if (resp.generation === -1 || resp.alives === -1) {
                console.error("Failed to fetch next generation");
                return;
            }

            const data: DataType = {
                dataKey: resp.generation.toString(),
                alive: resp.alives,
                dead: matrixTotalSize - resp.alives
            };
            setDatas([...datas!, (data)]);
        }
    }

    useEffect(() => {
        const pushData = async () => {
            await handleServerComputing();
        }

        pushData();
    }, [datas, toggleCalculating]);

    return (
        <>
            <Typography>
                Life matrix initialized on server: {serverAreaSize}&times;{serverAreaSize}, <br />
                initial alives: {initialAlives} of {matrixTotalSize} cells
            </Typography>
            {errorServerConnection && <Typography style={{ color: 'red' }}>{errorServerConnection}</Typography>}


            {!startCalculating && <Button onClick={() => {
                setStartCalculating(true);
                setToggleCalculating(true);
                handleServerComputing();

            }}
                variant="contained"
                sx={{ fontSize: '16px', backgroundColor: 'lightgreen', margin: '10px' }}
                endIcon={<PlayCircleOutlineIcon />}>
                Start computing on server
            </Button>
            }

            {startCalculating && !flPause && <Button variant="contained"
                style={{ fontSize: '16px', backgroundColor: 'lightsalmon', margin: "10px" }}
                onClick={() => {
                    setFlPause(true);
                    setToggleCalculating(false);

                }}
                endIcon={<PauseCircleOutlinedIcon />}>
                Pause the computing
            </Button>
            }

            {flPause && <Button variant="contained"
                style={{ fontSize: '16px', backgroundColor: 'olivedrab', margin: "10px" }}
                onClick={() => {
                    setFlPause(false);
                    setToggleCalculating(true);
                }}
                endIcon={<NotStartedOutlinedIcon />}>
                Continue the computing
            </Button>
            }

            {(toggleCalculating || flPause) &&
                <Button onClick={() => {
                    setToggleCalculating(false);
                    setServerAreaSize(undefined);
                    setTimeout(() => setDatas(undefined), 500);
                    
                }
                }
                    variant="contained"
                    sx={{ fontSize: '16px', backgroundColor: 'violet', margin: '10px' }}
                    endIcon={<StopCircleOutlinedIcon />}>
                    Stop server computing
                </Button>}
        </>
    )

}