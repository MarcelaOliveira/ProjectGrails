import React from "react";
import { Result, Button } from 'antd';
import "antd/dist/antd.css";

export default function PageNotFound(props) {
  return (
      <div>
          <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary" onClick={props.back}>Voltar ao Login</Button>}
          />
      </div>
    );
}
