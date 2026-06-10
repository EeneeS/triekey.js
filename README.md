# triekey.js

`triekey` is a small keyboard-sequence detector for browser apps.

It listens to `keydown` events, stores lowercase letter input (`a` to `z`) in a buffer, and checks whether the typed sequence matches a registered entry in a trie.

## Installation

```bash
npm install triekey
```

## Usage

```ts
import { Triekey } from "triekey";

const triekey = new Triekey();
triekey.start();

triekey.addSequence("test", () => {
    console.log("Typed test");
});
```

Type `t`, `e`, `s`, `t` in order and the provided action runs.

## API

### `new Triekey()`

Creates a new triekey instance with its own internal trie and input buffer.

### `start(): void`

Starts listening to `document` `keydown` events.

Only lowercase alphabetic keys (`a` to `z`) are processed.

### `addSequence(key: string, action: () => void): void`

Registers a sequence.

- Throws an error for an empty string.
- Runs the provided `action` callback when the sequence is matched.

```ts
const triekey = new Triekey();

triekey.addSequence("hello", () => {
    console.log("Hello sequence matched");
});

triekey.addSequence("secret", () => {
    console.log("Secret sequence matched");
});
```

### `setDebounceTimer(value: number): void`

Sets how long (in milliseconds) triekey waits after the last valid key before clearing the input buffer.

Default: `1000`

```ts
const triekey = new Triekey();
triekey.setDebounceTimer(1500);
triekey.start();
```

## Behavior Notes (Current State)

1. Sequences are effectively lowercase-only (`a`-`z`).
2. Non-letter keys are ignored by the keydown handler.
3. Buffer is cleared after a successful match.
4. Buffer is also cleared after debounce timeout.
5. Sequence removal/enable/disable methods are present in source but not implemented yet.
