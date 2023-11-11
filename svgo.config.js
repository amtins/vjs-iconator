module.exports = {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    'removeXMLProcInst',
    'cleanupAttrs',
    'cleanupIds',
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'version',
          'xmlns.xlink',
          'sketch.type',
          'xmlns.sketch',
          'stroke-width',
          'fill-rule',
          'style'
        ],
      },
    },
    'removeUselessStrokeAndFill',
    'removeDimensions',
    'removeDesc',
    'removeComments',
    'removeTitle',
    'removeUselessDefs',
    'removeStyleElement',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'mergePaths',
  ],
};
