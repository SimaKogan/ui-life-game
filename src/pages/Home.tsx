import { List, ListItem, Typography } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { Life } from "../components/Life";
import default_config from '../config/default-config.json'
import pattern_config from '../config/pattern-config.json'

export const Home: React.FC = () => {
    const gameTicInterval: number = default_config["game-tic-interval"];
    const defaultCellWith: number = pattern_config.octagon.defaultCellWith;

    return (
        <div className="flex justify-center items-center w-full h-full flex-col xl:flex-row">
            <section className="flex flex-col sm:w-[600px] items-center">
                <Life areaSize={"octagon"} gameTicInterval={gameTicInterval} defaultCellWith={defaultCellWith} />
                <div className="m-4">
                    <Typography className="bg-orange-100 shadow-md p-4">
                        This website is dedicated to the study of certain aspects of the <span className="font-bold">Conway's Game of Life</span> cellular automaton.
                        The website features two interactive sections:
                        <List>
                            <ListItem sx={{ display: 'inline-block' }}>
                                <CircleIcon className="p-2" />
                                <span className="font-bold">Front-end Calculation</span> - This section displays the game grid, which can vary in size from <span className="font-bold">10x10</span> to <span className="font-bold">100x100</span> cells.
                                Users can observe the progression of the game on the grid, with initial conditions set by the user.
                            </ListItem>
                            <ListItem sx={{ display: 'inline-block' }}>
                                <CircleIcon className="p-2" />
                                <span className="font-bold">Back-end Calculation</span> - This section shows a graph plotting the number of living cells over the course of several generations.
                                The initial grid can be set anywhere from <span className="font-bold">10x10</span> to <span className="font-bold">1'000x1'000</span> cells, corresponding to anywhere between 100 and 1'000'000 cells. The calculations for each generation are carried out on the server.
                            </ListItem>
                        </List>
                        In both sections, the maximum number of cells is limited due to performance constraints (the site server is hosted on a free tariff plan).
                    </Typography>
                </div>
            </section>
        </div>
    )
}