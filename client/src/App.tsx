import type { ReactElement } from "react";
import { Body } from "./body/Body";
import { Header } from "./header/Header";

export const App: React.FC = (): ReactElement => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

export default App;
