import { Button, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import io from "socket.io-client";

let socket;

function Chat() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [inRoom, setInRoom] = useState(false);
  const ENDPOINT = 'localhost:5000';

  const onJoin = () => {
    if (name !== '') {
      setInRoom(true);
      socket = io(ENDPOINT);
      socket.emit('join', name);
      setMessages(['joined']);
      socket.on('message', (message) => {
        setMessages((messages) => [...messages, message]);
      });
      socket.on('status', ({room}) => {
        setMessages((messages) => [...messages, {user: 'admin', text: `current room is ${room}`}]);
      });
      socket.on('leave', () => {
        socket.disconnect();
        setInRoom(false);
      });
    }
  }

  const onEnterMessage = (event) => {
    if (event.key === 'Enter') {
      socket.emit('sendMessage', event.target.value, (responce) => console.log('Done emmiting'));
      event.target.value = '';
      if (socket === undefined) {
        setMessages((messages) => [...messages, {user: 'admin', text: 'you must join a room'}]);
      }
    }
  }

  return (
    <>
      { !inRoom &&
        <>
          <Row>
          <Col sm={9}>
          <TextField label={'Name'} variant="outlined"
            onChange={(event) => setName(event.target.value)}/>
          </Col>
            <Col sm={3} style={{alignItems: 'center'}}>
              <Button onClick={onJoin}>AutoJoin</Button>
            </Col>
            <Col sm={3} style={{alignItems: 'center'}}>
              <Button onClick={onJoin}>Join</Button>
            </Col>
          </Row>
        </>
      }
      <Container>
        <Row>
          <Typography variant={"body1"}>placeholder</Typography>
        </Row>
        {messages.map((item) => {
          return(
            <Row>
              <Col sm={3}>
                <Typography variant={"body2"}>{item.user}</Typography>
              </Col>
              <Col sm={9}>
                <Typography variant={"body1"}>{item.text}</Typography>
              </Col>
            </Row>
          )
        })}
        <Row>
          <Col>
            <TextField
              style={{width: '100%'}}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={onEnterMessage}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export { Chat }