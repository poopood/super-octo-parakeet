import { useState } from "react";

const Hello1 = () => {
  const [count, setcount] = useState(0);

  console.log("i render");
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setcount((count) => count + 1)}>add</button>
      <p>{count}</p>
    </div>
  );
};

export default Hello1;
