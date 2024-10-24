import styled from 'styled-components'

export const TrendingContainer = styled.div`
  background-color: ${value => value.trendingbackground};
  color: ${value => value.textCon};
  padding: 20px;
  display: flex;
  flex-direction: column;
`
export const Btn = styled.button`
  background-color: transparent;
  margin-right: 10px;
  border: none;
  cursor: pointer;
  color: ${props => (props.active ? '#2563eb' : '#64748b')} ;
`
