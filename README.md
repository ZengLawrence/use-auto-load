# use-auto-load

> React hook to load data when component is mounted.

[![NPM](https://img.shields.io/npm/v/use-auto-load.svg)](https://www.npmjs.com/package/use-auto-load) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-auto-load
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-auto-load'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [ZengLawrence](https://github.com/ZengLawrence)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
