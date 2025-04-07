// @todo investigate these
// https://github.com/stylelint/awesome-stylelint

export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recommended',
        'stylelint-config-tailwindcss',
    ],
    plugins: [
        'stylelint-order',
        'stylelint-no-unsupported-browser-features',
        'stylelint-declaration-block-no-ignored-properties',
        'stylelint-declaration-strict-value',
        'stylelint-no-indistinguishable-colors',
    ],
    rules: {
        
        // Support Tailwind v4
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'extends',
                    'layer',
                    'apply',
                    'variants',
                    'screen',
                    'reference',
                    'plugin',
                ],
            },
        ],
        
        // Check for unsupported browser features
        'plugin/no-unsupported-browser-features': [
            true,
            {
                severity: 'warning',
                'ignore': [
                    'css-nesting',
                    'css-matches-pseudo',
                    'css-media-range-syntax',
                    'css-resize',
                    'css-appearance',
                ],
            },
        ],
        
        'import-notation': 'string',
        
        // Disallow the use of !important
        'declaration-no-important': null, // true @debug
        
        // Disallow vendor prefixes
        'property-no-vendor-prefix': [true, {
            'ignoreProperties': ['box-shadow'],
        }],
        
        'selector-id-pattern': '^[a-zA-Z0-9-]+$',
        
        // Limit the number of ID selectors in a selector
        'selector-max-id': 3,
        
        // Disallow specific class patterns (set to `null` to disable)
        'selector-class-pattern': null,
        
        'at-rule-empty-line-before': null,
        'declaration-empty-line-before': null,
        
        // Disallow duplicate properties within declaration blocks
        'declaration-block-no-duplicate-properties': true,
        
        // Disallow shorthand properties that override related longhand properties
        'declaration-block-no-shorthand-property-overrides': true,
        
        'order/order': [
            {
                type: 'at-rule',
                name: 'apply',
            },
            'declarations',
            {
                type: 'at-rule',
                name: 'media',
            },
            {
                type: 'rule',
                selector: '^&::(before|after)',
            },
            {
                type: 'rule',
                selector: '^&:\\w',
            },
            {
                type: 'rule',
                selector: '^&_',
            },
            {
                type: 'rule',
                selector: '^.',
            },
        ],
        
        // Enforce semantic order of properties within declaration blocks
        // https://github.com/hudochenkov/stylelint-order
        // 'order/properties-alphabetical-order': true,
        'order/properties-order': [
            /* {
                groupName: 'TailwindCSS properties',
                emptyLineBefore: 'always',
                properties: ['@apply'],
            }, */
            {
                groupName: 'Layout properties',
                emptyLineBefore: 'always',
                properties: [
                    /* 'display',
                    'position',
                    'top',
                    'right',
                    'bottom',
                    'left',
                    'z-index',
                    'flex',
                    'flex-direction',
                    'flex-wrap',
                    'align-items',
                    'align-content',
                    'justify-content',
                    'order',
                    'grid',
                    'grid-template',
                    'grid-template-rows',
                    'grid-template-columns',
                    'grid-template-areas',
                    'grid-auto-rows',
                    'grid-auto-columns',
                    'grid-auto-flow',
                    'grid-row',
                    'grid-column',
                    'grid-row-start',
                    'grid-column-start',
                    'grid-row-end',
                    'grid-column-end',
                    'grid-area',
                    'gap',
                    'row-gap',
                    'column-gap',
                    'float',
                    'clear' */
                ],
            },
            
            /* {
                // This option will make sure that @apply directives are always at the top
                'unspecified': 'top',
                'properties': [
                    '@apply',
                ],
            }, */
        ],
        
        // Plugin to check for ignored properties within declaration blocks
        'plugin/declaration-block-no-ignored-properties': true,
        
        // Disallow redundant longhand properties within declaration blocks
        'declaration-block-no-redundant-longhand-properties': true,
        
        // Plugin to check for excessive specificity in selectors
        'selector-max-specificity': ['3,2,1', {
            'ignoreSelectors': [], // [":global", ":local"]
        }],
        
        // Plugin to check for indistinguishable colors
        'plugin/stylelint-no-indistinguishable-colors': null, // true @debug
        
        // Disallow the usage of specific properties
        'property-disallowed-list': ['z-index'],
        
        // Allow empty blocks
        'block-no-empty': null,
        
        // Disabled since it's common practice to use a doctype header above larger classes
        // @todo maybe useful to enable anyway
        'rule-empty-line-before': null,
        
        'comment-empty-line-before': null, // 'always' @debug
        'custom-property-empty-line-before': null,
        
        // Allow only specified units
        'unit-allowed-list': [
            'em', 'rem', 'px', '%', 'vh',
            's', 'deg', 'fr', /* {
            'ignoreProperties': {
                'px': ['font-size', '/^border/'],
                '%': ['width', 'height']
            }
        } */],
        
        // Disallow unknown pseudo-elements, but allow 'v-deep'
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep'],
            },
        ],
        
        // Enforce strict values for certain properties
        'scale-unlimited/declaration-strict-value': [
            [/* '/color/', */ /* 'font-size', */ 'z-index'],
            {
                disableFix: true,
                ignoreKeywords: {
                    '/color/': ['currentColor', 'transparent', 'inherit'],
                    'font-size': ['inherit'],
                    'z-index': ['auto'],
                },
                ignoreVariables: true,
                ignoreFunctions: false,
            },
        ],
        
        'alpha-value-notation': 'number',
        
    },
    
}
