import styled from 'styled-components'

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 30%;
  background-color: ${props => props.sideBarBgColor};
  color: ${props => props.textColor};
  
  @media (max-width: 767px){
    display: none;
  }
`
