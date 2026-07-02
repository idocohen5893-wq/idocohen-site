# Launch Checklist — idocohen-site v2

The site has NO placeholders — all copy is built from verified facts (your brief + your CV).
Before sharing the URL, verify the items below.

## Verify facts (owner sign-off)

- [ ] "Organizational income grew by 80% during my tenure" (from your CV: "contributing to 80%
      growth in organizational income"). Confirm you're comfortable with the site's phrasing.
- [ ] "Raised hundreds of thousands of shekels from public, private and philanthropic partners."
- [ ] Deloitte engagement descriptions (fraud risk / payments, ERM / fintech, compliance /
      financial services provider) are anonymized — confirm nothing is identifiable in combination.
- [ ] BlueKit description ("concept to MVP, user validation, pilot design") is current and accurate.
- [ ] Timeline years: Armored Corps 2012–2015 · Mechina Be'er Ora 2015–2016 · Masa Israeli
      2017–2018 · BA Sapir 2018–2021 · Jerusalem roles 2020–2021 · CEO + MBA 2022–2024 ·
      Deloitte + BlueKit 2024–present.

## CV PDF (assets/Ido-Cohen-CV.pdf)

- [ ] Rebuilt from your Word CV's exact content (typos fixed: "Counsultant" → "Consultant").
      Open it and proofread once — it includes your phone number (050-3345250), as your Word CV does.
- [ ] If you'd rather link your own designed CV, replace `assets/Ido-Cohen-CV.pdf` with your file
      (keep the same filename).

## Deploy (GitHub Pages)

- [ ] Push: authenticate once (see options below), then `git push -u origin main`.
      - Option A: create a token at github.com/settings/tokens (classic, `repo` scope),
        run push in Terminal, use the token as password.
      - Option B: GitHub Desktop → add existing repo → Push.
- [ ] Enable Pages: repo → Settings → Pages → Deploy from a branch → `main` / root → Save.
- [ ] Verify at https://idocohen5893-wq.github.io/idocohen-site/ (fonts, photo, CV download, mobile).

## If you buy a custom domain later

- [ ] Add a `CNAME` file with the bare domain; set DNS A records to GitHub Pages IPs
      (185.199.108/109/110/111.153) and `CNAME www` → `idocohen5893-wq.github.io`.
- [ ] Update the canonical URL, `og:image` URL and JSON-LD `url` in `index.html`.

## After launch

- [ ] Share the link on LinkedIn (the og.png preview shows your headline + photo).
- [ ] Add the site URL to your LinkedIn profile and CV.
