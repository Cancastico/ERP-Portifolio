import { NextUIProvider } from "@nextui-org/react";
import { Router } from "./routes/router";

export default function App() {
  return (
    <div>
      <NextUIProvider>
        <Router />
      </NextUIProvider>
    </div>
  );
}
