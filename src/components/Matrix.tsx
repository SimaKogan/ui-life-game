import Row from "./Row"

type Props = {
    lifeArray: number[][];
    defaultCellWith?: number;
}
const Matrix: React.FC<Props> = ({ lifeArray, defaultCellWith }) => {

    function getMatrix() {
        return lifeArray.map((row, index) =>
            <Row key={index} cells={row} defaultCellWith={defaultCellWith} />)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {getMatrix()}
        </div>
    )

}

export default Matrix;