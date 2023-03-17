import type { PluginContext, PluginInfo } from 'glaze-text-editor';

export interface PluginOptions {
  rendererURL?: string;
}

export default function umlPlugin(context: PluginContext, options: PluginOptions): PluginInfo;
