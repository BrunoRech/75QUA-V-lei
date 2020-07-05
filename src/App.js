/* eslint-disable default-case */
import React, { useState } from "react";
import { Form, Modal, Icon, Item, Button } from "semantic-ui-react";
import { Container, ItemGroup, LogContainer, Label } from "./styles/appStyles";
import aImage from "./images/a.jpg";
import bImage from "./images/b.jpg";
import { checkPoints, checkVictory } from "./functions/game";

export default () => {
  const MAX_NAME_LENGTH = 15;

  const [matchLog, setLog] = useState([]);
  const [openMatchVictoryModal, handleMatchVictoyModal] = useState(false);
  const [openSetConfirmationModal, handleSetConfirmationModal] = useState(
    false
  );
  const [response, setResponse] = useState(null);
  const [openMatchModal, handleMatchModal] = useState(true);
  const [openChangeModal, handleChangeModal] = useState(false);
  const [gameSet, setGameSet] = useState(1);
  const [gameSetA, setGameSetA] = useState(0);
  const [gameSetB, setGameSetB] = useState(0);
  const [gameWinner, setGameWinner] = useState("");
  const [pontA, setPontA] = useState(0);
  const [pontB, setPontB] = useState(0);
  const [aName, setA] = useState("");
  const [bName, setB] = useState("");
  const [horario, setHorario] = useState("");

  const handleStart = () => {
    if (aName.length === 0 || bName.length === 0 || horario.length === 0) {
      return alert("Preencha todos os campos antes de continuar");
    }
    handleMatchModal(false);
  };

  const handleCloseChangeModal = () => {
    handleChangeModal(false);
    const data = checkPoints(pontA, pontB, gameSet);
    if (data) {
      setResponse(data);
      handleSetConfirmationModal(true);
    }
  };

  const handleNextGameSet = () => {
    setGameSet(gameSet + 1);
    const { winner } = response;
    let gameWinner;
    if (winner === "A") {
      setLog([
        ...matchLog,
        { winner: aName, winnerPoints: pontA, loserPoints: pontB },
      ]);
      gameWinner = checkVictory(gameSetA + 1, gameSetB);
      setGameSetA(gameSetA + 1);
    } else if (winner === "B") {
      setLog([
        ...matchLog,
        { winner: bName, winnerPoints: pontB, loserPoints: pontA },
      ]);
      gameWinner = checkVictory(gameSetA, gameSetB + 1);
      setGameSetB(gameSetB + 1);
    }
    setPontA(0);
    setPontB(0);
    handleSetConfirmationModal(false);
    if(gameWinner){
      setGameWinner(gameWinner === "A" ? aName : bName);
      handleMatchVictoyModal(true);
    }
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
        <>
          <ItemGroup>
            <h3>Horário da partida: {horario}</h3>
            <h3>Set atual: {gameSet}</h3>
            <Item>
              <Item.Image size="tiny" src={aImage} />
              <Item.Content>
                <Item.Header>Equipe A: {aName}</Item.Header>
                <Label>Pontos: {pontA}</Label>
                <Label>Game sets ganhos: {gameSetA}</Label>
              </Item.Content>
            </Item>
            <Item>
              <Item.Image size="tiny" src={bImage} />
              <Item.Content>
                <Item.Header>Equipe B: {bName}</Item.Header>
                <Label>Pontos: {pontB}</Label>
                <Label>Game sets ganhos: {gameSetB}</Label>
              </Item.Content>
            </Item>
            <Button
              primary
              floated="right"
              onClick={() => handleChangeModal(true)}
            >
              Editar placar
            </Button>
          </ItemGroup>
          <LogContainer>
            <Label>
              Log dos vencedores do game set da partida entre {aName} e {bName}:
            </Label>
            {matchLog.map(({ winner, winnerPoints, loserPoints }) => (
              <Label>
                Vencedor: {winner}, placar: {winnerPoints} x {loserPoints}
              </Label>
            ))}
          </LogContainer>
        </>
      )}

      <Modal open={openMatchVictoryModal} size="tiny">
        <Modal.Header>
          Vencedor da partida: {gameWinner}
        </Modal.Header>
      </Modal>

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
            <Button primary onClick={handleCloseChangeModal}>
              Salvar e fechar
            </Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Modal open={openSetConfirmationModal} size="tiny">
        <Modal.Header>Confime o início do próximo set</Modal.Header>
        <Modal.Content>
          <Button onClick={handleNextGameSet} primary fluid>
            Avançar para o próximo set
          </Button>
        </Modal.Content>
      </Modal>
    </Container>
  );
};
