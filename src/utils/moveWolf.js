import {CLOSE, FAR_AWAY, HOME_ID, RABBIT_ID, RIP, WOLF_ID} from "./constants";
import {
    changeFieldWithGivenID,
    getAllMovesCoordinates,
    getBorderPosition,
    getLegalMoves,
    getPersonPosition
} from "./utils";

export const moveWoolf = (gameMatrix, setGameMatrix) => {
    let copeMatrix = gameMatrix.map(arr => arr.slice());
    let RabbitCoordinates = getPersonPosition(gameMatrix, RABBIT_ID)

    gameMatrix.forEach((el, X) => el.forEach((wolf, Y) => {
        if (wolf === WOLF_ID) {
            let moves = getAllMovesCoordinates(copeMatrix, X, Y)
            let allMoves = getBorderPosition(moves, copeMatrix.length, WOLF_ID)
            let LegalMoves = getLegalMoves(allMoves, copeMatrix, HOME_ID)
            let shortWay = getMostShortestWay(LegalMoves, RabbitCoordinates)
            const {X: newX, Y: newY} = LegalMoves[shortWay]
            changeFieldWithGivenID([RIP, WOLF_ID], copeMatrix, {X, Y}, {newX, newY})
        }
    }))
    setGameMatrix(copeMatrix)
}

const getMostShortestWay = (wolfCoordinates, rabbitCoordinate) => {
    const arr = []
    const {X, Y} = rabbitCoordinate
    wolfCoordinates.forEach(el => {
        el === CLOSE ?
            arr.push(FAR_AWAY)
            : arr.push(
            Math.sqrt(Math.pow(Math.abs((el.X - X) * 2 + 1), 2)
                * Math.pow(Math.abs((el.Y - Y) * 2 + 1), 2))
            )

    })
    return arr.indexOf(Math.min.apply(null, arr))
}

