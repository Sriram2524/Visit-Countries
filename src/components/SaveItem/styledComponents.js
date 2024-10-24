import styled from 'styled-components'

export const SaveContainer = styled.div`
  background-color: ${value => value.trendingbackground};
  color: ${value => value.textCon}
  min-height: 100vh;
 
  display: flex;
  flex-direction: column;
`
export const SaveNav = styled.div`
  background-color: ${value => value.trendingNavBg};
  height: 20vh;
  display: flex;
  align-items: center;
`
export const SaveContaine = styled.div`
  padding: 15px;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: flex;
  margin-right: 15px;
   margin-left: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${value => value.fireContainerBg};
`
