# Yize Zhao — academic website

Personal academic website for Yize Zhao at Yale University, hosted on GitHub Pages.

**Website:** https://www.yizezhao.com/  
**Repository:** https://github.com/yizekaren/yizekaren.github.io

The site preserves the design and content migrated from Wix on September 13, 2026. Images, fonts, and the CV are stored locally with the site. No paid hosting plan, build tool, database, or JavaScript framework is required.

## Edit the website

| Page | File |
| --- | --- |
| Home and biography | `index.html` |
| Research | `research/index.html` |
| Publications | `publications/index.html` |
| People | `team-4/index.html` |
| News | `news/index.html` |
| Software | `software/index.html` |

Edit the text in these HTML files, then commit to `main`. GitHub Pages automatically republishes the site. Shared styling is in `assets/site.css`; the optional animated background is in `assets/site.js`. Replace `assets/Yize-Zhao-CV.pdf` when updating the CV. Keep navigation changes consistent across all six pages.

The original People URL `/team-4` is retained; `/people/` redirects there. Content and links work without JavaScript. The animation honors reduced-motion preferences and pauses when the page or illustration is hidden.

## Hosting and domain

GitHub Pages publishes the `main` branch from `/ (root)`. `.nojekyll` disables Jekyll processing. `CNAME` preserves the custom domain **www.yizezhao.com**. The `yizekaren.github.io` address redirects to the custom domain.

The domain registration remains at Wix and needs its separate renewal. DNS routes `www` to `yizekaren.github.io`, with the apex A records set to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`. Retain the GitHub ownership verification TXT record and the existing nameservers.

HTTPS is configured through **Settings → Pages → Enforce HTTPS** once GitHub finishes issuing the custom-domain certificate.

## Local preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` from this directory and visit http://127.0.0.1:8765/.

## Checks performed during migration

All six pages preserve the original text. Local links and fragment targets were checked. Desktop and mobile navigation were verified without horizontal overflow at 1280px and 390px widths. All 35 published site files were compared with the local files, including portraits, fonts, styles, scripts, and the CV. External publication and profile links were retained but were not all independently audited.

DM Sans is distributed under the SIL Open Font License included in `assets/DM-Sans-OFL.txt`.

[GitHub Pages documentation](https://docs.github.com/en/pages) · [Custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
