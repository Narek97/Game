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

export const moveRabbit = (gameMatrix, move) => {
    let gameLength = gameMatrix.length
    const {X, Y} = getPersonPosition(gameMatrix, RABBIT_ID)
    const moves = getAllMovesCoordinates(gameMatrix, X, Y)
    const allMoves = getBorderPosition(moves, gameLength)
    const LegalMoves = getLegalMoves(allMoves, gameMatrix)
    if (LegalMoves[move] !== CLOSE) {
        const {X: newX, Y: newY} = LegalMoves[move]
        changeFieldWithGivenID([HOME_WIN_ID, RABBIT_ID], gameMatrix, {X, Y}, {newX, newY})
    }
}







