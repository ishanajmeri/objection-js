import React, { Component } from 'react';
import { Result, Button } from 'antd';
class NotFound extends Component {
  state = {};
  handleClick = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={this.handleClick}>
            Back Home
          </Button>
        }
      />
    );
  }
}

export default NotFound;
