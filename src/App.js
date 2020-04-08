import React, { Component } from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { Card, Row, Col } from 'antd';

import AmountComponent from './components/AmoutComponent';
import 'antd/dist/antd.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }
  
  onChange = value => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    console.log(value, !value);
    return (
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Col span={8}>
          <Card
            title="Payment"
            bordered={false}
          >
            <AmountComponent 
              style={{ marginBottom: '14px' }} 
              value={value} 
              onChange={this.onChange} 
            />
            { value && (
              <PayPalButton
                amount={value}
                onSuccess={(details, data) => {
                  alert("Transaction completed by " + details.payer.name.given_name);
                  return axios("/paypal-transaction-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderID: data.orderID
                    })
                  });
                }}
              />
            ) }
          </Card>
        </Col>
      </Row>
    );
  }
}

export default App;
