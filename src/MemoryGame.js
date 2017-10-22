import { observer } from "mobx-react";
import React from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";
// import Fade from "./animation/Fade";
import Fade from 'material-ui/transitions/Fade'
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Snackbar from 'material-ui/Snackbar';
import Slide from "material-ui/transitions/Slide";

import SCSS from './MemoryGame.module.scss'
import Flip from './animation/Flip'

const EMPTY_IMG = 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjJ1fDT8v_WAhUY84MKHecdAdgQjBwIBA&url=http%3A%2F%2Findustrialdistrictla.com%2Fwp-content%2Fuploads%2F2013%2F08%2Fblank-120x120-200x150.jpg&psig=AOvVaw2erRi7KIgAY_Ht4Y3n3KAU&ust=1508612767045424'

@observer
class MemoryGame extends React.Component {
  render() {
    const { store, store: { cards } } = this.props;
    window.game = this;

    return (
      <Fade in transitionDuration={{ enter: 1000 }}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit" >
                <span className="mr2">
                  The Memory Game
                </span>
              </Typography>
              <Button color="accent" raised dense
                onClick={store.shuffle}
              >
                Shuffle
              </Button>

              <Button color="inherit" raised dense
                onClick={store.reset}
              >
                Reset
              </Button>
            </Toolbar>
          </AppBar>

          {/* NOTE: magical! */}
          {store.report}
          <div className="cards row">
            {cards.map((card, index) => {
              return (
                <div
                  key={index}
                  className="card-wrapper inline-block col-xs-4 col-sm-3 col-md-2 col-lg-2 py4"
                  style={{ height: 100 }}
                >
                  <div className="px2">
                    <Flip
                      onClick={() => store.flipCard(card)}
                      isFaceup={!card.isFaceup}
                      className="inline-block"
                      front={
                        <Card raised
                          className={`
                            ${SCSS.Card} Card-${index}
                            ${card.isDone ? SCSS['Card--done'] : ''}
                            ${card.isInvalid ? SCSS['Card--invalid'] : ''}
                            relative
                          `}
                        >
                          { card.isDone && <div
                            style={{
                              background: 'rgba(255, 255, 255, 0.5)',
                              position: 'absolute',
                              height: '100%',
                              width: '100%',
                              top: 0,
                              bottom: 0,
                              left: 0,
                              right: 0
                            }}
                          >

                          </div>}
                          <CardMedia
                            image={card.img}
                            className={SCSS.CardMedia}
                          />
                        </Card>
                      }
                      back={
                        <Card raised
                          className={`${SCSS.Card} Card-${index}`}>
                          {/* cheating */}
                          <span>
                            {card.name}
                          </span>
                          <CardMedia
                            image={EMPTY_IMG}
                            className={SCSS.CardMedia}
                          />
                        </Card>
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={store.isGameOver}
            transition={<Slide direction={'up'} />}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span>You've won.</span>}
          />
        </div>
      </Fade>
    );
  }
}

export default MemoryGame