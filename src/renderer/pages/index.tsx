import React from "react";
import useElectron from "../hooks/useElectron";
import { PageHeader } from "hefx-cmp";
import { Button } from "antd";
import { getBaidu } from "@renderer/api/test";
import { useStore } from "@renderer/stores";
import { observer } from "mobx-react";

function Index() {
  const { globalConfig } = useElectron();

  console.log("获取本地存储:", globalConfig.get("a"));

  const { test } = useStore();

  const getB = async () => {
    const res = await getBaidu();
    console.log(2222, res);
  };

  return (
    <div className="w-100 d-flex flex-column flex-between">
      <PageHeader title="Vite Demo">
        <div className="flex-1 d-flex flex-row flex-between">
          <div className="flex-1 border-right-d">
            title: {test.title}
            <Button onClick={() => test.setTitle("22333")}>测试</Button>
          </div>
          <div className="flex-1">
            <Button onClick={getB}>测试请求</Button>
          </div>
        </div>
      </PageHeader>
    </div>
  );
}

export default observer(Index);
