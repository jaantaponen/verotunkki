import { Operation } from '.';

/**
 * Consolidates the history by deleting purchase and sale that match (i.e., same symbol),
 * so that the history contains purchases without a matching sale and sales without
 * a matching purchase.
 * @param history History of operation
 */
export function consolidateHistory(history: Operation[]): Operation[] {
  const _history = [...history];
  _history.forEach(({ type, symbol }, index) => {
    if (type === 'BUY') {
      return;
    }

    for (let i = 0; i < index; i++) {
      const operation = _history[i];
      const amount = _history[index].amount;

      if (operation.type === 'BUY' && operation.symbol === symbol) {
        _history[i] = {
          ...operation,
          amount: Math.max(0, operation.amount - amount),
        };
        _history[index] = {
          ..._history[index],
          amount: amount - Math.min(operation.amount, amount),
        };
      }
    }
  });

  return _history.filter(({ amount }) => amount > 0);
}
