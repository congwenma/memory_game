import { observer } from "mobx-react";
import React from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";
// import Fade from "./animation/Fade";
import Fade from 'material-ui/transitions/Fade'
import SCSS from './MemoryGame.module.scss'


class MemoryGame extends React.Component {
  render() {
    const {
      store,
      store: {
        cards
      }
    } = this.props;
    window.game = this;

    return (
      <Fade in transitionDuration={{ enter: 1000 }}>
        <div>
          <h1>Memory Game</h1>
          <button>Shuffle</button>
          {/* NOTE: magical! */}
          {store.report}
          <div className="cards row">
            {cards.map((card, index) => {
              return <div key={index} className="card-wrapper inline-block col-xs-4 col-xs-3 col-sm-2 col-lg-2 py2">
                  <div className="px2">
                    <Card raised className={`${SCSS.Card} Card-${index}`}>
                      { false &&
                        <CardContent>{card.name && ''}</CardContent>
                      }
                      <CardMedia
                        image={card.img}
                        className={SCSS.CardMedia}
                      />
                    </Card>
                  </div>
                </div>
            })}
          </div>
        </div>
      </Fade>
    )
  }
}

export default MemoryGame