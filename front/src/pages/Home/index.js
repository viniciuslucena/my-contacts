import { Link } from 'react-router-dom';

import {
  Card, Container, Header, ListContainer, InputSearchContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import thrash from '../../assets/images/icons/thrash.svg';
import edit from '../../assets/images/icons/edit.svg';

export default function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>3 Contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Ordenar por nome" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Vinicius Lucena</strong>
              <small>instagram</small>
            </div>
            <span>vinicius@gmail.com</span>
            <span>(81) 99999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="Editar Contato" />
            </Link>
            <button type="button">
              <img src={thrash} alt="Deletar Contato" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
