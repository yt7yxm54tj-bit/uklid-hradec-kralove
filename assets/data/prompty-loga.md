# Prompty na loga pro GPT (Hradecký úklid, 09/2026)

## Proč minulá várka dopadla, jak dopadla

Každý prompt z 8. 9. nutil model udělat dvě práce najednou: vysázet „HRADECKÝ ÚKLID" včetně Ý a Ú **a** nakreslit značku. Generátor neumí kerning ani českou diakritiku, takže na písmo spálil kapacitu a značka zůstala přeplácaná ilustrace. Odtud ten pocit „hnusný".

**Nové pravidlo: model kreslí jen symbol. Nápis vysázím skutečným fontem**, stejně jako u loga, které je dnes na webu. Je to zároveň jediná cesta k logu, které se dá zmenšit do hlavičky a otisknout v jedné barvě.

## Jak to použít

1. V ChatGPT jeď image gen (GPT Image).
2. Začni promptem **P0 (průzkum)**, vrátí 2×2 mřížku čtyř různých směrů za cenu jedné generace.
3. Co tě chytne, přegeneruj samostatně přes prompt daného motivu (P1–P8).
4. Líbí se ti jeden kus? Pusť **P9 (variace)** s tím obrázkem jako referencí.
5. Stáhni PNG do `~/Downloads` a napiš mi „**přidej nová loga**". Naimportuju je, vytáhnu z nich paletu a přidám na stránku s logy.

## Společná kostra (BASE): nikdy ji neměň

Tohle patří na **konec každého** promptu. Drží styl, barvy a hlavně vektorovatelnost: čím míň odstínů a čím tlustší tahy, tím líp se to pak překresluje do SVG.

```
Flat vector-style logo symbol only. No text, no letters, no words, no numbers, no slogans.
Centered on a square canvas, the mark fills about 70% of the frame with generous even margins.
Exactly two flat fill colors plus white negative space: deep navy #0B3049 and petrol teal #177A8D.
Uniform thick strokes, closed simple shapes, geometric construction with rounded terminals,
generous negative space. Must stay instantly readable at 32 pixels.
No gradients, no shadows, no bevels, no glow, no texture, no outline frame around the whole mark,
no background rectangle, no mockup, no drop shadow. Genuinely transparent background with real alpha.
Playful and friendly but still professional. Not corporate clip-art, not a stock cleaning logo.
```

## Do promptu nikdy nedávej

- **Cihly a cihlovou vazbu**: od 2023 na nich stojí identita FC Hradec Králové se stejným odůvodněním (Gočár, Salon republiky). Kolize.
- **Tři věže nebo panorama města**: rešerše ukázala, že to čte jako equalizer (Deezer, SoundCloud) a shoduje se s tisíci stock skyline log.
- **Text, nápis, jméno firmy**, viz výše.
- **Reálné landmarky Hradce**: AI je udělá „skoro správně" a místní to poznají.

---

## P0: průzkum, 2×2 mřížka

> Four different flat vector logo symbols for a Czech home cleaning company, arranged as a 2x2 grid, each quadrant a clearly distinct concept: (1) a window frame with one pane wiped clean, (2) a bucket with a mop leaning in it, (3) a single sweeping curved stroke with three trailing droplets, (4) two overlapping circles forming a soap-bubble monogram. Each quadrant must read as its own standalone mark, not variations of one idea.
> `+ BASE`

## P1: okno s jiskrou

> A simple square window frame divided into two panes. A bold curved wipe arc crosses the lower pane, and the upper pane holds one crisp four-point shine. The wipe arc is petrol teal, the frame deep navy. The cleaned part of the glass is empty white negative space, the uncleaned part is a solid fill.
> No human figure, no hands, no spray bottle, no curtains, no cityscape behind the window.
> `+ BASE`

## P2: kýbl s mopem jako postavička

> A rounded bucket seen from the front, its water line drawn as a single upward curve so the bucket reads as a friendly smile. A mop leans out of it diagonally to the upper right, its head built from three broad rounded strands. Bucket navy, water line and mop head petrol teal.
> No face, no eyes, no arms or legs, no bubbles floating around, no floor line.
> `+ BASE`

## P3: oblouk po stěrce

> One bold confident curved sweep, like a squeegee stroke across glass, thick at the start and tapering at the end, with exactly three round droplets trailing off the tip in decreasing size. The sweep is the entire mark. Navy stroke, teal droplets.
> No squeegee tool drawn, no window frame, no hand, no additional strokes, no circle around it.
> `+ BASE`

