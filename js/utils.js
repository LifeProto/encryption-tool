define("utils", [], () => {
  const useState = (defValue, effect) => {
    return new Proxy(
      { value: defValue },
      {
        set(obj, prop) {
          if (prop !== "value") return;
          const oldVal = obj[prop];
          const updated = Reflect.set(...arguments);
          typeof effect === "function" && updated
            ? effect.call(this, oldVal, obj[prop])
            : null;
          return updated;
        },
      }
    );
  };
  const bindInput = (el, fn) => {
    let isComp = true 

    el.addEventListener('compositionstart', () => isComp = false)
    el.addEventListener('compositionend', (e) => (isComp = true, fn(e)))
    el.addEventListener('input', e => isComp && fn(e))
  }
  return {
    useState,
    bindInput
  };
});
