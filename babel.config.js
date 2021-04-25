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
				'@domainTypes': './src/domain/types',
			}
		}]
	],
	ignore: [
		'**/*.spec.ts',
		'**/*.test.ts'
	]
}
