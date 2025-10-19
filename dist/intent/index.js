// src/intent/Intent.tsx
import { jsx } from "react/jsx-runtime";
function Intent({ value, name = "intent" }) {
  return /* @__PURE__ */ jsx("input", {
    type: "hidden",
    name,
    value
  });
}
export {
  Intent
};

//# debugId=94E6137ECF5362A164756E2164756E21
