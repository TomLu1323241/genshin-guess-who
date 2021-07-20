import { ButtonBase, Paper } from "@material-ui/core";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";

function CharacterCard({index, image}) {
  const [isFlipped, setFlipped] = useState(false);
  const altText = image.split('-')[2].substring(0, image.split('-')[2].indexOf('.'));
  return(
    <>
      <div style={{width: 'fit-content', margin: 'auto'}}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection={'horizontal'}>
          <ButtonBase id={'front '+index} value={index} onClick={(event) => {
            setFlipped(!isFlipped);
          }}>
            <Paper style={{width: 'fit-content', margin: 'auto'}} elevation={3}>
              <img src={image} style={{height: 100}} alt={altText}/>
            </Paper>
          </ButtonBase>
          <ButtonBase id={'back '+index} value={index} onClick={(event) => {
            setFlipped(!isFlipped);
          }}>
            <Paper style={{width: 'fit-content', margin: 'auto'}} elevation={6}>
              <img src={image} style={{height: 100, filter: 'grayscale(100%)'}} alt={altText}/>
            </Paper>
          </ButtonBase>
        </ReactCardFlip>
      </div>
    </>
  );
}

export { CharacterCard }