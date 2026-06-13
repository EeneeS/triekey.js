export class TrieNode {

    private _children = new Map<string, TrieNode>();
    private _isEndOfSequence = false;
    private _action: (() => void) | null = null;
    private _doAction = true;

    private static indexOf(char: string): number {
        const index = char.charCodeAt(0) - "a".charCodeAt(0);
        if (index < 0 || index >= 26) {
            return -1;
        }
        return index;
    }

    public get action(): (() => void) | null {
        return this._action;
    }

    public get doAction(): boolean {
        return this._doAction;
    }

    public add(key: string, action: () => void): void {
        let current: TrieNode = this;

        for (const char of key) {
            if (TrieNode.indexOf(char) === -1) return;

            if (!current._children.has(char)) {
                current._children.set(char, new TrieNode());
            }

            current = current._children.get(char)!;
        }

        current._isEndOfSequence = true;
        current._action = action;
    }

    public search(key: string): TrieNode | null {
        let current: TrieNode = this;

        for (const char of key) {

            if (TrieNode.indexOf(char) === -1) return null;

            const next = current._children.get(char);
            if (!next) return null;

            current = next;
        }

        return current._isEndOfSequence ? current : null;
    }

    public remove(key: string, depth: number = 0): boolean {
        if (depth === key.length) {
            if (!this._isEndOfSequence) {
                return false;
            }

            this._isEndOfSequence = false;
            this._action = null;

            return this._children.size === 0;
        }

        const char = key[depth]!;

        const node = this._children.get(char);
        if (!node) {
            return false;
        }

        const shouldRemove = node.remove(key, depth + 1);
        if (shouldRemove) {
            this._children.delete(char);
        }

        return this._children.size === 0 && !this._isEndOfSequence;
    }

    public enable(key: string) {
        const toEnable = this.search(key);
        if (toEnable) {
            toEnable._doAction = true;
        }
    }

    public disable(key: string) {
        const toDisable = this.search(key);
        if (toDisable) {
            toDisable._doAction = false;
        }
    }
}
