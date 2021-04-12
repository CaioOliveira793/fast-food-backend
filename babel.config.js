module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			}
		],
		'@babel/preset-typescript'
	],
	plugins: [
		['module-resolver', {
			alias: {
				'@entities': './src/domain/entities',
				'@repositories': './src/domain/repositories',
			}
		}]
	],
	ignore: [
		'**/*.spec.ts',
		'**/*.test.ts'
	]
}
