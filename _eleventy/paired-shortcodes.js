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
    const { as='div', align, justify } = opts;
    const modifiers = [
      ...responsify(align, 'o-grid--align-'),
      ...responsify(justify, 'o-grid--justify-')
    ];
    return `<${as} class="o-grid${modifiers ? ' ' + modifiers.join(' ') : ''}">${children}</${as}>`
  },

  GridCol: function (children, opts = {}) {
    const { as='div', span, order } = opts;
    const modifiers = [
      ...responsify(span, 'u-width-'),
      ...responsify(order, 'u-order-')
    ]
    return `<${as} class="o-grid__col ${[...modifiers].join(' ')}">${children}</${as}>`
  }
};
