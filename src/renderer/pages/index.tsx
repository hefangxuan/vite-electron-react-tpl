import React from "react";
import useElectron from "../hooks/useElectron";
import { PageHeader } from "hefx-cmp";
import useTestModel from "@renderer/models/useTestModel";
import { Button } from "antd";

function Index() {
  const { globalConfig } = useElectron();

  const { count, decrement, increment } = useTestModel();

  console.log("获取本地存储:", globalConfig.get("a"));

  return (
    <div className="w-100 d-flex flex-column flex-between">
      <PageHeader title="Vite Demo">
        <div className="flex-1 d-flex flex-row flex-between">
          <div className="flex-1 border-right-d">left</div>
          <div className="flex-1">
            计数: {count}
            <Button onClick={increment}>减</Button>
            <Button onClick={decrement}>加</Button>
          </div>
        </div>
      </PageHeader>
    </div>
  );
}

export default Index;