## P4: bublinový monogram HÚ

> Two overlapping circles like soap bubbles. The letterforms H and Ú are cut out of the circles as negative space, so the shapes read as a monogram only on second look. The overlap of the two circles is a third lighter tone. Left circle navy, right circle petrol teal.
> Keep the letter shapes geometric and heavy, no script, no outlines, no sparkle, no extra bubbles.
> `+ BASE`
>
> *(Tenhle motiv drží linku na značku, kterou máš dnes na webu. Pokud chceš evoluci místo revoluce, jdi sem.)*

## P5: dům, který se usmívá

> A minimal house silhouette reduced to a roof and two walls. Under it, a single broad curved sweep forms both the ground and a smile. One four-point shine sits at the upper right of the roof. House navy, sweep teal.
> No windows, no door, no chimney, no fence, no sun, no clouds.
> `+ BASE`

## P6: kapka s domovem uvnitř

> A single bold water droplet. Inside it, a house roof is carved out as clean white negative space, so the home reads from within the drop. The lower third of the droplet is a flowing petrol teal facet, the rest navy.
> No circle around it, no additional droplets, no equipment, no text, no waves.
> `+ BASE`

## P7: maskot ze stěrky

> A friendly character built from pure geometry: a rounded droplet body holding a small squeegee diagonally, two dot eyes, no mouth. The squeegee handle is a single thick line with a rounded cap. Body teal, squeegee and eyes navy.
> Keep it extremely simple, no arms with fingers, no legs, no smile line, no hat, no cartoon outline, no shading.
> `+ BASE`

## P8: pečeť se smetákem

> A round badge: a heavy circular rim with one broad broom angled diagonally across the middle, its head built from three wide geometric shapes. Two small four-point shines are cut into the rim as negative space. Rim and handle navy, broom head petrol teal.
> No text on the rim, no stars, no laurel, no ribbon, no house, no leaves.
> `+ BASE`

## Polopostava s nástrojem (E1 až E10)

Styl, na který Eda ukázal: logo Elegantního mytí a naše současné okno. Společný jmenovatel není
motiv, ale **ořez a kompozice**. Postava je vidět od pasu nahoru, ne celá. Nástroj je vystrčený od
těla, takže akce je nepřehlédnutelná. V místě, kde nástroj pracuje, je malý shluk kapek nebo jedna
jiskra. Celek je kompaktní a spíš na šířku, aby sedl vedle nápisu. Tím se to liší od sady F, kde
byly celé postavy a kolem nich hodně prázdna.

Tenhle odstavec patří ke každému promptu E1 až E10, hned před BASE:

```
A single worker shown from the waist up as a solid flat silhouette. No facial features, no fingers,
no outlines around the body. Three-quarter or side view, caught mid-action, the tool held away from
the body so the action is unmistakable. A small cluster of three or four droplets, or one four-point
shine, marks the exact point where the tool meets the surface.
The whole mark is compact and slightly wider than tall, so it can sit to the left of a wordmark.
No ground plane, no room, no scenery beyond the single surface being cleaned.
```

## E1: stěrka na skle

> The worker reaches across a tall pane of glass with a squeegee, pulling one clean stroke downward, the cleaned part of the glass left as empty negative space and the untouched part filled.
> Navy figure, petrol teal glass, white cleaned area.
> `+ POLOPOSTAVA + BASE`

## E2: rozprašovač a hadr

> The worker holds a spray bottle forward in one hand and a folded cloth in the other, a short burst of three droplets leaving the nozzle.
> Navy figure, petrol teal bottle and droplets. No surface, no furniture.
> `+ POLOPOSTAVA + BASE`

## E3: mop přes tělo

> The worker grips a mop handle diagonally across the body, the head of the mop low and wide, the shoulders turned into the push.
> Navy figure, petrol teal mop head. No floor, no bucket.
> `+ POLOPOSTAVA + BASE`

## E4: hubice vysavače

> The worker holds a vacuum wand angled down and forward, three small specks being drawn up into the nozzle.
> Navy figure, petrol teal wand and specks. No vacuum body, no hose coil, no cable.
> `+ POLOPOSTAVA + BASE`

## E5: leštění dlaňí

