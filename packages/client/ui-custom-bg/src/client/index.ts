/** User background theme: wallpaper stylesheet plus translucent surface tokens. */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
// Type-only: pulls the theme service's Context merge (ctx.theme). Cross-plugin
// collaboration goes through the service, never a value import (client bundle
// purity gate).
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import backgroundCss from './custom-bg.css?inline'

/** Required service: the theme runtime that folds token override layers. */
export const inject = ['theme']

const OVERRIDE_SOURCE = '@deepseek-ai/dsh-client-ui-custom-bg'

/**
 * Translucent surface aliases, so the wallpaper shows through every layer.
 * Both palettes are mandatory; the panel tint differs per scheme for contrast.
 */
const SURFACE_OVERRIDES = {
  '--dsw-alias-bg-base': { light: 'transparent', dark: 'transparent' },
  '--dsw-alias-bg-layer-1': { light: 'rgb(255 255 255 / 0.82)', dark: 'rgb(24 24 27 / 0.78)' },
  '--dsw-alias-bg-layer-2': { light: 'rgb(255 255 255 / 0.82)', dark: 'rgb(39 39 42 / 0.78)' },
  '--dsw-alias-bg-layer-3': { light: 'rgb(255 255 255 / 0.9)', dark: 'rgb(52 54 56 / 0.84)' },
  '--dsw-specific-sidebar-fill': { light: 'rgb(249 250 251 / 0.72)', dark: 'rgb(24 24 27 / 0.72)' },
  '--dsw-specific-input-major': { light: 'rgb(255 255 255 / 0.75)', dark: 'rgb(39 39 42 / 0.7)' },
} as const

/**
 * Stack the surface overrides and mount the wallpaper stylesheet for this
 * plugin's lifetime.
 * @param ctx - Client cordis context.
 */
export function apply(ctx: ClientContext): void {
  ctx.theme.overrideTokens(OVERRIDE_SOURCE, SURFACE_OVERRIDES)

  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.plugin = OVERRIDE_SOURCE
    tag.dataset.pluginCss = `${OVERRIDE_SOURCE}/custom-bg.css`
    tag.textContent = backgroundCss
    document.head.appendChild(tag)
    return () => { tag.remove() }
  }, 'ui-custom-bg: background stylesheet')
}
