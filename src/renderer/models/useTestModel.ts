import { useState } from "react";
import { createModel } from "hox";

// interface TestType {
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// }

function useTestModel() {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((d) => d - 1);
  };
  const decrement = () => {
    setCount((d) => d + 1);
  };
  return {
    count,
    increment,
    decrement,
  };
}

export default createModel(useTestModel);
