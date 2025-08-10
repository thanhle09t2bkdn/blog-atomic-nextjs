module.exports = {
  // Basic formatting options
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  useTabs: false,

  // JSX specific options
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',

  // File type specific overrides
  overrides: [
    {
      files: ['*.json', '*.jsonc'],
      options: {
        singleQuote: false,
      },
    },
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
  ],

  // Plugins (Tailwind CSS plugin should be last)
  plugins: ['prettier-plugin-tailwindcss'],
};
