import { observer } from "mobx-react";
import React from "react";

export default class MemoryGame extends React.Component {
  render() {
    const store = this.props.store;
    // debugger
    return (
      <div>
        <h1>Memory Game</h1>
        {/* NOTE: magical! */}
        {store.report}

      </div>
    );
  }

}
