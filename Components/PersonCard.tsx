import React, { useState } from 'react';
import styled from 'styled-components';
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  border: 1px solid #b6b6b6;
  background-color: white;
  overflow: hidden;
  padding: 20px 40px;
  margin: 40px 0px;
  height: 250px;
  border-radius: 5px;
  box-shadow: 3px 3px whitesmoke;
  transition-duration: 0.5s;
  &:hover {
    transform: scale(1.01);
  }
`;

const StyledName = styled.h2`
  color: #454545;
`;
const StyledBirth = styled.p``;
const StyledId = styled.p``;
const StyledProp = styled.p`
  border-bottom: 1px solid black;
  span {
    font-weight: 700;
  }
`;
const StyledEmail = styled.p`
  color: gray;
  font-size: 12px;
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
}

export const PersonCard = ({ ...props }: PersonProps) => {
  return (
    <Wrapper>
      <Header>
        <StyledName>{props.name}</StyledName>
        {props.birth_date && (
          <StyledBirth>
            <span>Født: </span>
            {props.birth_date.replaceAll('-', '.')}
          </StyledBirth>
        )}
      </Header>
      {props.emails && <StyledEmail>{props.emails}</StyledEmail>}

      {props.aliases && (
        <StyledProp>
          <span>Aliaser:</span> {props.aliases}
        </StyledProp>
      )}

      {props.dataset && (
        <StyledProp>
          <span> Tilhørlighet:</span> {props.dataset}
        </StyledProp>
      )}
      {props.countries && (
        <StyledProp>
          <>
            <span>Land: </span>
            {props.countries}
          </>
        </StyledProp>
      )}
      {props.identifiers && (
        <StyledProp>
          <span>Identifisering:</span> {props.identifiers}
        </StyledProp>
      )}
      {props.sanctions && (
        <StyledProp>
          <span>Sanksjoner:</span> {props.sanctions}
        </StyledProp>
      )}
      {props.first_seen && (
        <StyledProp>
          <span>Først sett:</span>{' '}
          {props.first_seen.replaceAll('-', '.').slice(0, -3)}
        </StyledProp>
      )}
      {props.last_seen && (
        <StyledProp>
          <span>Sist sett:</span>{' '}
          {props.last_seen.replaceAll('-', '.').slice(0, -3)}
        </StyledProp>
      )}
    </Wrapper>
  );
};

export default PersonCard;
