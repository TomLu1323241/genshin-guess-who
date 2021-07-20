import { Col, Container, Row } from "react-bootstrap";
import { CharacterCard } from "./CharacterCard";
import { Chat } from "./Chat";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { return images[item.replace('./', '')] = r(item); });
  return images;
}

function CardList() {
  const images = importAll(require.context('../images/', false, /\.(png|jpe?g|svg)$/));
  let rowContent = [];
  const row = [];
  let counter = 0;
  for (const [key, value] of Object.entries(images)) {
    counter++;
    rowContent.push(
      <Col style={{ paddingLeft: 5, paddingRight: 5, justifyContent: 'center', margin: 5 }}>
        <CharacterCard key={key} index={key} image={value.default}/>
      </Col>
    );
    if (counter === 6) {
      row.push(<Row style={{ paddingBottom: 5, paddingTop: 5, justifyContent: 'center' }}>{rowContent}</Row>);
      rowContent = [];
      counter = 0;
    }
  }

  return(
    <>
      <Container>
        <Row>
          <Col sm={7}>
            {row}
          </Col>
          <Col sm={5} style={{ paddingBottom: 10, paddingTop: 10}}>
            <Chat />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { CardList }