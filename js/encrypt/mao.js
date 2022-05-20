define("encrypt.mao", [], () => {
  const table = {
    0: "m",
    1: "Mio",
    2: "Miao",
    3: "Mie",
    4: "Mi0",
    5: "MiO",
    6: "Mioe",
    7: "Mieo",
    8: "MioO",
    9: "MiOo",
  };

  const deTable = {
    m: 0,
    Mio: 1,
    Miao: 2,
    Mie: 3,
    Mi0: 4,
    MiO: 5,
    Mioe: 6,
    Mieo: 7,
    MioO: 8,
    MiOo: 9,
  };

  const transformBack = (text) => {
    return text
      .split(" ")
      .map((i) => i.split("~"))
      .map((i) => i.map((j) => deTable[j]))
      .map((i) => i.join(""))
      .map((i) => String.fromCharCode(Number(i)))
      .join("");
  };

  const transform = (text) => {
    return text
      .split("")
      .map((i) => i.charCodeAt().toString())
      .map((i) => i.split(""))
      .map((i) => i.map((j) => table[j]))
      .map((i) => i.join("~"))
      .join(" ");
  };

  const meta = {
    group: "动物语",
    name: "猫言猫语",
    from: "人话",
    to: "猫语",
    emoji: "🐱",
    describe: "来听听猫咪说了啥吧❀",
    options: [
      {
        prop: "猫语等级",
        type: "select",
        selection: [1, 2, 3],
      },
    ],
  };

  return {
    meta,
    transform,
    transformBack,
  };
});
