define('_', ['encrypt'], (encrypt) => {
  encrypt.forEach((e) => {
    const { meta } = e;
    console.group('a encryption is loaded...')
    console.group('e.name:', meta.name);
    console.group('e.describe:', meta.describe);
    console.groupEnd()
  });
});
