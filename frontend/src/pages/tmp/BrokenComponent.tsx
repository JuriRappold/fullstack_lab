export function BrokenComponent() {
    throw new Error('React Component error', {cause: `BOOOM chakalaka`});
}
