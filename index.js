import React from "react";
import Diaporama from "diaporama-react";

const data = {
  timeline: [
    "http://i.imgur.com/MQtLWbD.jpg",
    "http://i.imgur.com/N8a9CkZ.jpg",
    "http://i.imgur.com/adCmISK.jpg",
    "http://i.imgur.com/AedZQ4N.jpg",
    "http://i.imgur.com/y9qRJR3.jpg",
    "http://i.imgur.com/brzKTYZ.jpg",
    "http://i.imgur.com/NSyk07l.jpg",
    "http://i.imgur.com/EaZiWfn.jpg",
    "http://i.imgur.com/I1KZdnl.jpg",
    "http://i.imgur.com/DoQBdzT.jpg",
    "http://i.imgur.com/slIt2Ww.jpg",
    "http://i.imgur.com/DA12puU.jpg",
    "http://i.imgur.com/IYLdRFW.jpg",
    "http://i.imgur.com/oqmO4Po.jpg",
    "http://i.imgur.com/T6NaLyI.jpg",
    "http://i.imgur.com/6XAPrAY.jpg",
    "http://i.imgur.com/thYzbif.jpg",
    "http://i.imgur.com/4qmqo3o.jpg",
    "http://i.imgur.com/8xT2J96.jpg",
    "http://i.imgur.com/ZCa2pWq.jpg",
    "http://i.imgur.com/loQfDN2.jpg",
    "http://i.imgur.com/oabfA68.jpg",
    "http://i.imgur.com/uOXqDRY.jpg",
    "http://i.imgur.com/MyyS4vK.jpg",
    "http://i.imgur.com/fhNYTX4.jpg"
  ].map(src => ({
    image: src,
    duration: 2000,
    kenburns: {
      from: [0.8, [0.5,0.5]],
      to: [1, [0.5,0.5]]
    },
    transitionNext: {
      duration: 1000
    }
  }))
};

const BlinkTest = React.createClass({

  getInitialState() {
    return {
      ready: false
    };
  },

  onDiaporamaCreated (diaporama) {
    if (this.props.loadEvent)
      diaporama.once(this.props.loadEvent, () => this.setState({ ready: true }));
  },

  render () {
    const loadEvent = this.props.loadEvent;
    const ready = !loadEvent || this.state.ready;
    const width = 300;
    const height = 200;
    const maybePlaceholder = ready ? undefined :
      <div style={{ zIndex: 2, color: "#ccc", background: "#fff", border: "1px dashed #eee", boxSizing: "border-box", textAlign: "center", paddingTop: "40px", fontFamily: "sans-serif", position: "absolute", top: 0, left: 0, width: width+"px", height: height+"px" }}>
        <h1>Loading...</h1>
        (event: {this.props.loadEvent})
      </div>;
    return <div style={{ margin: "2px", display: "inline-block", position: "relative" }}>
      <strong>{!loadEvent ? "instantly" : <span>waits <code>"{loadEvent}"</code></span>}</strong>
      <div style={{position: "relative"}}>
        {maybePlaceholder}
        <div style={{ zIndex: 1 }}>
          <Diaporama
            data={data}
            width={width}
            height={height}
            autoplay={true}
            onDiaporamaCreated={this.onDiaporamaCreated}
          />
        </div>
      </div>
    </div>;
  }

});

document.body.style.padding = 0;
document.body.style.margin = "2px";

React.render(<div>
  <h1>Loadings</h1>
  <BlinkTest loadEvent={null} />
  <BlinkTest loadEvent="canplay" />
  <BlinkTest loadEvent="canplaythrough" />
  <BlinkTest loadEvent="load" />
</div>, document.body);
