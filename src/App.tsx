import { NextUIProvider } from "@nextui-org/react";
import { Router } from "./routes/router";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App() {
  return (
    <div>
      <SpeedInsights/>
      <NextUIProvider>
        <Router />
      </NextUIProvider>
    </div>
  );
}
