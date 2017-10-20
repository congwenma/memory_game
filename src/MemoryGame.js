import { observer } from "mobx-react";
import React from "react";
import Card, { CardContent } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
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
      <div>
        <h1>Memory Game</h1>
        <button>Shuffle</button>
        {/* NOTE: magical! */}
        {store.report}
        <div className="cards row pl2">
          {cards.map((card, ind) => {
            return <div key={ind}
              className="card-wrapper inline-block col-xs-4 col-xs-3 col-sm-2 col-lg-2 py2"
            >
              <div className="px3">
                <Card
                  raised
                  className={`${SCSS.Card}`}
                >
                  <CardContent>
                    {card.name}
                  </CardContent>
                </Card>
              </div>
            </div>
          })}
        </div>
      </div>
    );
  }

}

export default withStyles()(MemoryGame)