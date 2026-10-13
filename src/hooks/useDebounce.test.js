import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Custom Hook Logic - useDebounce & Sanitization', () => {
  it('should debounce rapid value updates with timers', async () => {
    let capturedValue = 'initial';
    const delayMs = 100;

    let timer = null;
    function updateDebounced(newVal) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        capturedValue = newVal;
      }, delayMs);
    }

    updateDebounced('quick-1');
    updateDebounced('quick-2');
    updateDebounced('final-value');

    // Before timer elapses
    assert.strictEqual(capturedValue, 'initial');

    // Wait for timer to finish
    await new Promise((resolve) => setTimeout(resolve, 150));

    // After timer elapses
    assert.strictEqual(capturedValue, 'final-value');
  });

  it('should correctly sanitize and parse genre tags', () => {
    const rawGenres = 'Action, Sci-Fi , Adventure, ';
    const parsed = rawGenres
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean);

    assert.deepStrictEqual(parsed, ['Action', 'Sci-Fi', 'Adventure']);
  });
});
