import styled from 'styled-components'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding: 20px;
  width: 100%;
  color: white;
  padding-right: 20px;
  background-color: ${props => props.bgColor};
  height: 15vh;
  width: 100%;
`
