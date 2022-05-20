define("encrypt.doubleKnife", [], () => {
  const base64Key =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const transform = (text) => {
    let binary = strToBinary(text);
    return enBase64(binary);
  };

  const transformBack = (text) => {
    let binary = deBase64(text);
    return binaryToStr(binary);
  };

  //将字符串转换成二进制形式，中间用空格隔开
  const strToBinary = (text) => {
    let result = [];
    let list = text.split("");
    for (let i = 0; i < list.length; i++) {
      if (i !== 0) {
        result.push(" ");
      }
      let item = list[i];
      let binaryStr = item.charCodeAt().toString(2);
      result.push(binaryStr);
    }
    return result.join("");
  };

  //将二进制字符串转换成Unicode字符串
  const binaryToStr = (text) => {
    let result = [];
    let list = text.split(" ");
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      let asciiCode = parseInt(item, 2);
      let charValue = String.fromCharCode(asciiCode);
      result.push(charValue);
    }
    return result.join("");
  };

  const enBase64 = (text) => {
    let output = "";
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    let i = 0;
    text = utf8Encode(text);
    while (i < text.length) {
      chr1 = text.charCodeAt(i++);
      chr2 = text.charCodeAt(i++);
      chr3 = text.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        base64Key.charAt(enc1) +
        base64Key.charAt(enc2) +
        base64Key.charAt(enc3) +
        base64Key.charAt(enc4);
    }
    return output;
  };

  const deBase64 = (text) => {
    let output = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    text = text.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < text.length) {
      enc1 = base64Key.indexOf(text.charAt(i++));
      enc2 = base64Key.indexOf(text.charAt(i++));
      enc3 = base64Key.indexOf(text.charAt(i++));
      enc4 = base64Key.indexOf(text.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = utf8Decode(output);
    return output;
  };

  const utf8Encode = (text) => {
    text = text.replace(/\r\n/g, "\n");
    let utfText = "";
    for (let n = 0; n < text.length; n++) {
      let c = text.charCodeAt(n);
      if (c < 128) {
        utfText += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utfText += String.fromCharCode((c >> 6) | 192);
        utfText += String.fromCharCode((c & 63) | 128);
      } else {
        utfText += String.fromCharCode((c >> 12) | 224);
        utfText += String.fromCharCode(((c >> 6) & 63) | 128);
        utfText += String.fromCharCode((c & 63) | 128);
      }
    }
    return utfText;
  };

  const utf8Decode = (utfText) => {
    let text = "";
    let i = 0;
    let c = 0;
    let c1 = 0;
    let c2 = 0;
    while (i < utfText.length) {
      c = utfText.charCodeAt(i);
      if (c < 128) {
        text += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c1 = utfText.charCodeAt(i + 1);
        text += String.fromCharCode(((c & 31) << 6) | (c1 & 63));
        i += 2;
      } else {
        c1 = utfText.charCodeAt(i + 1);
        c2 = utfText.charCodeAt(i + 2);
        text += String.fromCharCode(
          ((c & 15) << 12) | ((c1 & 63) << 6) | (c2 & 63)
        );
        i += 3;
      }
    }
    return text;
  };

  const meta = {
    group: "加密算法",
    name: "Double Knife",
    from: "文本",
    to: "加密结果",
    emoji: "🔪",
    describe: "Double knife 算法",
    options: [],
  };

  return {
    meta,
    transform,
    transformBack,
  };
});
