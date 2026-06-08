import type { Nonnull } from "./nullability.js";
import { TrieNode } from "./trieNode.js";

class Triekey {

    private _trie: Nonnull<TrieNode>;
    private _buffer: Nonnull<string>;

    private _maxSeqLen: Nonnull<number>;

    public constructor() {
        this._trie = new TrieNode();
        this._buffer = "";
        this._maxSeqLen = 0;
    }

    public start() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            this.handleKeyDown(event);
        });
    }

    public handleKeyDown(event: Nonnull<KeyboardEvent>) {
        const key = event.key;
        if (key >= 'a' && key <= 'z') {
            if (this._buffer.length < this._maxSeqLen) {
                this._buffer += key;
                const match = this._trie.search(this._trie, this._buffer);
                if (match) {
                    this._buffer = "";
                    match();
                }
            } else {
                this._buffer = "";
            }
        }
    }

    public addSequence(key: Nonnull<string>) {
        if (key.length === 0) {
            throw new Error("Empty keys are not allowed.");
        }

        this._maxSeqLen = key.length;
        this._trie.add(this._trie, key, () => console.log("yeep"));
    }

    public removeSequence() {
    }

    public enableSequence() {
    }

    public disableSequence() {
    }

}

export { Triekey }
