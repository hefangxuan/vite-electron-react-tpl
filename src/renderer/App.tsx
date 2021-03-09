import React, { useState } from "react";
import { Button, DatePicker } from "antd";
import useElectron from "./hooks/useElectron";

function App() {
  const [count, setCount] = useState(0);

  const { globalConfig } = useElectron();

  console.log("获取本地存储:", globalConfig.get("a"));

  return (
    <div className="App">
      <DatePicker />
      <Button type="primary" onClick={() => setCount((d) => d + 1)}>
        测试{count}
      </Button>
    </div>
  );
}

export default App;