> The worker presses a folded cloth flat against a surface in front of them, arm extended, and one four-point shine sits where the cloth touches.
> Navy figure, petrol teal cloth, white shine. No table, no mirror frame.
> `+ POLOPOSTAVA + BASE`

## E6: parní čistič

> The worker holds a steam nozzle forward and slightly up, with one soft rounded puff of steam built from two overlapping shapes leaving the tip.
> Navy figure, petrol teal steam. No cable, no machine, no floor.
> `+ POLOPOSTAVA + BASE`

## E7: kartáč na fasádu

> The worker holds a long brush on a pole raised diagonally upward, the bristle head broad and flat, three droplets falling from it.
> Navy figure, petrol teal brush head and droplets. No wall, no ladder, no building.
> `+ POLOPOSTAVA + BASE`

## E8: kýbl a hadr

> The worker holds a bucket low in one hand and a raised cloth in the other, the cloth caught mid-wipe with one shine beside it.
> Navy figure, petrol teal bucket and cloth.
> `+ POLOPOSTAVA + BASE`

## E9: dva v týmu

> Two workers shown from the waist up, overlapping shoulder to shoulder, the front one holding a squeegee and the one behind holding a spray bottle, their silhouettes reading as one compact block.
> Front figure navy, rear figure petrol teal. No circle around them, no background.
> `+ POLOPOSTAVA + BASE`

## E10: okno a jiskra

> The worker wipes the lower half of a simple two-pane window frame with a cloth, the upper pane already clean and holding one four-point shine, the figure overlapping the frame from the left.
> Navy figure and frame, petrol teal cloth, white clean glass.
> `+ POLOPOSTAVA + BASE`

## V1: volný průběh

Opak všeho výše. Žádná kostra, žádné zákazy, žádný popis motivu. GPT dostane jen to, kdo firma je,
a všechno ostatní si rozhodne samo, včetně toho, jestli do značky dá nápis. Pouští se **desetkrát
se stejným zadáním**, takže rozmanitost přichází od modelu, ne od nás.

> Design a logo for this company.
> Hradecký úklid is a cleaning company in Hradec Králové, Czech Republic. They clean homes and offices, do deep cleaning and post-construction cleanup. Seven years in business, over 500 jobs, a small local crew with their own equipment and their own cleaning products, and the customer only pays once they are satisfied.
> Their colours are deep navy #0B3049 and petrol teal #177A8D.
> Everything else is your call: what the mark shows, how it is composed, how simple or rich it is, whether it includes the name.
> Transparent background.

Tenhle prompt **nedostává BASE ani nic dalšího**. Když se do něj začnou dopisovat pravidla, přestane
to být volný průběh a je to zase naše zadání.

## V2: volný průběh s člověkem

Totéž co V1, jen s jedinou větou navíc. Nic dalšího se nedospecifikovává schválně: co ten člověk
dělá, jak vypadá a jak velkou část značky zabírá, si rozhoduje model.

> Design a logo for this company.
> Hradecký úklid is a cleaning company in Hradec Králové, Czech Republic. They clean homes and offices, do deep cleaning and post-construction cleanup. Seven years in business, over 500 jobs, a small local crew with their own equipment and their own cleaning products, and the customer only pays once they are satisfied.
> Their colours are deep navy #0B3049 and petrol teal #177A8D.
> The logo must include a person.
> Everything else is your call: what the mark shows, how it is composed, how simple or rich it is, whether it includes the name.
> Transparent background.

## Postava v akci (F1 až F10)

Směr, který sedí na logo, co je dnes na webu: **panáček, který něco dělá**. Postava je vždycky plná
silueta bez obličeje, bez prstů, s tlustými zjednodušenými končetinami, zabraná uprostřed pohybu.
Postava a nástroj musí dohromady tvořit jeden kompaktní tvar, ne scénku s kulisami.

Tenhle odstavec patří ke každému promptu F1 až F10, hned před BASE:

```
A single human figure as a solid flat silhouette. No facial features, no fingers, no hair strands,
no outlines around the body. Chunky simplified limbs, confident posture, caught mid-action.
The figure and the tool read as one compact balanced mark, not as a scene with scenery.
No ground plane, no room, no furniture beyond what the action needs.
```

## F1: myje okno

> A figure seen from the side, reaching up and across a simple two-pane window frame with a squeegee, body leaning into the stroke, one four-point shine in the cleaned pane.
> Navy figure and frame, petrol teal squeegee stroke. No bucket, no ladder, no spray bottle.
> `+ POSTAVA + BASE`

