module.exports = function({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        if (path.node.name === 'console') {
          if (path.parent.property &&
            t.isIdentifier(path.parent.property) &&
            (state.opts.exclude === undefined || path.parent.property &&
              !state.opts.exclude.includes(path.parent.property.name))
          ) {
            let node = path.findParent(path => path.isExpressionStatement());
            if(node) {
                node.remove();
                path.skip();
            }
          }
        }
      }
    }
  }
}
