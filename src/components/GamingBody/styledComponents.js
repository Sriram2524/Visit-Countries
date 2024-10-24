import styled from 'styled-components'

export const TrendingContainer = styled.div`
  background-color: ${value => value.trendingbackground};
  color: ${value => value.textCon}
  min-height: 100vh;
 
  display: flex;
  flex-direction: column;
`
export const TrendingNav = styled.div`
  background-color: ${value => value.trendingNavBg};
  height: 20vh;
  display: flex;
  align-items: center;
`
export const FireContainer = styled.div`
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
