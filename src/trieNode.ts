export class TrieNode {
    private children = new Map<string, TrieNode>();
    private isEndOfSequence = false;
    private action: (() => void) | null = null;

    private static indexOf(char: string): number {
        const index = char.charCodeAt(0) - "a".charCodeAt(0);
        if (index < 0 || index >= 26) {
            return -1;
        }
        return index;
    }

    public add(key: string, action: () => void): void {
        let current: TrieNode = this;

        for (const char of key) {
            if (TrieNode.indexOf(char) === -1) return;

            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }

            current = current.children.get(char)!;
        }

        current.isEndOfSequence = true;
        current.action = action;
    }

    public search(key: string): (() => void) | null {
        let current: TrieNode = this;

        for (const char of key) {

            if (TrieNode.indexOf(char) === -1) return null;

            const next = current.children.get(char);
            if (!next) return null;

            current = next;
        }

        return current.isEndOfSequence ? current.action : null;
    }
}
