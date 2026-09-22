# Craft lint: http://127.0.0.1:9471/loga.html

Zdroj prahů: Atlas řemesla (133 webů) + texty MOC. ✗ = blokuje, ⚠ = oprav nebo obhaj v art direction, ℹ = doporučení, ✓ = sedí.

**1 chyb · 5 varování · 5 info**

- ✗ **M1** prefers-reduced-motion nikde v CSS (67 % webů má; texty: povinné). Pohyb nahraď fade, nevypínej obsah.

- ⚠ **T4** největší text na stránce je jen 24px; atlas hero desktop medián 64 px (q1 45). Chybí hierarchie?
- ⚠ **T14** hero desktop/mobil poměr 1.07 (24→22.5 px); atlas medián 1.79. Mobil má vlastní menší škálu.
- ⚠ **B11** tlačítka medián výška 31 px; atlas 43 (mobil 48).
- ⚠ **L1** container 600 px; atlas medián 1234 (q1 1104, q3 1344).
- ⚠ **O4** obrázek bez alt.

- ℹ **T11** -webkit-font-smoothing není antialiased (86 % webů má); přidej na body.
- ℹ **T12** text-wrap: balance/pretty na nadpisech chybí (62 % webů má; brání osamocenému slovu na posledním řádku).
- ℹ **T13** tabular-nums nikde; u cen, hodin a čísel drží sloupce (42 % webů).
- ℹ **B12** ::selection není definované (44 % webů má, u tech 59 %): levný signál, že web někdo navrhl.
- ℹ **O3** žádný srcset/picture; na mobilu se stahují desktopové fotky.

