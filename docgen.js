// https://github.com/OriR/react-docgen-markdown-renderer#readme

const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
const componentName = process.argv.slice(2)[0];
const componentDir = process.argv.slice(3)[0] || 'components';
const componentPath = path.resolve(__dirname, `src/${componentDir}/${componentName}/${componentName}.jsx`);

const mdTemplate = `---
category: Components
type: 
title: {{componentName}}
subtitle: {{componentName}}
---

## {{componentName}}

{{#if srcLink }}From [\`{{srcLink}}\`]({{srcLink}}){{/if}}

{{#if description}}{{{description}}}{{/if}}

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
{{#each props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{#if isMissingComposes}}
*Some or all of the composed components are missing from the list below because a documentation couldn't be generated for them.
See the source code of the component for more information.*
{{/if}}

{{#if composes.length}}
{{componentName}} gets more \`propTypes\` from these composed components
{{/if}}

{{#each composes}}
#### {{this.componentName}}

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
{{#each this.props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{/each}}
`;

const renderer = new ReactDocGenMarkdownRenderer({
    componentsBasePath: __dirname,
    template: mdTemplate,
});

fs.readFile(componentPath, (error, content) => {
    const dir = path.dirname(componentPath);
    const baseName = path.basename(componentPath, path.extname(componentPath));
    const ext = renderer.extension;
    const documentationPath = path.resolve(dir, `${baseName}${ext}`);
    const doc = reactDocgen.parse(content);
    fs.writeFileSync(
        documentationPath,
        renderer.render(
            /* The path to the component, used for linking to the file. */
            componentPath,
            /* The actual react-docgen AST */
            doc,
            /* Array of component ASTs that this component composes*/
            []
        )
    );
});