## F2: vytírá mopem

> A figure bent forward pushing a mop away from the body, and the mop stroke continues into one wide sweeping arc that also serves as the only ground the mark needs.
> Navy figure, petrol teal sweep. No bucket, no tiles, no splashes.
> `+ POSTAVA + BASE`

## F3: vysává

> A figure walking forward with a vacuum cleaner, the hose drawn as one single clean loop that curves from the figure's hand down to the nozzle.
> Navy figure, petrol teal hose and nozzle. No cable, no wheels detail, no dust cloud.
> `+ POSTAVA + BASE`

## F4: utírá desku

> A figure leaning over a horizontal surface with a cloth in hand, the wipe drawn as one broad arc across the surface, the arc wider than the cloth itself.
> Navy figure, petrol teal wipe arc. No table legs, no objects on the surface, no spray.
> `+ POSTAVA + BASE`

## F5: přichází s kýblem

> A figure walking in profile carrying a bucket in one hand, slight forward lean, the free arm swinging, the bucket hanging low and heavy.
> Navy figure, petrol teal bucket. No mop, no door, no path, no motion lines.
> `+ POSTAVA + BASE`

## F6: na štaflích

> A figure standing on a low two-step stepladder, reaching up with a cloth toward a high corner, body stretched into a diagonal.
> Navy figure and ladder, petrol teal cloth. No wall, no window, no ceiling, no tools on the ladder.
> `+ POSTAVA + BASE`

## F7: leští zrcadlo

> A figure facing a tall rounded rectangle and polishing it, and inside that rectangle the same silhouette appears mirrored as clean negative space.
> Navy figure, petrol teal frame, the reflection is white negative space. No frame ornament, no sparkle, no room behind.
> `+ POSTAVA + BASE`

## F8: dvojice v týmu

> Two figures standing back to back, one holding a cloth raised, the other holding a mop lowered, their silhouettes together filling a rough circle.
> One figure navy, the other petrol teal. No circle drawn around them, no third person, no equipment on the floor.
> `+ POSTAVA + BASE`

## F9: vytřepává utěrku

> A figure holding one corner of a large cloth and snapping it, so the cloth whips into a single bold curved shape that fills the upper half of the mark.
> Navy figure, petrol teal cloth. No dust particles, no window, no laundry line.
> `+ POSTAVA + BASE`

## F10: předává klíče

> A figure standing upright, one arm extended forward offering a single chunky key, posture calm and finished, as if the work is done.
> Navy figure, petrol teal key. No door, no keyring, no second hand receiving, no sparkle.
> `+ POSTAVA + BASE`

## P9: variace z vybraného kusu

Nahraj vybraný obrázek jako referenci a pošli:

> Using the attached image as the reference mark, generate six variations of this same symbol arranged in a 2x3 grid. Keep the core concept, the two-color palette and the flat vector construction identical. Vary only: stroke weight, how open or closed the silhouette is, the angle of the main element, and how much negative space the mark contains. Each variation must stay a single coherent mark that works at 32 pixels.
> `+ BASE`

## P10: když je značka hotová a chceš ji čistší

> Using the attached image as the reference mark, redraw the same symbol with maximum geometric discipline: perfect circles, consistent stroke weight throughout, aligned angles at 45 and 90 degrees, and clean tangent joins between shapes. Preserve the concept, proportions and palette exactly. Remove every incidental detail that does not carry meaning.
> `+ BASE`

---

## Co udělám já, až vybereš

1. Symbol překreslím do **SVG** (vtracer na tvary, ruční dočištění kotev) , bez toho logo neobstojí v hlavičce ani v tisku.
2. Přisadím nápis **skutečným fontem** z brandu, s pořádnou diakritikou a vyrovnáním.
3. Vyrobím varianty: vodorovný lockup, stohovaný, samotná ikona, jednobarevná verze pro razítko.
4. Otestuju na 32 px, na tmavém podkladu a v jedné barvě. Až tohle projde,, je to logo, ne obrázek.

## Brand paleta (drž ji v každém promptu)

| Role | Hex |
|---|---|
| Navy (hlavní) | `#0B3049` |
| Petrol (akcent) | `#177A8D` |
| Teal (světlejší akcent) | `#2F8FA6` |
| Sky (podklady) | `#EAF3F8` |
| Bílá | `#FFFFFF` |
