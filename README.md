## 📦 anagram-grouper

Group words into anagram clusters using a hybrid approach:
🧠 sorted-letter comparison **+** 🔗 graph-based relationship merging.

---

### ✨ Features

* 🔤 Groups standard anagrams (e.g. `["cat", "act"]`)
* 🔗 Merges words linked via graph-style connections (e.g. `["pots", "stop"]`)
* 🧠 Handles **overlapping** anagram sets and **pairwise input**
* 🛠️ CLI-ready, usable in scripts or pipelines

---

### 🚀 Installation

```bash
npm install -g anagram-grouper
```

Or locally:

```bash
npm install anagram-grouper
```

---

### 📦 Usage (CLI)

#### 📁 Input file (`input.json`)

```json
{
  "0": [["act", "cat"]],
  "1": [["pots", "tops"]],
  "2": [["stop", "post"]],
  "3": [["tops", "spot"]]
}
```

#### ▶️ Run

```bash
anagram-grouper input.json
```

#### 📤 Output

```json
[
  ["act", "cat"],
  ["post", "pots", "spot", "stop", "tops"]
]
```

---

### 📚 Usage (API)

```js
import { mergeAnagramAndGraphGroups } from 'anagram-grouper';

const input = {
  0: [["cat", "act"]],
  1: [["pots", "tops"]],
  2: [["stop", "post"]],
  3: [["tops", "spot"]]
};

const result = mergeAnagramAndGraphGroups(input);

console.log(result);
// => [["act", "cat"], ["post", "pots", "spot", "stop", "tops"]]
```

> ✅ Requires Node.js ≥ 14 and `"type": "module"` in `package.json`

---

### 🧪 Dev Setup

```bash
git clone https://github.com/your-username/anagram-grouper
cd anagram-grouper
npm install
node bin/cli.js input.json
```

---

### 🔧 Module Functions

* `groupAnagramsByLibrary(words: string[]): string[][]`
  → Groups based on sorted character logic

* `groupAnagramsByGraph(pairsMap: Record<string, [string, string][]>): string[][]`
  → Groups by DFS over pairwise connections

* `mergeAnagramAndGraphGroups(pairsMap: Record<string, [string, string][]>): string[][]`
  → Final deduplicated hybrid grouping

---

### 📄 License

MIT © [Ben Gumaan](https://github.com/bengumaan)
