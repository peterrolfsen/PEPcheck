import { useState } from 'react';
import styled from 'styled-components';
import PersonCard from './PersonCard';
import People from '../people.json';
import { orderBy } from 'lodash';
import StaccLogo from '../stacc-logo.png';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 150px 0px;
`;
const PageWrapper = styled.div`
  width: 50%;
`;
const Header = styled.div`
  position: fixed;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 50px 0px;
  border-bottom: 1px solid gray;
  box-shadow: 1px 5px 20px gray;
  z-index: 10000;
`;
const SearchBar = styled.input`
  border-radius: 5px;
  padding: 10px;
  width: 50%;
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
const Logo = styled.img`
  height: 50px;
`;

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
//konverterer regionskoden med navnet til landet
export function convertCountryCode(s: string) {
  try {
    return regionNames.of(s.toUpperCase());
  } catch (e) {
    if (e instanceof RangeError) {
      //handle RangeError
    }
  }
}

export const PeopleCollection = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(People);
  const [sort, setSort] = useState<any>();

  //søkefunksjon
  const search = (e: any) => {
    //Tar inn et nøkkelord i søkefeltet
    const keyword = e.target.value;
    if (keyword !== '') {
      //filtrer på navnene til personene i listeb om det som skrives i søkefeltet matcher
      const results = People?.filter((person) => {
        let country;
        person.countries && (country = convertCountryCode(person.countries));

        return (
          person.name.toLocaleLowerCase().startsWith(keyword.toLowerCase()) ||
          country?.toLocaleLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      //setter resultatet av søket til å være searchResult
      setSearchResult(results);
    } else {
      setSearchResult(People);
    }
    setQuery(keyword);
  };
  //Finner alle personene som er i listen searchResult.
  //Sender inn props til PersonCard komponenten
  //Sorterer også listen alfabetisk
  const sortedPeople = orderBy(searchResult, 'name', sort).map((person) => {
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
        addresses={person.addresses}
        phones={person.phones}
      ></PersonCard>
    );
  });

  return (
    <>
      <Header>
        <Logo src={StaccLogo} alt='stacc' />
        <SearchBar
          type='text'
          placeholder='Søk på navn eller land'
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
