import {
    CLOSE,
    FREE_BOX,
    HOME_ID,
    HOME_WIN_ID,
    RABBIT_ID,
    STONE_ID,
    WOLF_ID
} from "./constants";
import {moveRabbit} from "./moveRabbit";
import {moveWoolf} from "./moveWolf";

export const movePerson = (gameMatrix, STEP_UP) => {
    if (getPersonPosition(gameMatrix, RABBIT_ID).X !== null
    ) {
        moveRabbit(gameMatrix, STEP_UP)
        return moveWoolf(gameMatrix)
    }
    return gameMatrix
}

export const getPersonPosition = (gameMatrix, ID) => {
    let X = null, Y = null, posX = 0
    while (posX < gameMatrix.length) {
        let posY = gameMatrix[posX].indexOf(ID)
        if (posY !== -1) {
            return {X: posX, Y: posY}
        }
        posX++
    }
    return {X, Y}
}

export const getAllMovesCoordinates = (gameMatrix, X, Y) => {
    return [{X: X - 1, Y}, {X, Y: Y + 1}, {X: X + 1, Y}, {X, Y: Y - 1}]
}

export const getBorderPosition = (allMoves, MaxLength, ID) =>
    allMoves.map((el, ind) => {
        if (el.X >= 0 && el.X < MaxLength && el.Y >= 0 && el.Y < MaxLength) {
            return el
        }
        if (ID === WOLF_ID) {
            return []
        }
        return getNewBorderPosition(el, ind, MaxLength)
    })

const getNewBorderPosition = (el, ind, MaxLength) => {
    const OLL_POSITION = [
        {X: MaxLength - 1, Y: el.Y},
        {X: el.X, Y: 0},
        {X: 0, Y: el.Y},
        {X: el.X, Y: MaxLength - 1}
    ]
    return OLL_POSITION[ind]
}

export const getLegalMoves = (allMoves, gameMatrix, ID) => {
    for (let i = 0; i < allMoves.length; i++) {
        if (allMoves[i].length === 0
            || isClosePosition(gameMatrix[allMoves[i].X][allMoves[i].Y], ID)
        ) {
            allMoves[i] = CLOSE
        }
    }
    return allMoves
}

const isClosePosition = (position, ID) => {
    const CLOSE_POSITION = [STONE_ID, WOLF_ID, HOME_WIN_ID, ID]
    return CLOSE_POSITION.some(pos => pos === position)
}

export const changeFieldWithGivenID = (ID, gameMatrix, oldPos, newPos) => {

    gameMatrix[oldPos.X][oldPos.Y] = FREE_BOX
    isGameEnd(newPos, gameMatrix) ?
        gameMatrix[newPos.newX][newPos.newY] = ID[0]
        : gameMatrix[newPos.newX][newPos.newY] = ID[1]

}

const isGameEnd = (pos, gameMatrix) => {
    const {newX, newY} = pos

    return (newX === undefined || gameMatrix[newX][newY] === HOME_ID || gameMatrix[newX][newY] === RABBIT_ID)
}

