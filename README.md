# rippu.js
Library for building TUI in JSX 💄

Rippu - [リップ] means lip-gloss💄 in Japanese.

Fast, feature-rich, user-friendly, and above all, upscale UI ✨

Supports: Node.js, Deno, Bun and more :heart:

## Examples

### Counter

```tsx
import { useState, useEffect } from "react";
import { render, Line, Bold } from "@rippu/x/jsx";

function Counter() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(intervalId)
  }, [])

  return <>
    <Line>Count: <Bold>{count} {count === 1 ? "click" : "clicks"}</Bold></Line>
  </>
}

render(Counter)
```

### Image
![image](https://github.com/EdamAme-x/rippu.js/assets/121654029/27076ab8-e098-4d8a-999d-bc97fc3d9a92)

## Render to string
```tsx
import { renderToString, Line, Bold, Border } from "@rippu/x/jsx";

function Counter() {
  return <Border type="bold">
    <Line>Count: <Bold>2189 clicks</Bold></LINE>
  </Border>
}

console.log(renderToString(Counter))
```

## Image
<img src="https://raw.githubusercontent.com/Yomguithereal/react-blessed/master/img/demo.gif" alt="this is mock image" />
