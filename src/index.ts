import { TrieNode } from "./trieNode.js";
import { Buffer } from "./buffer.js";

class Triekey {
    private _trie: TrieNode;
    private _buffer: Buffer;

    public constructor() {
        this._trie = new TrieNode();
        this._buffer = new Buffer(this._trie);
    }

    public setDebounceTimer(value: number) {
        this._buffer.debounceTimer = value;
    }

    public start() {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            this.handleKeyDown(event);
        });
    }

    public handleKeyDown(event: KeyboardEvent) {
        const key = event.key;
        if (key >= 'a' && key <= 'z') {
            this._buffer.addToBuffer(key);
        }
    }

    public addSequence(key: string, action: () => void) {
        if (key.length === 0) {
            throw new Error("Empty keys are not allowed.");
        }
        this._trie.add(key, action);
    }

    public removeSequence(key: string) {
        this._trie.remove(key);
    }

    public enableSequence(key: string) {
        this._trie.enable(key);
    }

    public disableSequence(key: string) {
        this._trie.disable(key);
    }

}

export { Triekey }
