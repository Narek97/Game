import React, {useEffect} from 'react';
import * as Styled from './styled'
import wolf from '../../img/wolf.png'
import tree from '../../img/pine-tree.png'
import home from '../../img/house.png'
import rabbit from '../../img/rabbit.png'
import homeWin from '../../img/houseWin.png'
import grave from '../../img/grave.png'

import {
    GAME_BORDER_SIZE,
    HOME_ID, HOME_WIN_ID,
    RABBIT_ID, RIP,
    STEP_DOWN, STEP_LEFT,
    STEP_RIGHT,
    STEP_UP,
    STONE_ID,
    WOLF_ID,
} from "../../utils/constants";
import {movePerson} from "../../utils/utils";


export const Frame = ({gameMatrix, setGameMatrix}) => {

    const BOX_SIZE = GAME_BORDER_SIZE / gameMatrix.length
    const Identification = url => <img width={BOX_SIZE - 10} src={url} alt="wolf"/>

    useEffect(() => {

        const checkStepCode = (e) => {
            const CODE = e.code
            const KEYBOARD = {
                "ArrowUp": STEP_UP,
                "ArrowDown": STEP_DOWN,
                "ArrowRight": STEP_RIGHT,
                "ArrowLeft": STEP_LEFT,
            }
            KEYBOARD[CODE] !== undefined && movePerson(gameMatrix, setGameMatrix, KEYBOARD[CODE])
        }
        document.addEventListener("keydown", checkStepCode)
        return () => {
            document.removeEventListener("keydown", checkStepCode);
        };
    }, [gameMatrix, setGameMatrix])

    return (

        <Styled.FrameDiv>
            {
                gameMatrix.map(el => el.map((e, idx) =>
                    <Styled.Box
                        key={idx}
                        width={BOX_SIZE}
                        height={BOX_SIZE}
                    >
                        {e === WOLF_ID && Identification(wolf)}
                        {e === STONE_ID && Identification(tree)}
                        {e === HOME_ID && Identification(home)}
                        {e === RABBIT_ID && Identification(rabbit)}
                        {e === HOME_WIN_ID && Identification(homeWin)}
                        {e === RIP && Identification(grave)}
                    </Styled.Box>
                ))
            }
        </Styled.FrameDiv>
    );
};

