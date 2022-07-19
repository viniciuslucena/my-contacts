import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import {
  Card, Container, Header, InputSearchContainer, ListHeader,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import thrash from '../../assets/images/icons/thrash.svg';
import edit from '../../assets/images/icons/edit.svg';
import formatPhone from '../../utils/formatPhone';

import Loader from '../../components/Loader';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => (contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())))), [searchTerm, contacts]);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const response = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);
        const json = await response.json();
        setContacts(json);
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input value={searchTerm} type="text" placeholder="Pesquise pelo nome..." onChange={(event) => handleChangeSearchTerm(event)} />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <img src={arrow} alt="Ordenar por nome" />
        </button>
      </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
              <small>{contact.category_name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Editar Contato" />
            </Link>
            <button type="button">
              <img src={thrash} alt="Deletar Contato" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
