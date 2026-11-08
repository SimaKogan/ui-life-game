import config from '../config/default-config.json'

type Props = {
    cells: number[];
    defaultCellWith?: number;
}

const Row: React.FC<Props> = ({cells, defaultCellWith}) => {
    const minSellSize = config["min-cell-size"];
    let cellSize = `${minSellSize}px`;

    const calculateCellWith = defaultCellWith? defaultCellWith : 
                Math.min(window.innerHeight * 0.9 , window.innerWidth) / cells.length ;

    if(calculateCellWith > minSellSize) {
        cellSize = `${calculateCellWith}px`;
    }

    function getCells() {
        return cells.map((cell, index) => <div key={index} style={getStyles(cell)}></div>)
    }

    function getStyles(cell: number): React.CSSProperties {
        return cell == 0 ? {
            backgroundColor:  '#e2e8f0',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'white',
            height: cellSize,
            width: cellSize
        }  : {
            backgroundColor: 'black',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'lightslategray',
            height: cellSize,
            width: cellSize
        }        
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {getCells()}
        </div>
    )

}

export default Row;