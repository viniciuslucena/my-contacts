import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  Card, Container, Header, ListContainer, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import thrash from '../../assets/images/icons/thrash.svg';
import edit from '../../assets/images/icons/edit.svg';
import formatPhone from '../../utils/formatPhone';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then((response) => response.json())
      .then((response) => {
        setContacts(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {' '}
          Contatos
        </strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Ordenar por nome" />
          </button>
        </header>

        {contacts.map((contact) => (
          <Card>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                <small>{contact.category_name}</small>
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
      </ListContainer>
    </Container>
  );
}
