// https://stylelint.io/
// http://stylelint.cn/
// https://cloud.tencent.com/developer/section/1489630
// https://github.com/stylelint/stylelint-config-standard
// https://github.com/primer/primer/tree/master/tools/stylelint-config-primer
// https://github.com/prettier/stylelint-config-prettier
// https://github.com/hudochenkov/stylelint-order

module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-primer', 'stylelint-config-prettier'],
    rules: {
        'at-rule-empty-line-before': null,
        'declaration-empty-line-before': 'never',
        'at-rule-no-vendor-prefix': true,
        'at-rule-no-unknown': null,
        'block-closing-brace-newline-after': [
            'always-multi-line',
            {
                ignoreAtRules: ['if', 'else', 'media'],
            },
        ],
        'block-no-empty': null,
        'declaration-property-value-blacklist': [
            {
                border: [0],
            },
        ],
        indentation: 4,
        'keyframe-declaration-no-important': true,
        'max-nesting-depth': 5,
        'number-leading-zero': 'never',
        'no-descending-specificity': null,
        'primer/selector-no-utility': null,
        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['composes'],
            },
        ],
        'property-no-vendor-prefix': [
            true,
            {
                ignoreProperties: ['box-align', 'box-flex', 'box-orient'],
            },
        ],
        'plugin/no-unsupported-browser-features': null,
        'selector-max-compound-selectors': 5,
        'selector-max-specificity': null,
        'selector-max-type': null,
        'selector-no-qualifying-type': [
            true,
            {
                ignore: ['attribute', 'class'],
            },
        ],
        'selector-no-vendor-prefix': [
            true,
            {
                ignoreSelectors: ['::-webkit-input-placeholder', '/-moz-.*/'],
            },
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
        'string-quotes': 'single',
        'unit-no-unknown': null,
        'value-no-vendor-prefix': [
            true,
            {
                ignoreValues: ['box', 'grab', 'max-content'],
            },
        ],
        'value-keyword-case': 'lower',
        'order/order': [['custom-properties', 'declarations', 'rules', 'at-rules']],
    },
};
