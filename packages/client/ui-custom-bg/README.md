---
description: "Personal Web client background theme: a wallpaper stylesheet and translucent surface tokens mounted beside the stock theme; for this repository's owner."
kind: "package-reference"
---

# @deepseek-ai/dsh-client-ui-custom-bg

## Summary

This personal plugin gives the Web client a custom background: one plugin-owned stylesheet paints the page background, while `ctx.theme` alias-token overrides make the stock surfaces translucent so the picture shows through without hurting text legibility. It overrides tokens only through the documented theme extension point and mounts no model-facing surface.

## Use this package

The web profile mounts the row through the user patch at `~/.dsh/profiles/web/cordis.patch.yml`; the package resolves from that profile's `package.json` `file:` dependency. Edit `src/client/custom-bg.css` (background) or the token table in `src/client/index.ts` (translucency), then rebuild:

```sh
pnpm --filter @deepseek-ai/dsh-client-ui-custom-bg run bundle
```

To embed a local picture, print a data-URI `url(...)` with the `wallpaper-url` script and paste it into the stylesheet.

## Known Limitations and Deferred Work

- `file://` image URLs cannot load inside the `http://` page; use a data URI or an http(s) URL.
- The override layer applies to both palettes; per-theme variant ids are deferred until needed.
