import {CLOSE, FAR_AWAY, HOME_ID, RABBIT_ID, RIP, WOLF_ID} from "./constants";
import {
    changeFieldWithGivenID,
    getAllMovesCoordinates,
    getBorderPosition,
    getLegalMoves,
    getPersonPosition
} from "./utils";

export const moveWoolf = (gameMatrix) => {
    const copeMatrix = gameMatrix.map(arr => arr.slice());
    const RabbitCoordinates = getPersonPosition(gameMatrix, RABBIT_ID)
    gameMatrix.forEach((el, X) => el.forEach((wolf, Y) => {
        if (wolf === WOLF_ID) {
            const moves = getAllMovesCoordinates(copeMatrix, X, Y)
            const allMoves = getBorderPosition(moves, copeMatrix.length, WOLF_ID)
            const LegalMoves = getLegalMoves(allMoves, copeMatrix, HOME_ID)
            const shortWay = getMostShortestWay(LegalMoves, RabbitCoordinates)
            const {X: newX, Y: newY} = shortWay
            newX !== undefined &&
            changeFieldWithGivenID([RIP, WOLF_ID], copeMatrix, {X, Y}, {newX, newY})
        }
    }))
    return copeMatrix
}

const getMostShortestWay = (wolfCoordinates, rabbitCoordinate) => {

    const distances = []
    const {X, Y} = rabbitCoordinate
    wolfCoordinates.forEach(el => {
        el === CLOSE ?
            distances.push(FAR_AWAY)
            : distances.push(
            Math.sqrt(Math.pow(Math.abs((el.X - X)), 2)
                + Math.pow(Math.abs((el.Y - Y)), 2))
            )
    })

    const shortDistanceIndex = distances.reduce((minValueIndex, v, i) => {
        if (v < distances[minValueIndex]) {
            return i
        }
        return minValueIndex
    }, 0);

    return wolfCoordinates[shortDistanceIndex]

    // return distances.indexOf(Math.min.apply(null, distances))
}

