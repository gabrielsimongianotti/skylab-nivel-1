import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationError';

import LogoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const fromRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      const schama = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
        password: Yup.string().min(6, 'No mínimo  6 digitos')
      });

      await schama.validate(data, { abortEarly: false })

      await api.post('/users', data);

      addToast({
        type:'success',
        title:'Cadastro realizado',
        description:'faça login',
      });
      history.push('/')

    } catch (err) {
      const errors = getValidationErrors(err);

      fromRef.current?.setErrors(errors);
      addToast({
        type:'error',
        title:'Erro no cadastro',
        description:'o q sera',
      });
    }
  }, [addToast,history],)

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Gobarber" />

          <Form
            ref={fromRef}
            // initialData={{ name: "gabriel", email: "gabrielgianotti@gmail.com", password: "12345678" }}
            onSubmit={handleSubmit}
          >
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/"><FiArrowLeft /> Volta para login</Link>
        </AnimationContainer>
      </Content>

    </Container>
  );
}

export default SignUp;
