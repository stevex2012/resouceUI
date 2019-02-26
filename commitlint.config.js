// https://www.npmjs.com/package/@commitlint/config-conventional

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'merge', 'revert'],
        ],
        'subject-case': [0, 'never'],
    },
};
