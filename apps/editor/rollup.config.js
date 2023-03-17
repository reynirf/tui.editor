import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs';
import banner from 'rollup-plugin-banner';
import { version, author, license } from './package.json';

function i18nEditorImportPath() {
  return {
    name: 'i18nEditorImportPath',
    transform(code) {
      return code.replace('../editorCore', 'glaze-text-editor');
    },
  };
}

const fileNames = fs.readdirSync('./src/i18n');

function createBannerPlugin(type) {
  return banner(
    [
      `glaze-text-editor${type ? ` : ${type}` : ''}`,
      `@version ${version} | ${new Date().toDateString()}`,
      `@author ${author}`,
      `@license ${license}`,
    ].join('\n')
  );
}

export default [
  // editor
  {
    input: 'src/esm/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: false,
    },
    plugins: [typescript(), commonjs(), nodeResolve(), createBannerPlugin()],
    external: [/^prosemirror/],
  },
  // viewer
  {
    input: 'src/esm/indexViewer.ts',
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: false,
    },
    plugins: [typescript(), commonjs(), nodeResolve(), createBannerPlugin('viewer')],
    external: [/^prosemirror/],
  },
  // i18n
  {
    input: fileNames.map((fileName) => `src/i18n/${fileName}`),
    output: {
      dir: 'dist/esm/i18n',
      format: 'es',
      sourcemap: false,
    },
    external: ['glaze-text-editor'],
    plugins: [
      typescript(),
      commonjs(),
      nodeResolve(),
      i18nEditorImportPath(),
      createBannerPlugin('i18n'),
    ],
  },
];
