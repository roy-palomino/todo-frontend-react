import { SwitchComponent } from "./router";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster richColors position="bottom-right" />
      <SwitchComponent />
    </div>
  );
}

export default App;
