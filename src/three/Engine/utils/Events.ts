/* eslint-disable @typescript-eslint/no-explicit-any */

type CallbackFunction<Args extends any[]> = (...args: Args) => void;

type CallbacksStore<T extends { trigger: string; args: any[] }> = {
  [K in T["trigger"]]?: Record<
    number,
    CallbackFunction<Extract<T, { trigger: K }>["args"]>[]
  >;
};

export class Events<
  T extends { trigger: string; args: any },
  O extends number = 1 | 2 | 3 | 4 | 5
> {
  private callbacks: CallbacksStore<T> = {};

  public on<K extends T["trigger"]>(
    eventName: K,
    callback: CallbackFunction<Extract<T, { trigger: K }>["args"]>,
    order: O = 1 as O
  ): this {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = {};
    }

    if (!this.callbacks[eventName]![order]) {
      this.callbacks[eventName]![order] = [];
    }

    this.callbacks[eventName]![order].push(callback);
    return this;
  }

  public off<K extends T["trigger"]>(
    eventName: K,
    callback?: CallbackFunction<Extract<T, { trigger: K }>["args"]>
  ): this {
    const eventCallbacks = this.callbacks[eventName];
    if (!eventCallbacks) return this;

    if (callback) {
      Object.values(eventCallbacks).forEach((callbacksArray) => {
        const index = callbacksArray.indexOf(callback as any);
        if (index !== -1) {
          callbacksArray.splice(index, 1);
        }
      });
    } else {
      delete this.callbacks[eventName];
    }

    return this;
  }

  public trigger<K extends T["trigger"]>(
    eventName: K,
    ...args: Extract<T, { trigger: K }>["args"]
  ): this {
    const eventCallbacks = this.callbacks[eventName];
    if (!eventCallbacks) return this;

    const orders = Object.keys(eventCallbacks)
      .map(Number)
      .sort((a, b) => a - b);

    for (const order of orders) {
      const callbacksArray = eventCallbacks[order];
      callbacksArray.forEach((callback) => callback(...args));
    }

    return this;
  }
}
