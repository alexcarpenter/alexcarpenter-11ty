function isObject(val) {
  if (val === null) { return false; }
  return ((typeof val === 'function') || (typeof val === 'object'));
}

function responsify(val, prefix) {
  let classes = [];
  if (val === undefined) return classes;
  if (isObject(val)) {
    for (const key in val) {
      if (key === 'default') {
        classes.push(`${prefix}${val[key]}`)
      } else {
        classes.push(`${prefix}${val[key]}@${key}`)
      }
    }
  } else {
    classes.push(`${prefix}${val}`);
  }
  return classes;
}

module.exports = {
  AspectRatio: function (children, ratio = '16/9') {
    return `<div style="--aspect-ratio: ${ratio};">${children}</div>`
  },

  Breakout: function (children) {
    return `<div class="o-breakout">${children}</div>`
  },

  Container: function (children, size = null) {
    return `<div class="o-container${size ? ` o-container--${size}` : ''}">${children}</div>`
  },

  Grid: function (children, opts = {}) {
    const { align, justify } = opts;
    const modifiers = [
      ...responsify(align, 'o-grid--align-'),
      ...responsify(justify, 'o-grid--justify-')
    ];
    return `<div class="o-grid${modifiers ? ' ' + modifiers.join(' ') : ''}">${children}</div>`
  },

  GridCol: function (children, opts = {}) {
    const { span, order } = opts;
    const modifiers = [
      ...responsify(span, 'u-width-'),
      ...responsify(order, 'u-order-')
    ]
    return `<div class="o-grid__col${modifiers ? ' ' + modifiers.join(' ') : ''}">${children}</div>`
  }
};
