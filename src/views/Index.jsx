import React from "react";


class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>    
        <main ref="main">
          <div></div>
        </main>
      </>
    );
  }
}

export default Index;
