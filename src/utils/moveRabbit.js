import {
    CLOSE,
    HOME_WIN_ID,
    RABBIT_ID,
} from "./constants";
import {
    changeFieldWithGivenID,
    getAllMovesCoordinates,
    getBorderPosition,
    getLegalMoves,
    getPersonPosition,
} from "./utils";

export const moveRabbit = (gameMatrix, setGameMatrix, move,) => {
    let gameLength = gameMatrix.length
    let {X, Y} = getPersonPosition(gameMatrix, RABBIT_ID)
    let moves = getAllMovesCoordinates(gameMatrix, X, Y)
    let allMoves = getBorderPosition(moves, gameLength)
    let LegalMoves = getLegalMoves(allMoves, gameMatrix)

    if (LegalMoves[move] !== CLOSE) {
        const {X: newX, Y: newY} = LegalMoves[move]
        changeFieldWithGivenID([HOME_WIN_ID, RABBIT_ID], gameMatrix, {X, Y}, {newX, newY})
    }
    setGameMatrix(positions => [...positions])
}







