import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Button from '../Button';

import { Overlay, Container, Footer } from './styles';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Tem certeza que deseja remover o contato ”Vinícius Lucena”?</h1>
        <p>Esta ação não poderá ser desfeita!</p>

        <Footer>
          <button type="button" className="cancel-button">Cancelar</button>
          <Button type="button" danger={danger}>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
