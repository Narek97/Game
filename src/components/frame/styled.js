import styled from 'styled-components'


export const FrameDiv = styled.div`
    width: 600px;
    height: 600px;
    margin: auto;
    margin-top: 10px;
    display: flex;
   
    // justify-content: center;
    flex-wrap: wrap;
    // background: url(https://img.freepik.com/free-photo/close-up-image-of-fresh-spring-green-grass_1232-1655.jpg?size=626&ext=jpg);
    background: url(https://st.depositphotos.com/1830849/1460/i/600/depositphotos_14608355-stock-photo-fresh-snow-texture.jpg);
    background-repeat: no-repeat;
    background-size: cover;
`

export const Box = styled.div`
    text-align: center;
    // border: 1px solid #a9ffa9;
    border: 1px solid #79d0f7;
    box-sizing: border-box;
    padding-top: 5px;
      ${props => ` 
        width: ${props.width}px;
        height: ${props.height}px;
    `}
  
    
}
`
