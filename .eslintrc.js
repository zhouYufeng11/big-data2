module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-undef": 0,
    'prefer-const': 'off',
    "no-irregular-whitespace": "off", //这禁止掉 空格报错检查
    'no-unused-vars': 'off', //禁止定义变量未使用报错
    "no-empty": 0,
  }
}
