module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',  // Add React recommended rules
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'react',
    '@typescript-eslint'
  ],
  rules: {
    // Existing rules
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    
    // Additional useful rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-console': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'no-duplicate-imports': 'error',
    
    // React specific rules
    'react/prop-types': 'off', // Since we're using TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed in modern React
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Common bug catches
    'no-return-await': 'warn',
    'no-throw-literal': 'error',
    'no-unused-expressions': 'warn',
    'no-template-curly-in-string': 'warn',

    'max-len': ['warn', {
      code: 80,               // Maximum line length
      tabWidth: 2,           // Tab counts as 2 spaces
      comments: 100,         // Longer line length for comments
      ignorePattern: '^import .*', // Ignore import statements
      ignoreUrls: true,      // Ignore lines containing URLs
      ignoreStrings: true,   // Ignore lines that are strings
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }]
    
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}