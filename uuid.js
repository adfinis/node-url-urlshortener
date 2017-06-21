var alphabet, base, i, j;

alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
base = alphabet.length;


exports.encode = function(i) {
  var s;
  if (i === 0) {
    return alphabet[0];
  }
  s = "";
  while (i > 0) {
    s += alphabet[i % base];
    i = parseInt(i / base, 10);
  }
  return s.split("").reverse().join("");
};

exports.decode = function(s) {
  var c, i, j, len;
  i = 0;
  for (j = 0, len = s.length; j < len; j++) {
    c = s[j];
    i = i * base + alphabet.indexOf(c);
  }
  return i;
};
