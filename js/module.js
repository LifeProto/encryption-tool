!(function (global) {
  global.modules = {};

  global.define = (moduleName, mods, fn) => {
    console.log('mod', mods, global.modules);
    if (global.modules[moduleName]) {
      throw new Error(`module name: ${moduleName} was defined`);
    } else {
      global.modules[moduleName] = fn.apply(
        global,
        mods.map((key) => global.modules[key])
      );
    }
  };
})(window);
