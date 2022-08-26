import React, { useState } from 'react';
import styled from 'styled-components';
import PersonCard from './PersonCard';
import People from '../people.json';
import { orderBy } from 'lodash';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 100px;
`;
const PageWrapper = styled.div`
  width: 80%;
  padding: 40px 0;
`;
const Header = styled.div`
  position: fixed;
  background-color: white;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 50px;
  border-bottom: 1px solid gray;
  box-shadow: 1px 5px 20px gray;
  z-index: 10000;
`;
const SearchBar = styled.input`
  border-radius: 5px;
  padding: 10px;
  width: 40%;
`;

const StyledSelect = styled.select`
  height: 40px;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  font-size: 16px;
`;

export const PeopleCollection = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(People);
  const [sort, setSort] = useState<any>();
  const search = (e: any) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = People?.filter((person) => {
        return person.name
          .toLocaleLowerCase()
          .startsWith(keyword.toLowerCase());
      });

      setSearchResult(results);
    } else {
      setSearchResult(People);
    }
    setQuery(keyword);
  };

  const sortedPeople = orderBy(searchResult, 'name', sort).map((person, i) => {
    return (
      <PersonCard
        name={person.name}
        id={person.id}
        aliases={person.aliases}
        sanctions={person.sanctions}
        schema={person.schema}
        countries={person.countries}
        identifiers={person.identifiers}
        birth_date={person.birth_date}
        emails={person.emails}
        dataset={person.dataset}
        first_seen={person.first_seen}
        last_seen={person.last_seen}
      ></PersonCard>
    );
  });

  return (
    <>
      <Header>
        <SearchBar
          type='text'
          placeholder='Søk på navn'
          value={query}
          onChange={search}
        />
        <StyledSelect onChange={(e: any) => setSort(e.target.value)}>
          <option> Sorter </option>
          <option value='asc'>A-Æ</option>
          <option value='desc'>Æ-A</option>
        </StyledSelect>
      </Header>

      <Wrapper>
        <PageWrapper>{sortedPeople}</PageWrapper>
      </Wrapper>
    </>
  );
};

export default PeopleCollection;
