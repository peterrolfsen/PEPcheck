import styled from 'styled-components';
import ReactCountryFlag from 'react-country-flag';
import { convertCountryCode } from './PeopleCollection';
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeaderRightSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Wrapper = styled.div`
  border: 1px solid #b6b6b6;
  background-color: white;
  overflow: hidden;
  padding: 20px 40px;
  margin: 40px 0px;
  min-height: 250px;
  border-radius: 20px;
  box-shadow: 3px 3px whitesmoke;
  transition-duration: 0.5s;
  &:hover {
    transform: scale(1.01);
  }
`;

const StyledName = styled.h2`
  color: #696967;
  font-size: 35px;
  @media (max-width: 768px) {
    font-size: 25px;
    margin: 0;
  }
`;
const StyledBirth = styled.p`
  color: gray;
  margin: 0;
`;
const StyledProp = styled.p`
  border-bottom: 1px solid grey;
  width: 60%;
  span {
    font-weight: 700;
  }
  @media (max-width: 768px) {
    font-size: 15px;
    width: 100%;
  }
`;

const StyledCountry = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
`;
const StyledContact = styled.p`
  color: gray;
  font-size: 12px;
`;

const InfoBlock = styled.div``;

const InfoBody = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

interface PersonProps {
  name: string;
  id: string;
  schema?: string;
  aliases?: string;
  birth_date?: string;
  countries?: string;
  identifiers?: string;
  sanctions?: string;
  phones?: string;
  emails?: string;
  dataset?: string;
  last_seen?: string;
  first_seen?: string;
  addresses?: string;
}

export const PersonCard = ({
  name,
  id,
  aliases,
  birth_date,
  countries,
  identifiers,
  sanctions,
  phones,
  emails,
  dataset,
  last_seen,
  first_seen,
  addresses,
}: PersonProps) => {
  return (
    <Wrapper>
      <Header>
        <div>
          <StyledName>{name}</StyledName>
          {emails && <StyledContact>{emails}</StyledContact>}
          {phones && <StyledContact>{phones}</StyledContact>}
        </div>
        <HeaderRightSide>
          {birth_date && (
            <StyledBirth>
              <span>Født: </span>
              {birth_date.replaceAll('-', '.')}
            </StyledBirth>
          )}
          {countries && (
            <StyledCountry>
              <>
                <ReactCountryFlag countryCode={countries?.toUpperCase()} />
                <p>{convertCountryCode(countries.toUpperCase())}</p>
              </>
            </StyledCountry>
          )}
        </HeaderRightSide>
      </Header>
      <InfoBody>
        <InfoBlock>
          {aliases && (
            <StyledProp>
              <span>Aliaser:</span> {aliases}
            </StyledProp>
          )}

          {dataset && (
            <StyledProp>
              <span> Tilhørlighet:</span> {dataset.replaceAll(';', ', ')}
            </StyledProp>
          )}
          {addresses && (
            <StyledProp>
              <span> Addresse:</span> {addresses}
            </StyledProp>
          )}
          {id && (
            <StyledProp>
              <span>ID:</span> {id}
            </StyledProp>
          )}
        </InfoBlock>
        <InfoBlock>
          {identifiers && (
            <StyledProp>
              <span>Identifisering:</span> {identifiers}
            </StyledProp>
          )}
          {sanctions && (
            <StyledProp>
              <span>Sanksjoner:</span> {sanctions}
            </StyledProp>
          )}
          {first_seen && (
            <StyledProp>
              <span>Først sett:</span>{' '}
              {first_seen.replaceAll('-', '.').slice(0, -3)}
            </StyledProp>
          )}
          {last_seen && (
            <StyledProp>
              <span>Sist sett:</span>{' '}
              {last_seen.replaceAll('-', '.').slice(0, -3)}
            </StyledProp>
          )}
        </InfoBlock>
      </InfoBody>
    </Wrapper>
  );
};

export default PersonCard;
