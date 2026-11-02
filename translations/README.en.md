# A11Y Preferences — version 1.10.0

A standalone, dependency-free tool for adjusting content presentation. Adjustment tools are complementary: they do not remove accessibility barriers or certify compliance with accessibility standards.

## Installation

Extract `a11y-preferences-en.zip` and upload the `a11y-preferences` folder to your website's root directory, keeping this structure:

- `a11y-preferences/js/preferences.js`
- `a11y-preferences/css/preferences.css`
- `a11y-preferences/fonts/` (local font files and their licenses)

Add this line to the `<head>` of each page or your shared template:

```html
<script src="/a11y-preferences/js/preferences.js" defer></script>
```

The script loads its stylesheet automatically, relative to its own URL. If your website uses a subfolder, adjust the script path. Keep the folder structure intact. No additional initialization, remote fonts, or libraries are required.

## Language

This English download opens the tool in English by default, even on a page with another language or no `lang` attribute. Labels, options, instructions, status messages, movement announcements, and accessible names are in English.

Set the page's `lang` attribute to match its actual content; installing the tool does not translate the host website. To explicitly use Portuguese for the tool, add `data-lang="pt-BR"` to the installation script. Use `data-lang="en-US"` to explicitly select English.

## Available features

- **Content zoom:** Original, 125%, 150%, 175%, 200%, 300%, and 400%. The panel keeps its size. This does not change native browser zoom.
- **Color and contrast:** Original, black on white, white on black, yellow on black, and sepia.
- **Highlight controls:** outlines and minimum height for fields and buttons; underlining and bold text for links.
- **Text style and fonts:** Original, system font, serif, Arial, Atkinson Hyperlegible, Lexend, Open Sans, and Verdana.
- **Bold:** independent of the selected font.
- **Text size:** Original, 125%, 150%, 175%, and 200%.
- **Line spacing:** Original, 1.5, 1.75, and 2.
- **Letter spacing:** Original, 0.05, 0.10, and 0.15 em.
- **Word spacing:** Original, 0.10, 0.20, and 0.30 em.
- **Pause animations:** pauses supported CSS/Web Animations and HTML videos, and disables transitions. Unchecking resumes animations; videos remain paused until played.
- **Mute sounds:** mutes accessible HTML audio and video elements and restores their previous mute state when unchecked.

## Panel functions and keyboard use

Use **show preferences** at the top right to open the panel. Focus moves to its heading. **Close** or Escape returns focus to the trigger when available. Moving focus outside closes the panel without pulling focus back. The panel is not modal and does not trap Tab.

- Open groups individually or select **show all preferences**. Groups with nondefault settings display **Configured**.
- Enable **make this panel float** to move it by dragging the **Move panel** button, pressing arrow keys on that button, or using direction buttons. Position and boundary messages are available to screen readers.
- Select **show a small tool icon** to replace the trigger text with an icon. Its accessible name remains available.
- Select **hide the preferences button on this page** to hide the trigger after closing the panel. Clear the site's browser storage to show it again.
- Use **Restore defaults** to remove content adjustments and reset the panel options.

## Saved preferences and privacy

Content preferences are stored locally in the browser under `fm-preferencias-v1`, per origin (protocol, domain, and port). Compact and hidden trigger settings are stored per page. Floating position and expanded groups are not saved between page loads. Preferences are not sent to a server. The tool continues to work when browser storage is unavailable. Loading the script twice does not create a second panel.

## Integration limits

The tool does not create image descriptions, repair forms, fix keyboard interaction, or reorganize page semantics. Changes depend on the host site's HTML and CSS. Fixed heights, pixel-based text sizes, highly specific styles, and `!important` declarations may require manual adjustments. Magnification can cause horizontal scrolling.

Third-party iframes and shadow roots, text in images or canvas, Web Audio, GIFs, and some scripted animations are outside the tool's control. Themes remove background images, so those images must not be the only way to convey information. HTML images, videos, and SVGs are preserved.

The panel uses Shadow DOM. Its fixed position may overlap your site's navigation; adjust `:host .trigger` and `:host .panel` in `css/preferences.css` if necessary. If you use a Content Security Policy, allow the asset origin in `script-src`, `style-src`, and `font-src`.

## Test on your website

Check keyboard navigation, native browser zoom, real screen readers, all themes, restoring defaults, saved preferences, long content, 320 px screens, and combinations of text spacing. Automated checks and accessibility-tree inspection do not replace testing with assistive technologies.

## Credits and project

Independent implementation inspired by the Fluid Infusion preferences demonstration; no Infusion code or dependencies are included. Local fonts: Atkinson Hyperlegible, Lexend, and Open Sans; see the included font licenses. The open-in-new icon is from Google Material Icons (Apache 2.0).

- Website: https://preferenciasdeacessibilidade.com/index-en.html
- Source code: https://github.com/acessibilidade/preferencias-a11y
