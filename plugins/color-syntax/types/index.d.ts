import type { PluginContext, PluginInfo } from 'glaze-text-editor';

export interface PluginOptions {
  preset?: string[];
}

export default function colorPlugin(context: PluginContext, options: PluginOptions): PluginInfo;
