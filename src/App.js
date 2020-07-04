import React, { useState } from "react";
import { Form, Modal, Icon, Item } from "semantic-ui-react";
import { Container, ItemGroup, IconButton, Label } from "./styles/appStyles";
import aImage from "./images/a.jpg";
import bImage from "./images/b.jpg";
/* eslint-disable default-case */

export default () => {
  const MAX_NAME_LENGTH = 15;

  const [openMatchModal, handleMatchModal] = useState(false);
  const [openChangeModal, handleChangeModal] = useState(false);
  const [gameSet, setGameSet] = useState(1);
  const [pontA, setPontA] = useState(0);
  const [pontB, setPontB] = useState(0);
  const [aName, setA] = useState("a");
  const [bName, setB] = useState("b");
  const [horario, setHorario] = useState("");

  const handleStart = () => {
    if (aName.length === 0 || bName.length === 0 || horario.length === 0) {
      return alert("Preencha todos os campos antes de continuar");
    }
    handleMatchModal(false);
  };

  const handleCloseChangeModal = () => {
    handleChangeModal(false);
  };

  const handleChange = (event, { name }) => {
    const value = event.target.value.substring(0, MAX_NAME_LENGTH);
    switch (name) {
      case "equipeA":
        setA(value);
        break;
      case "equipeB":
        setB(value);
        break;
      case "horario":
        setHorario(value);
        break;
      case "pontosA":
        setPontA(value);
        break;
      case "pontosB":
        setPontB(value);
        break;
    }
  };

  return (
    <Container>
      {!openMatchModal && (
        <ItemGroup>
          <h3>Horário da partida: {horario}</h3>
          <h3>Set atual: {gameSet}</h3>
          <Item>
            <Item.Image size="tiny" src={aImage} />
            <Item.Content>
              <Item.Header>Equipe {aName}</Item.Header>
              <Label>Pontos: {pontA}</Label>
              <Label>Game sets ganhos: </Label>
            </Item.Content>
          </Item>
          <Item>
            <Item.Image size="tiny" src={bImage} />
            <Item.Content>
              <Item.Header>Equipe {bName}</Item.Header>
              <Label>Pontos: {pontB}</Label>
              <Label>Game sets ganhos: </Label>
            </Item.Content>
          </Item>
          <IconButton
            floated="right"
            icon={<Icon name="pencil" />}
            onClick={() => handleChangeModal(true)}
          >
            Editar placar
          </IconButton>
        </ItemGroup>
      )}

      <Modal open={openMatchModal} size="tiny">
        <Modal.Header>
          <h2>Insira os dados da partida</h2>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              fluid
              type="text"
              label="Horário"
              name="horario"
              value={horario}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              type="text"
              name="equipeA"
              label="Equipe A"
              value={aName}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              type="text"
              name="equipeB"
              label="Equipe B"
              value={bName}
              onChange={handleChange}
            />

            <Form.Button primary onClick={handleStart}>
              Começar
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Modal open={openChangeModal} size="tiny">
        <Modal.Header>Atualize o placar:</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group>
              <Form.Input
                label={`Pontuação da equipe ${aName}`}
                onChange={handleChange}
                name="pontosA"
                type="number"
                value={pontA}
              />
              <Form.Input
                label={`Pontuação da equipe ${bName}`}
                onChange={handleChange}
                name="pontosB"
                type="number"
                value={pontB}
              />
            </Form.Group>
            <Form.Button primary onClick={handleCloseChangeModal}>
              Salvar e fechar
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    </Container>
  );
};
