module.exports = {
  root          : true,
  ignorePatterns: [
    'dist',
    'export',
    'coverage',
    'node_modules',
  ],
  env: {
    es2021  : true,
    mocha   : true,
    node    : true,
    commonjs: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser       : '@typescript-eslint/parser',
  parserOptions: {
    project    : 'tsconfig.json',
    ecmaVersion: 2021,
  },
  plugins: ['arca'],
  rules  : {
    'no-plusplus'          : 0,
    'import/extensions'    : 0,
    'prefer-destructuring' : 0,
    'prefer-arrow-callback': 0,
    'no-param-reassign'    : 0,
    'no-await-in-loop'     : 0,
    'func-names'           : 0,
    'arca/import-align'    : 2,
    'arca/import-ordering' : 2,
    'no-process-exit'      : 0,
    'no-console'           : 0,
    'no-restricted-syntax' : 0,
    'no-case-declarations' : 0,
    'no-shadow'            : 0,
    'no-nested-ternary'    : 0,
    'no-undef'             : 0,
    'arrow-body-style'     : 0,
    'key-spacing'          : [
      2,
      { singleLine: { beforeColon: false,
        afterColon : true },
      multiLine: { beforeColon: false,
        afterColon : true,
        align      : 'colon' } },
    ],
    'object-curly-newline': [
      2,
      {
        ObjectExpression : { consistent: true },
        ObjectPattern    : { consistent: true },
        ImportDeclaration: { consistent: true },
        ExportDeclaration: { consistent: true },
      },
    ],
    'no-multiple-empty-lines': [
      2, { max: 1, maxBOF: 0, maxEOF: 1 },
    ],
    'max-len'                                         : 0,
    'no-multi-spaces'                                 : 0,
    'no-underscore-dangle'                            : 0,
    'no-mixed-operators'                              : 0,
    'import/order'                                    : 0,
    'import/no-extraneous-dependencies'               : 0,
    'import/prefer-default-export'                    : 0,
    '@typescript-eslint/naming-convention'            : 1,
    '@typescript-eslint/ban-types'                    : 0,
    '@typescript-eslint/no-var-requires'              : 0,
    '@typescript-eslint/ban-ts-comment'               : 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any'              : 0,
    '@typescript-eslint/type-annotation-spacing'      : 0,
    '@typescript-eslint/lines-between-class-members'  : 0,
    '@typescript-eslint/no-use-before-define'         : 0,
    '@typescript-eslint/no-empty-interface'           : 0,
    '@typescript-eslint/no-non-null-assertion'        : 0,
    '@typescript-eslint/no-unused-vars'               : [
      1, {
        argsIgnorePattern : 'res|next|^err|^_',
        ignoreRestSiblings: true,
        caughtErrors      : 'none',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js'],
    },
  },
};
