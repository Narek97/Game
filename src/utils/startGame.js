import {FREE_BOX, HOME_ID, RABBIT_ID, STONE_ID, WOLF_ID} from "./constants";

const RABBIT_COUNT = 1
const HOME_COUNT = 1

export const startGame = (boxCount = 6, setGameMatrix) => {
    const WOLF_COUNT = Math.ceil(boxCount / 3)
    const STONE_COUNT = boxCount

    let matrix = createMatrixZeros(boxCount)
    placePersonIntoFreeRandomBox(matrix, RABBIT_COUNT, RABBIT_ID)
    placePersonIntoFreeRandomBox(matrix, HOME_COUNT, HOME_ID)
    placePersonIntoFreeRandomBox(matrix, STONE_COUNT, STONE_ID)
    placePersonIntoFreeRandomBox(matrix, WOLF_COUNT, WOLF_ID)
    setGameMatrix(matrix)
}

const createMatrixZeros = (boxCount) => {
    return new Array(boxCount).fill(0).map(() => new Array(boxCount).fill(FREE_BOX))
}

const placePersonIntoFreeRandomBox = (matrix, personCount, ID) => {
    Array(personCount).fill(0).forEach(() => {
        const {X, Y} = getFreeRandomPosition(matrix)
        matrix[X][Y] = ID
    })
}

const getFreeRandomPosition = (matrix) => {
    const X = random(matrix.length)
    const Y = random(matrix.length)
    if (matrix[X][Y] !== FREE_BOX) {
        return getFreeRandomPosition(matrix)
    }
    return {X, Y}
}

const random = max => Math.floor(Math.random() * max)
