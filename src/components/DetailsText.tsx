import { List, ListItem, Typography } from "@mui/material"
import GitHubIcon from '@mui/icons-material/GitHub';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';

export const DetailsText: React.FC = (): JSX.Element => {
    return (
        <div className="w-full">
            <Typography className="bg-orange-200 p-4 flex justify-center">
                <span className="font-bold">Sources and resources:</span>
            </Typography>
            <Typography className="bg-orange-100 p-4">
                <List>
                    <ListItem>
                        <ComputerIcon className="p-1" />
                        https://ui-life-game.onrender.com
                    </ListItem>
                    <ListItem>
                        <StorageIcon className="p-1" />
                        https://server-life-game.onrender.com
                    </ListItem>
                    <ListItem>
                        <GitHubIcon className="p-1" />
                        https://github.com/<wbr />0586534332georgy/<wbr />ui-life-game
                    </ListItem>
                    <ListItem>
                        <GitHubIcon className="p-1" />
                        https://github.com/<wbr />0586534332georgy/<wbr />server-life-game
                    </ListItem>
                </List>
            </Typography>
            <Typography className="bg-orange-100 p-4 flex justify-center">
                <span className="font-bold">API endpoints:</span>
            </Typography>
            <Typography className="bg-orange-100 shadow-md p-4">
                <List>
                    <ListItem>
                        <ul>
                            <li><span className="font-bold">/wakeup</span></li>
                            <li><span className="text-slate-600">HTTP Method:</span> GET</li>
                            <li><span className="text-slate-600">Example:</span> https://server-life-game.onrender.com/<wbr />api/wakeup</li>
                            <li><span className="text-slate-600">Description:</span> This endpoint is used to "wake up" the server. If the server is in a dormant state (asleep),
                                it may take up to 60 seconds to fully initialize and respond.
                                Once the server is awake, it will be ready to handle further requests.

                            </li></ul>
                    </ListItem>
                    <ListItem>
                        <ul>
                            <li><span className="font-bold">/init/<span className="text-slate-600">:NUMBER</span></span></li>
                            <li><span className="text-slate-600">HTTP Method:</span> POST</li>
                            <li><span className="text-slate-600">Example:</span> https://server-life-game.onrender.com/<wbr />api/init/100</li>
                            <li><span className="text-slate-600">Description:</span> Initializes the Game of Life with a matrix of size NUMBER x NUMBER, where NUMBER is an integer between 10 and 1'000.
                                This matrix is populated with random initial states for each cell, either alive or dead, and will evolve according to the rules of Conway's Game of Life.
                            </li></ul>
                    </ListItem>
                    <ListItem>
                        <ul>
                            <li><span className="font-bold">/next</span></li>
                            <li><span className="text-slate-600">HTTP Method:</span> POST</li>
                            <li><span className="text-slate-600">Example:</span> https://server-life-game.onrender.com/<wbr />api/next</li>
                            <li><span className="text-slate-600">Description:</span> Advances the Game of Life to the next generation.
                                This endpoint computes the next state of the matrix based on the current state and applies the rules of Conway's Game of Life.
                                The cells in the matrix will evolve according to their neighbors, and the new state will be returned.</li>
                        </ul>
                    </ListItem>
                </List>
            </Typography>
        </div>
    );
}