import {
    CLOSE,
    FREE_BOX,
    HOME_ID,
    HOME_WIN_ID,
    RABBIT_ID, RIP,
    STONE_ID,
    WOLF_ID
} from "./constants";
import {moveRabbit} from "./moveRabbit";
import {moveWoolf} from "./moveWolf";


export const movePerson = (gameMatrix, setGameMatrix, STEP_UP) => {

    if (getPersonPosition(gameMatrix, RIP).X === null
        && getPersonPosition(gameMatrix, HOME_WIN_ID).X === null
    ) {
        moveRabbit(gameMatrix, setGameMatrix, STEP_UP)
        moveWoolf(gameMatrix, setGameMatrix)
    }
}

export const getPersonPosition = (gameMatrix, ID) => {
    let X = null, Y = null
    gameMatrix.forEach((el, posX) => {
        let posY = el.indexOf(ID)
        if (posY !== -1) {
            X = posX
            Y = posY
        }
    })
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
            || gameMatrix[allMoves[i].X][allMoves[i].Y] === STONE_ID
            || gameMatrix[allMoves[i].X][allMoves[i].Y] === WOLF_ID
            || gameMatrix[allMoves[i].X][allMoves[i].Y] === HOME_WIN_ID
            || gameMatrix[allMoves[i].X][allMoves[i].Y] === ID
        ) {
            allMoves[i] = CLOSE
        }
    }
    return allMoves
}

export const changeFieldWithGivenID = (ID, gameMatrix, oldPos, newPos) => {
    gameMatrix[oldPos.X][oldPos.Y] = FREE_BOX
    isGameOver(newPos, gameMatrix) ?
        gameMatrix[newPos.newX][newPos.newY] = ID[0]
        : gameMatrix[newPos.newX][newPos.newY] = ID[1]
}

const isGameOver = (pos, gameMatrix) => {
    let {newX, newY} = pos
    return (gameMatrix[newX][newY] === HOME_ID || gameMatrix[newX][newY] === RABBIT_ID)
}

