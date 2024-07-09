# rippu.js
Library for building TUI in JSX 💄

Rippu - [リップ] means lip-gloss💄 in Japanese.

Fast, feature-rich, user-friendly, and above all, upscale UI ✨

Supports: Node.js, Deno, Bun and all :heart:

## Examples

### Counter

```tsx
import { useState, useEffect } from "rippu";

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(intervalId)
  }, [])

  return <>
    <p>Count: <b>{count} {count <= 1 ? "click" : "clicks"}</b></p>
  </>
}
```

## Image
<img src="https://raw.githubusercontent.com/Yomguithereal/react-blessed/master/img/demo.gif" alt="this is mock image" />
