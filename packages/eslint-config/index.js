module.exports = {
	ignorePatterns: ['node_modules', 'dist', '.eslintrc.js'],
	env: {
		browser: true,
		es2023: true,
		node: true,
	},
	parserOptions: {
		// Override @typescript-eslint 2018 default  https://typescript-eslint.io/packages/parser/#ecmaversion
		ecmaVersion: 2023,
		tsconfigRootDir: process.cwd(),
		project: true, // find the tsconfig.json nearest to each source file
	},
	extends: [
		require.resolve('./airbnb'),
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		require.resolve('./react'),
		'plugin:unicorn/recommended',
		'prettier',
	],
	plugins: ['eslint-comments'],
	settings: {
		'import/resolver': {
			node: true,
			typescript: true,
		},
	},
	rules: {
		// This rule warns ESLint directive (especially for disable directives) comments without description
		// https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html
		'eslint-comments/require-description': ['error', { ignore: [] }],

		// Enforce consistent usage of type imports
		// https://typescript-eslint.io/rules/consistent-type-imports
		'@typescript-eslint/consistent-type-imports': 'warn',

		// Disallow the declaration of empty interfaces
		// https://typescript-eslint.io/rules/no-empty-interface
		'@typescript-eslint/no-empty-interface': 'error',

		// Disallow explicit type declarations for variables or parameters initialized to a number, string, or boolean
		// https://typescript-eslint.io/rules/no-inferrable-types
		'@typescript-eslint/no-inferrable-types': 'error',

		// Disallow non-null assertions using the ! postfix operator
		// https://typescript-eslint.io/rules/no-non-null-assertion
		'@typescript-eslint/no-non-null-assertion': 'warn',

		// Disallow non-import statements appearing before import statements
		// https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/first.md
		'import/first': 'warn',

		// Require a newline after the last import/require in a group
		// https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
		'import/newline-after-import': ['warn', { considerComments: true }],

		// Ensures that there are no useless path segments
		// https://github.com/import-js/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/no-useless-path-segments.md
		'import/no-useless-path-segments': 'warn',

		// Enforce a convention in the order of import statements
		// https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/order.md
		'import/order': [
			'error',
			{
				groups: [['builtin', 'external'], ['internal', 'parent'], ['sibling', 'index'], 'type'],
				pathGroups: [
					{ pattern: 'react*', group: 'external', position: 'before' },
					{ pattern: '@monorepo-example/*', group: 'external', position: 'after' },
				],
				pathGroupsExcludedImportTypes: ['type'],
				distinctGroup: false,
				alphabetize: { order: 'asc', caseInsensitive: true },
				'newlines-between': 'always',
			},
		],

		// Мутное и очень тяжелое по перфу правило
		// https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/namespace.md
		'import/namespace': 'off',

		// Enforce specific import styles per module (уже полно правил по импортам, еще и слегка бьет по перфу)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
		'unicorn/import-style': 'off',

		// Enforce a camelCase and PascalCase styles for filenames
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
		'unicorn/filename-case': [
			'warn',
			{ cases: { camelCase: true, pascalCase: true }, ignore: ['vite-env.d.ts'] },
		],
		// Disallow new Array() with one argument (в случаях создания массива фиксированной длины предлагает визуально тяжелый синтаксис, поэтому вырубаем)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
		'unicorn/no-new-array': 'off',

		// Disallow the use of the null literal (субъективное правило автора пресета, поэтому вырубаем)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
		'unicorn/no-null': 'off',

		// Prefer JavaScript modules (ESM) over CommonJS (dev среда у нас на CommonJS, поэтому вырубаем)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
		'unicorn/prefer-module': 'off',

		// Prefer the spread operator over Array.from(…), Array#concat(…), Array#{slice,toSpliced}() and String#split('') (в некоторых кейсах, вроде псевдомассивов без итератора, данное правило даст сбой, так что пока живем без него)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
		'unicorn/prefer-spread': 'off',

		// Prevent abbreviations (создает лишний шум, а написать непонятную переменную можно и с этим правилом. Будем отлавливать на уровне PR, поэтому вырубаем)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
		'unicorn/prevent-abbreviations': 'off',

		// Enforce the use of built-in methods instead of unnecessary polyfills (не используем полифилы на проекте, лишняя проверка)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-polyfills.md
		'unicorn/no-unnecessary-polyfills': 'off',

		// Use destructured variables over properties (было включено на проекте с самого старта, но потом авторы unicorn его убрали из recomended, выглядит вроде логично, так что оставляем)
		// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
		'unicorn/consistent-destructuring': 'error',
	},
}
