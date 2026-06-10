import type { TrieNode } from "./trieNode.js";

export class Buffer {
    private _trie: TrieNode;

    private _buffer: string;
    private _debounceId?: NodeJS.Timeout;
    private _debounceTimer = 1000;

    public constructor(trie: TrieNode) { 
        this._trie = trie;
        this._buffer = "";
    }

    public set debounceTimer(value: number) {
        this._debounceTimer = value;
    }

    public addToBuffer(key: string) {
        this._buffer += key;
        this.searchMatch();
    }

    private debouncedClear() {
        if (this._debounceId) {
            clearTimeout(this._debounceId);
        }

        this._debounceId = setTimeout(() => {
            this.clear();
        }, this._debounceTimer);
    }

    private searchMatch() {
        const match = this._trie.search(this._buffer);

        if (match) {
            match();
            this.clear();
            return;
        }

        this.debouncedClear();
    }

    public clear() {
        if (this._debounceId) {
            clearTimeout(this._debounceId);
        }
        this._buffer = "";
    }

    public get value(): string {
        return this._buffer;
    }
}
