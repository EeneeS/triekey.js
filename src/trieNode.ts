import type { Nonnull, Nullable } from "./nullability.js";

export class TrieNode {

    private children: Array<Nullable<TrieNode>>;
    private isEndOfSequence: Nonnull<boolean>;
    private action: Nullable<() => void>;

    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfSequence = false;
    }

    public add(root: Nonnull<TrieNode>, key: Nonnull<string>, action: Nonnull<() => void>): void {
        let current = root;
        
        for (let char of key) {
            let index = char.charCodeAt(0) - "a".charCodeAt(0);

            if (current.children[index] === null) {
                const newNode = new TrieNode();
                current.children[index] = newNode;
            }

            current = current.children[index]!;
        }

        current.isEndOfSequence = true;
        current.action = action;
    }

    public search(root: Nonnull<TrieNode>, key: Nonnull<string>): Nullable<() => void> {
        let current = root;

        for (let char of key) {
            let index = char.charCodeAt(0) - "a".charCodeAt(0);

            if (current.children[index] === null) {
                return null;
            }

            current = current.children[index]!;
        }

        return current.isEndOfSequence ? current.action : null;
    }

}
