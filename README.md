# rippu.js
Library for building TUI in JSX 💄

Rippu - [リップ] means lip-gloss💄 in Japanese.

Fast, feature-rich, user-friendly, and upscale UI ✨

Supports: Node.js, Deno, Bun and more :heart:
<img src="https://github.com/user-attachments/assets/c7572d56-a279-4bbc-b2d3-b17af70c6ad5" alt="icon" width="200" />

Accessible and customizable components that you can copy and paste into your apps. Free. Open Source.  
**Use this to build your own component library.**  

#### [**Docs 📖**](https://github.com/EdamAme-x/rippu.js/wiki)

## What is this

This is a set of components available in ink.js, including rich selection screens, progress bars, loading indicators, and more.
You are free to customize your design!
like a shadcn-ui

## How to use
See [**Docs 📖**](https://github.com/EdamAme-x/rippu.js/wiki)

### Image
<img src="https://raw.githubusercontent.com/Yomguithereal/react-blessed/master/img/demo.gif" alt="demo"/>

If you already use ink

```bash
npx rippu add loading
pnpx rippu add loading
bunx rippu add loading
deno run -Ar npm:rippu add loading
```

OR

```bash
rippu add loading ./loading.tsx
rippu add loading ./loading.jsx
```

## For Contributors

Please run the following commands before pushing your changes, and add jsdoc comments (optional).

The code is currently messy as it was created in a hurry.
We welcome PRs to organize types, create common utilities, and more!

See [loading.tsx](components/loading.tsx)

```bash
bun run format:fix
bun run lint:fix
```

## Authors
- Ame_x [@amex2189](https://x.com/amex2189)

Thanks to [lipgloss-go](https://github.com/charmbracelet/lipgloss), [ink.js](https://github.com/y-lohse/inkjs) and [enogu](https://github.com/ryuapp/enogu)
