import React from "react";
import {
  Col,Row
} from "reactstrap";
import Report from 'powerbi-report-component';


class Dashboard extends React.Component {

    render() {
    return (
      <>

          <>
            <Row>
              <Col>
              <Report embedType="report"
                tokenType="Embed"
                accessToken="none"
                embedUrl="https://app.powerbi.com/view?r=eyJrIjoiZjNkOGZiOTAtNzI0OS00NTg2LWJhYzEtZWE1MjBlNDNhYTI2IiwidCI6IjFmMmIwZTJjLTM4NjctNGMyYi04NjJmLWYwMTBhZGY1ODA1NiIsImMiOjR9"
                embedId="19e7cdf1-02fd-4d99-99c0-19addba3be60/"
                extraSettings={{
                  filterPaneEnabled: false,
                  navContentPaneEnabled: false,
                }}
                permissions="All"
                style={{
                  height:'700px',
                  border: '0',
                  padding: '20px',
                  background: '#eee'
                }}
                onLoad={(report) => {
                  /*
                  you can set filters onLoad using:
                  this.report.setFilters([filter]).catch((errors) => {
                    console.log(errors);
                  });*/
                  console.log('Report Loaded!');
                  //this.report = report (Read docs to know how to use report object that is returned)
                }}
                onSelectData={(data) => { 
                  window.alert('You clicked chart:' + data.visual.title); 
                }}
                onPageChange={(data) => { 
                  console.log('You changed page to:' + data.newPage.displayName); 
                }}
                onTileClicked={(dashboard, data) => { //only used for dashboard
                  // this.report = dashboard; use for object for triggering fullscreen
                  console.log('You clicked tile:', data);
                }}
              />
              </Col>
            </Row>
          
          
            </>
     
      </>
    );
  }
}

export default Dashboard;
