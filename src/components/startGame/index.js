import React, {useEffect, useState} from 'react';
import * as Styled from './styled'
import {startGame} from "../../utils/startGame";
import {Frame} from "../frame";

export const StartGame = () => {

    const DEFAULT_COUNT = 6
    const [isStart, setIsStart] = useState(false)
    const [gameMatrix, setGameMatrix] = useState([[]])
    const [count, setCount] = useState(DEFAULT_COUNT)
    useEffect(() => {
        startGame(count, setGameMatrix)
    }, [count, isStart])

    return (
        <Styled.Div>
            {
                isStart
                    ? <div>
                        <Styled.Button onClick={() => setIsStart(false)}>Close</Styled.Button>
                        <Frame gameMatrix={gameMatrix} setGameMatrix={setGameMatrix}/>
                    </div>
                    : <div>
                        <select onChange={e => setCount(+e.target.value)} defaultValue={6}>
                            <option value={6} disabled hidden>Box count</option>
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
                        </select>
                        <Styled.Button
                            onClick={() => setIsStart(true)}>Start
                        </Styled.Button>
                    </div>
            }
        </Styled.Div>
    );
};


