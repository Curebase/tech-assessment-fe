import styled from 'styled-components';
import chevronRight from '../assets/svg/chevron-right.svg'

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 800px;
  height: 61px;
  border-bottom: solid #0C0C0D14;
  border-width: 1px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content : flex-start
  gap: 0px
`

const MainText = styled.p`
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
  color: #0C0C0DE0;
  margin: 0px;
`

const SubText = styled.p`
  font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.4000000059604645px;
  text-align: left;
  color: #0C0C0D7A;
  margin: 0px;
`

const ChevronContainer = styled.img`
  margin-top: 13px;
`

type ListCardProps = {
  mainText: string, 
  subText: string, 
}

export default function ListCard({mainText, subText}: ListCardProps) {
  return (
    <ListContainer>
      <TextContainer>
        <MainText>{mainText}</MainText>
        <SubText>{subText}</SubText>
      </TextContainer>
      <ChevronContainer src={chevronRight} alt='chevron-right' />
    </ListContainer>
  )
}