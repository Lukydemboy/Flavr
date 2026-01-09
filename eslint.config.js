module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: { 'prettier/prettier': 'error' },
  files: ['**/*.{js,jsx,ts,tsx}'],
};
