# Cultures, Collectives, and Computation (C³) Reading Group

Source for [cultures-collectives-computation.github.io](https://cultures-collectives-computation.github.io/).

An interdisciplinary reading group at Stanford on computational approaches to culture, collectives, and social phenomena.

## Stack

Plain HTML, CSS, and a small canvas script for the hero background. No build step — GitHub Pages serves the files directly.

## Editing

- **Add a session**: copy a `<li class="session">` block in `index.html` (`#schedule`) and update the date, title, citation, and presenter.
- **Update organizers**: edit the `.organizer-card` blocks in `#organizers`. To use a photo instead of initials, replace the inner `<span>` of `.organizer-avatar` with an `<img>`.
- **Change colors / fonts**: see the CSS custom properties at the top of `styles.css`.

## Local preview

Open `index.html` directly, or run a static server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Contact

c3-reading@list.stanford.edu
