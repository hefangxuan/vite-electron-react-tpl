// import { isJSON, request as _request } from "hefx-utils";
import { test } from "../api.list";
import * as electron from "electron";
// import { HttpUtil } from "../../../common/utils/request";
//
// /**
//  * 本api配置文件的请求函数封装
//  * @param url
//  * @param options
//  */
// export async function testRequest(url: string, options: any) {
//   const newOptions = {
//     ...options,
//     transform: async (body: any) => {
//       return isJSON(body) ? JSON.parse(body) : body;
//     },
//   };
//   return await _request(test + url, newOptions);
// }
import { isJSON } from "hefx-utils";
import useElectron from "../../hooks/useElectron";

export async function getBaidu() {
  const { request } = useElectron();
  const res = await request(test, { method: "get" });

  console.log("请求百度: ", isJSON(res));
  return res;
}
