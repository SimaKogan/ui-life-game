import { List, ListItem, Typography } from "@mui/material"
import { DetailsText } from "../components/DetailsText"
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export const ProjectDetails: React.FC = () => {

    return (
        <div className="flex justify-center items-center w-full flex-col xl:flex-row">
            <section className="flex flex-col sm:w-[600px] items-center">
                <div className="bg-slate-100 shadow-md m-4">
                    <Typography className="p-4 w-full bg-slate-200 flex justify-center">
                        <span className="font-bold">Why am I working on this project?</span>
                    </Typography>
                    <Typography className="p-4">
                        The Game of Life, also known as Conway's Game of Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
                        Of course, over the past 50 years, there has been a considerable amount of research on this topic; the results are presented on various resources, including websites.
                        Researchers typically study cyclical patterns, as shown on the https://conwaylife.com/ website and other similar platforms.
                    </Typography>
                    <Typography className="p-4">
                        In turn, I was particularly interested in exploring the following questions:
                        <List>
                            <ListItem>
                                <CircleOutlinedIcon className="p-2" />
                                Does the percentage of decreasing living cells depend on the size of the grid?
                            </ListItem>
                            <ListItem>
                                <CircleOutlinedIcon className="p-2" />
                                How does the initial number of living cells (e.g., 1/2, 1/3) affect the rate of decrease in the population over time?
                            </ListItem>
                            <ListItem>
                                <CircleOutlinedIcon className="p-2" />
                                What impact do additional processes, such as self-generation or self-destruction of a fixed percentage of living cells, have on the overall behavior of the simulation?
                            </ListItem>
                        </List>
                    </Typography>
                </div>
                <div className="m-4">
                    <Typography className="bg-slate-100 shadow-md p-4">
                        If you're new to the Game or need a refresher on <span className="font-bold">the rules</span>, here's a quick overview.
                        Conway's Game of Life is a cellular automaton that is played on a 2D square grid.
                        Each square (or "cell") on the grid can be either alive or dead, and they evolve according to the following rules:
                        <List>
                            <ListItem>
                                <CircleOutlinedIcon className="p-2" />
                                Any live cell with fewer than two live neighbours dies (referred to as underpopulation).
                            </ListItem>
                            <ListItem>
                                <CircleOutlinedIcon className="p-2" />
                                Any live cell with more than three live neighbours dies (referred to as overpopulation).
                            </ListItem>
                            <ListItem>
                                <CircleOutlinedIcon className="p-2" />
                                Any live cell with two or three live neighbours lives, unchanged, to the next generation.
                            </ListItem>
                            <ListItem>
                                <CircleOutlinedIcon className="p-2" />
                                Any dead cell with exactly three live neighbours comes to life.
                            </ListItem>
                        </List>
                    </Typography>
                </div>
            </section>
            <section className="flex flex-col m-4 sm:w-[600px] items-center">
                <DetailsText />
            </section>
        </div>
    )
}