import { useState } from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../FormGroup';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import isEmailValid from '../../utils/isEmailValid';

import { Form, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState([]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setErrors((prevState) => [
        ...prevState,
        { field: 'name', message: 'O nome é obrigatório.' },
      ]);
    } else {
      setErrors((prevState) => [
        prevState.filter((error) => error.field !== 'name'),
      ]);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email');

      if (errorAlreadyExists) {
        return;
      }

      setErrors((prevState) => [
        ...prevState,
        { field: 'email', message: 'E-mail inválido.' },
      ]);
    } else {
      setErrors((prevState) => prevState.filter(
        (error) => error.field !== 'email',
      ));
    }
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          value={name}
          placeholder="Nome"
          onChange={(event) => handleNameChange(event)}
          error={getErrorMessageByFieldName('name')}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          value={email}
          placeholder="E-mail"
          onChange={(event) => handleEmailChange(event)}
          error={getErrorMessageByFieldName('email')}
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={phone}
          placeholder="Telefone"
          onChange={(event) => handlePhoneChange(event)}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={(event) => handleCategoryChange(event)}
          placeholder="Categoria"
        >
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>

        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
