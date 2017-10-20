import { observer } from "mobx-react";
import React from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";
// import Fade from "./animation/Fade";
import Fade from 'material-ui/transitions/Fade'
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
          <h1>Memory Game</h1>
          <button onClick={store.shuffle}>Shuffle</button>
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
                      className="inline-block"
                      front={
                        <Card raised className={`${SCSS.Card} Card-${index}`}>
                          {false && (
                            <CardContent>{card.name && ""}</CardContent>
                          )}
                          <CardMedia
                            image={card.img}
                            className={SCSS.CardMedia}
                          />
                        </Card>
                      }
                      back={
                        <Card raised className={`${SCSS.Card} Card-${index}`}>
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
        </div>
      </Fade>
    );
  }
}

export default MemoryGame