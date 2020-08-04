import React from 'react';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toasts from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

  return (
    <Container>
      {messages.map(message => (
        <Toasts
          key={message.id}
          message={message}
        />
      ))}
    </Container>
  )
}

export default ToastContainer;
