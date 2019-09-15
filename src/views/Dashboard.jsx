import React from "react";
import {
  Col,Row
} from "reactstrap";
import Report from 'powerbi-report-component';

class Dashboard extends React.Component {

  onEmbedded(embed) {
    console.log(`Report embedded: `, embed, this);
  }

    render() {
  
    return (
      <>

          <>
            <Row>
              <Col>
         
 
              <Report 
                embedType="report"
                tokenType="Embed"
                accessToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCIsImtpZCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMWYyYjBlMmMtMzg2Ny00YzJiLTg2MmYtZjAxMGFkZjU4MDU2LyIsImlhdCI6MTU2ODUxMTIwOCwibmJmIjoxNTY4NTExMjA4LCJleHAiOjE1Njg1MTUxMDgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiI0MkZnWU5qNVdMV2lWTlg1V0kyVUFkOGtvVnV6ZThROERwcC9tYVdlTDd0ZTg3R2N6UU1BIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImVhMDYxNmJhLTYzOGItNGRmNS05NWI5LTYzNjY1OWFlNTEyMSIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiT3JlbGxhbmEiLCJnaXZlbl9uYW1lIjoiQ2FybG9zIiwiaXBhZGRyIjoiMTkwLjUuMzIuOTMiLCJuYW1lIjoiQ2FybG9zIE9yZWxsYW5hIiwib2lkIjoiOWIwYWQ3MjgtOTI3Ny00MzU0LTljZjgtZDE1MTA3OTM4M2NmIiwicHVpZCI6IjEwMDMyMDAwNkFEQzg0RUEiLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJLeGNJSXhXcUctNDcyNVlFNXFMcU1KUUNwS1VmZmwtM0dPcE5TR21LOE9ZIiwidGlkIjoiMWYyYjBlMmMtMzg2Ny00YzJiLTg2MmYtZjAxMGFkZjU4MDU2IiwidW5pcXVlX25hbWUiOiJjYXJsb3Mub3JlbGxhbmFAYWx1LnVjbS5jbCIsInVwbiI6ImNhcmxvcy5vcmVsbGFuYUBhbHUudWNtLmNsIiwidXRpIjoiQ1pjMmMyQUR3VXF6dHBrejduS0xBQSIsInZlciI6IjEuMCJ9.vBzM4d3NmJR4e0OOGiTO8jg2xs5ADRTFO5AVcaFdRdJ0EGJC2D3dnw-qKjiPamORmOB6YebhEZJTG1lt5zT93CH7z5w_KHRU48XBtg7xJofLic2f-wiNNwgH6vrEo3erEsbOJee3gSVnfxQCcR3RYg4xjqnCNdFJu-C6HBMQRbTOkrzg1rjHakIeBO6tb12xWuH8zcdYqysrldF2pfaA-Gru0IESDCsK8JzoTMOwhQ9ze1i4XTGOx7bIZYjMrY09DOXATmtaDpVIZsbz9i8Ml3r5NS58Ywi5Brap4AJMXiE_c8UHHOOqmSf_XkOyxDdnpmqjRwrigYu9zgZdBDYyww="
                // embedUrl="https://app.powerbi.com/reportEmbed?reportId=d2d33fb6-1f22-4f8e-b528-0bda2c12dee6"
                embedUrl="https://app.powerbi.com/view?r=eyJrIjoiMWE1ZTc0ZDItNzZmNC00OTYxLTg3ZmYtOGVmM2NmYzQ2MTI5IiwidCI6IjFmMmIwZTJjLTM4NjctNGMyYi04NjJmLWYwMTBhZGY1ODA1NiIsImMiOjR9"
                embedId="d2d33fb6-1f22-4f8e-b528-0bda2c12dee6"
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
                  console.log("a")
               
                  // you can set filters onLoad using:
                  report.setFilters(["carreras"]).catch((errors) => {
               
                  });
                  console.log('Report Loaded!');
                  //this.report = report (Read docs to know how to use report object that is returned)
                }}
                onSelectData={(data) => { 
                  console.log("a");
                  window.alert('You clicked chart:' + data.visual.title); 
                }}
                onPageChange={(data) => { 
                  console.log("a");
                  console.log('You changed page to:' + data.newPage.displayName); 
                }}
                onTileClicked={(dashboard, data) => { //only used for dashboard
                  console.log("a");
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
