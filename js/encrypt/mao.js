define('encrypt.mao', [], () => {
  const table = {
    1: 'Mio',
    2: 'Mie',
    3: 'Mio0',
    4: 'MiOo',
    5: 'MiO',
    6: 'Mie',
    7: 'MioO',
    8: 'Mi0',
    9: 'Mi0o',
  };

  const decode = (text) => {
    throw new Error('not implement')
  };

  const encode = (text) => {
    text
      .map((i) => i.charCodeAt().toString())
      .map((i) => i.split(''))
      .map((i) => i.map((j) => table[j]))
      .map(i => i.join('~'))
      .join(' ');
  };

  const meta = {
    name: '猫言猫语',
    emoji: '🐱',
    encodeText: '喵喵喵~',
    decodeText: '猫猫说了啥？',
    describe: '来听听猫咪说了啥吧❀',
    options: [
      {
        prop: '猫语等级',
        type: 'select',
        selection: [1, 2, 3],
      },
    ],
  };

  return {
    meta,
    decode,
    encode,
  };
});