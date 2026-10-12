(function () {
  const NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, kids) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(function (pair) {
        if (pair[0] === "class") node.className = pair[1];
        else if (pair[0] === "text") node.textContent = pair[1];
        else node.setAttribute(pair[0], pair[1]);
      });
    }
    (kids || []).forEach(function (kid) {
      if (kid) node.appendChild(kid);
    });
    return node;
  }

  function svg(name, attrs) {
    const node = document.createElementNS(NS, name);
    Object.entries(attrs || {}).forEach(function (pair) {
      node.setAttribute(pair[0], pair[1]);
    });
    return node;
  }

  function fmt(n, digits) {
    if (n === null || n === undefined || Number.isNaN(n) || !Number.isFinite(n)) return "nicht berechenbar";
    return Number(n).toLocaleString("de-DE", {
      maximumFractionDigits: digits === undefined ? 2 : digits,
      minimumFractionDigits: 0
    });
  }

  function pct(x) {
    if (x === null || !Number.isFinite(x)) return "nicht berechenbar";
    return (100 * x).toLocaleString("de-DE", { maximumFractionDigits: 1 }) + " %";
  }

  function stat(label, value) {
    return el("div", { class: "stat" }, [
      el("span", { text: label }),
      el("b", { text: value })
    ]);
  }

  function gauss() {
    let u = 0;
    let v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gaussRand(rand) {
    let u = rand();
    const v = rand();
    if (u < 1e-9) u = 1e-9;
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function median(sorted) {
    const n = sorted.length;
    if (!n) return null;
    const mid = Math.floor(n / 2);
    if (n % 2) return sorted[mid];
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  function quartiles(sorted) {
    const n = sorted.length;
    const mid = Math.floor(n / 2);
    const lower = sorted.slice(0, n % 2 ? mid : mid);
    const upper = sorted.slice(n % 2 ? mid + 1 : mid);
    return {
      q1: median(lower),
      q2: median(sorted),
      q3: median(upper)
    };
  }

  function skewDensity(s) {
    const xs = [];
    const ys = [];
    const mode = 0.42 - s * 0.12;
    const tail = 0.5 + Math.sign(s || 1) * 0.38;
    for (let i = 0; i <= 240; i += 1) {
      const x = i / 240;
      const core = Math.exp(-0.5 * ((x - mode) / 0.07) ** 2);
      const extra = Math.abs(s) * 0.7 * Math.exp(-0.5 * ((x - tail) / 0.1) ** 2);
      const y = core + extra;
      xs.push(x);
      ys.push(y);
    }
    const total = ys.reduce(function (a, b) { return a + b; }, 0);
    let mean = 0;
    for (let i = 0; i < ys.length; i += 1) mean += xs[i] * ys[i];
    mean /= total;
    let acc = 0;
    let med = xs[xs.length - 1];
    for (let i = 0; i < ys.length; i += 1) {
      acc += ys[i];
      if (acc / total >= 0.5) {
        med = xs[i];
        break;
      }
    }
    return { xs: xs, ys: ys, mean: mean, median: med };
  }

  function mountSkew(root) {
    root.appendChild(el("h3", { text: "Schiefe: Mittelwert und Median" }));
    root.appendChild(el("p", { class: "hint", text: "Schieb den Regler. Der Mittelwert folgt dem langen Schwanz, der Median bleibt in der Mitte der Werte." }));
    const label = el("label", { text: "Schiefe" });
    const range = el("input", { type: "range", min: "-100", max: "100", value: "55", class: "slider" });
    label.appendChild(range);
    const controls = el("div", { class: "controls" }, [label]);
    root.appendChild(controls);
    const picture = el("div");
    const read = el("p");
    const stats = el("div", { class: "stats" });
    root.appendChild(picture);
    root.appendChild(stats);
    root.appendChild(read);

    function draw() {
      const s = Number(range.value) / 100;
      const d = skewDensity(s);
      const w = 640;
      const h = 250;
      const pad = 36;
      const maxY = Math.max.apply(null, d.ys);
      const pictureSvg = svg("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": "Dichtekurve mit Mittelwert und Median" });
      const path = [];
      d.xs.forEach(function (x, i) {
        const px = pad + x * (w - pad * 2);
        const py = h - pad - (d.ys[i] / maxY) * (h - pad * 2);
        path.push((i === 0 ? "M" : "L") + px.toFixed(1) + " " + py.toFixed(1));
      });
      path.push("L" + (w - pad) + " " + (h - pad) + " L" + pad + " " + (h - pad) + " Z");
      pictureSvg.appendChild(svg("path", { d: path.join(" "), fill: "#d9efe9", stroke: "#0e5c56", "stroke-width": "2" }));
      function mark(x, color, name) {
        const px = pad + x * (w - pad * 2);
        pictureSvg.appendChild(svg("line", { x1: px, y1: pad, x2: px, y2: h - pad, stroke: color, "stroke-width": "2" }));
        const t = svg("text", { x: px + 6, y: pad + 14, fill: color, "font-size": "14" });
        t.textContent = name;
        pictureSvg.appendChild(t);
      }
      mark(d.median, "#9c341f", "Median");
      mark(d.mean, "#0e5c56", "Mittelwert");
      picture.replaceChildren(pictureSvg);
      stats.replaceChildren(
        stat("Mittelwert", fmt(d.mean * 100, 1)),
        stat("Median", fmt(d.median * 100, 1))
      );
      let sentence = "Fast symmetrisch: Mittelwert und Median liegen beieinander.";
      if (s > 0.12) sentence = "Rechtsschief: der Mittelwert liegt über dem Median, weil der rechte Schwanz ihn zieht.";
      if (s < -0.12) sentence = "Linksschief: der Mittelwert liegt unter dem Median.";
      read.textContent = sentence;
    }
    range.addEventListener("input", draw);
    draw();
  }

  function phi(x) {
    return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
  }

  function integrate(a, b) {
    const steps = 240;
    const h = (b - a) / steps;
    let sum = 0;
    for (let i = 0; i < steps; i += 1) sum += phi(a + (i + 0.5) * h) * h;
    return sum;
  }

  function mountNormal(root) {
    root.appendChild(el("h3", { text: "Normalverteilung" }));
    root.appendChild(el("p", { class: "hint", text: "Eine Normalverteilung ist symmetrisch. Mittelwert, Median und Modus fallen zusammen." }));
    const band = el("select");
    [["1", "Band ±1 SD"], ["2", "Band ±2 SD"], ["196", "95-Prozent-Quantil ±1,96"]].forEach(function (opt) {
      band.appendChild(el("option", { value: opt[0], text: opt[1] }));
    });
    band.value = "2";
    const controls = el("div", { class: "controls" }, [el("label", { text: "Bereich" }, [band])]);
    const picture = el("div");
    const read = el("p");
    root.appendChild(controls);
    root.appendChild(picture);
    root.appendChild(read);

    function draw() {
      const mode = band.value;
      const limit = mode === "1" ? 1 : mode === "2" ? 2 : 1.96;
      const w = 640;
      const h = 250;
      const pad = 32;
      const xMin = -4;
      const xMax = 4;
      const yMax = phi(0);
      function X(x) { return pad + ((x - xMin) / (xMax - xMin)) * (w - pad * 2); }
      function Y(y) { return 16 + (1 - y / yMax) * (h - pad - 16); }
      const pictureSvg = svg("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": "Glockenkurve mit markiertem Streuband" });
      const shade = ["M" + X(-limit).toFixed(1) + " " + Y(0).toFixed(1)];
      for (let i = 0; i <= 80; i += 1) {
        const x = -limit + (2 * limit * i) / 80;
        shade.push("L" + X(x).toFixed(1) + " " + Y(phi(x)).toFixed(1));
      }
      shade.push("L" + X(limit).toFixed(1) + " " + Y(0).toFixed(1) + " Z");
      pictureSvg.appendChild(svg("path", { d: shade.join(" "), fill: "#d9efe9" }));
      const line = [];
      for (let i = 0; i <= 120; i += 1) {
        const x = xMin + ((xMax - xMin) * i) / 120;
        line.push((i === 0 ? "M" : "L") + X(x).toFixed(1) + " " + Y(phi(x)).toFixed(1));
      }
      pictureSvg.appendChild(svg("path", { d: line.join(" "), fill: "none", stroke: "#0e5c56", "stroke-width": "2.5" }));
      [-limit, 0, limit].forEach(function (x) {
        pictureSvg.appendChild(svg("line", {
          x1: X(x), y1: Y(0), x2: X(x), y2: Y(0) + 8, stroke: "#1c2430", "stroke-width": "1.5"
        }));
        const t = svg("text", { x: X(x) - 12, y: h - 8, "font-size": "13", fill: "#1c2430" });
        t.textContent = fmt(x, 2);
        pictureSvg.appendChild(t);
      });
      picture.replaceChildren(pictureSvg);
      const share = integrate(-limit, limit);
      const name = mode === "1" ? "±1 SD" : mode === "2" ? "±2 SD" : "±1,96 SD";
      read.textContent = "Im Band " + name + " liegen etwa " + pct(share) + " der Werte. In der Klausur reicht: etwa 68 Prozent innerhalb von ±1 SD und etwa 95 Prozent innerhalb von ±2 SD. Das Quantil 1,96 gehört zum exakten 95-Prozent-Bereich.";
    }
    band.addEventListener("change", draw);
    draw();
  }

  function parseNumbers(raw) {
    return raw
      .trim()
      .split(/\s+/)
      .map(function (part) { return Number(part.replace(",", ".")); })
      .filter(function (n) { return Number.isFinite(n); });
  }

  function mountBoxplot(root) {
    root.appendChild(el("h3", { text: "Boxplot aus eigenen Zahlen" }));
    root.appendChild(el("p", { class: "hint", text: "Trenne die Werte mit Leerzeichen. Dezimalpunkt, zum Beispiel 12.5." }));
    const field = el("input", { type: "text", value: "4 7 8 9 10 11 12 13 28", size: "36" });
    root.appendChild(el("div", { class: "controls" }, [el("label", { text: "Messwerte" }, [field])]));
    const picture = el("div");
    const stats = el("div", { class: "stats" });
    const read = el("p");
    root.appendChild(picture);
    root.appendChild(stats);
    root.appendChild(read);

    function draw() {
      const values = parseNumbers(field.value).sort(function (a, b) { return a - b; });
      if (values.length < 4) {
        picture.replaceChildren();
        stats.replaceChildren();
        read.textContent = "Mindestens vier Zahlen, dann gibt es Quartile.";
        return;
      }
      const q = quartiles(values);
      const iqr = q.q3 - q.q1;
      const fenceLo = q.q1 - 1.5 * iqr;
      const fenceHi = q.q3 + 1.5 * iqr;
      const inside = values.filter(function (v) { return v >= fenceLo && v <= fenceHi; });
      const whiskLo = Math.min.apply(null, inside);
      const whiskHi = Math.max.apply(null, inside);
      const outliers = values.filter(function (v) { return v < fenceLo || v > fenceHi; });
      const mean = values.reduce(function (a, b) { return a + b; }, 0) / values.length;
      const min = values[0];
      const max = values[values.length - 1];
      const w = 640;
      const h = 160;
      const pad = 28;
      const span = (max - min) || 1;
      function X(v) { return pad + ((v - min) / span) * (w - pad * 2); }
      const pictureSvg = svg("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": "Horizontaler Boxplot" });
      pictureSvg.appendChild(svg("line", { x1: X(whiskLo), y1: 70, x2: X(whiskHi), y2: 70, stroke: "#1c2430", "stroke-width": "2" }));
      [whiskLo, whiskHi].forEach(function (v) {
        pictureSvg.appendChild(svg("line", { x1: X(v), y1: 52, x2: X(v), y2: 88, stroke: "#1c2430", "stroke-width": "2" }));
      });
      pictureSvg.appendChild(svg("rect", {
        x: X(q.q1), y: 42, width: Math.max(2, X(q.q3) - X(q.q1)), height: 56,
        fill: "#d9efe9", stroke: "#0e5c56", "stroke-width": "2"
      }));
      pictureSvg.appendChild(svg("line", { x1: X(q.q2), y1: 42, x2: X(q.q2), y2: 98, stroke: "#9c341f", "stroke-width": "3" }));
      pictureSvg.appendChild(svg("circle", { cx: X(mean), cy: 70, r: 5, fill: "#0e5c56" }));
      outliers.forEach(function (v) {
        pictureSvg.appendChild(svg("circle", { cx: X(v), cy: 70, r: 5, fill: "none", stroke: "#9c341f", "stroke-width": "2" }));
      });
      const caption = svg("text", { x: pad, y: 138, "font-size": "13", fill: "#5e6874" });
      caption.textContent = "Rote Linie: Median. Gefüllter Punkt: Mittelwert. Kreis: Ausreißer jenseits von 1,5 IQR.";
      pictureSvg.appendChild(caption);
      picture.replaceChildren(pictureSvg);
      stats.replaceChildren(
        stat("Minimum", fmt(min, 2)),
        stat("Q1", fmt(q.q1, 2)),
        stat("Median", fmt(q.q2, 2)),
        stat("Q3", fmt(q.q3, 2)),
        stat("Maximum", fmt(max, 2)),
        stat("IQR", fmt(iqr, 2)),
        stat("Mittelwert", fmt(mean, 2)),
        stat("Ausreißer", outliers.length ? outliers.map(function (v) { return fmt(v, 2); }).join(", ") : "keine")
      );
      read.textContent = mean > q.q2 + 0.05
        ? "Der Mittelwert liegt über dem Median. Ein hoher Ausreißer zieht ihn nach oben."
        : "Quartile teilen die geordnete Liste in vier gleich große Teile. Der IQR ist Q3 minus Q1, also die mittleren 50 Prozent.";
    }
    field.addEventListener("input", draw);
    draw();
  }

  function ratio(num, den) {
    if (!den) return null;
    return num / den;
  }

  function mountFourfold(root) {
    root.appendChild(el("h3", { text: "Vierfeldertafel" }));
    root.appendChild(el("p", { class: "hint", text: "Trag die vier Felder ein. Sensitivität und Spezifität beschreiben den Test. Die prädiktiven Werte brauchen die Prävalenz." }));
    function num(value) {
      return el("input", { type: "number", min: "0", step: "1", value: String(value) });
    }
    const rp = num(80);
    const fp = num(10);
    const fn = num(20);
    const rn = num(890);
    const prevOff = el("input", { type: "checkbox" });
    const controls = el("div", { class: "controls" }, [
      el("label", { text: "Richtig positiv" }, [rp]),
      el("label", { text: "Falsch positiv" }, [fp]),
      el("label", { text: "Falsch negativ" }, [fn]),
      el("label", { text: "Richtig negativ" }, [rn]),
      el("label", { text: "Prävalenz unbekannt lassen" }, [prevOff])
    ]);
    const grid = el("div", { class: "grid-2" });
    const stats = el("div", { class: "stats" });
    const read = el("p");
    root.appendChild(controls);
    root.appendChild(grid);
    root.appendChild(stats);
    root.appendChild(read);

    function draw() {
      const a = Math.max(0, Number(rp.value) || 0);
      const b = Math.max(0, Number(fp.value) || 0);
      const c = Math.max(0, Number(fn.value) || 0);
      const d = Math.max(0, Number(rn.value) || 0);
      const hidePrev = prevOff.checked;
      grid.replaceChildren(
        el("div", { class: "cell head" }),
        el("div", { class: "cell head", text: "krank" }),
        el("div", { class: "cell head", text: "gesund" }),
        el("div", { class: "cell head", text: "Test positiv" }),
        el("div", { class: "cell rp", text: fmt(a, 0) }),
        el("div", { class: "cell fp", text: hidePrev ? "?" : fmt(b, 0) }),
        el("div", { class: "cell head", text: "Test negativ" }),
        el("div", { class: "cell fn", text: fmt(c, 0) }),
        el("div", { class: "cell rn", text: hidePrev ? "?" : fmt(d, 0) })
      );
      const sens = ratio(a, a + c);
      const spec = hidePrev ? null : ratio(d, d + b);
      const ppv = hidePrev ? null : ratio(a, a + b);
      const npv = hidePrev ? null : ratio(d, c + d);
      const prev = hidePrev ? null : ratio(a + c, a + b + c + d);
      const lr = spec === null || spec === 1 ? null : (sens === null ? null : sens / (1 - spec));
      stats.replaceChildren(
        stat("Sensitivität", pct(sens)),
        stat("Spezifität", pct(spec)),
        stat("Positiver prädiktiver Wert", pct(ppv)),
        stat("Negativer prädiktiver Wert", pct(npv)),
        stat("Prävalenz", pct(prev)),
        stat("Likelihood Ratio +", lr === null ? "nicht berechenbar" : fmt(lr, 2))
      );
      read.textContent = hidePrev
        ? "Ohne die Gesunden fehlt die Prävalenz. Sensitivität geht noch, Spezifität und prädiktive Werte nicht."
        : "Sinkt die Prävalenz bei gleicher Sensitivität und Spezifität, sinkt der positive prädiktive Wert. Probier 80, 10, 20 und 890 gegen 80, 100, 20 und 50.";
    }
    [rp, fp, fn, rn].forEach(function (input) { input.addEventListener("input", draw); });
    prevOff.addEventListener("change", draw);
    draw();
  }

  function mountRisks(root) {
    root.appendChild(el("h3", { text: "Risiko, Odds Ratio, NNT" }));
    root.appendChild(el("p", { class: "hint", text: "Therapie gegen Kontrolle. ARR ist die absolute Differenz, NNT ist 1 geteilt durch diese Differenz." }));
    function num(value) { return el("input", { type: "number", min: "0", step: "1", value: String(value) }); }
    const eT = num(10);
    const nT = num(200);
    const eC = num(20);
    const nC = num(200);
    root.appendChild(el("div", { class: "controls" }, [
      el("label", { text: "Ereignisse Therapie" }, [eT]),
      el("label", { text: "Anzahl Therapie" }, [nT]),
      el("label", { text: "Ereignisse Kontrolle" }, [eC]),
      el("label", { text: "Anzahl Kontrolle" }, [nC])
    ]));
    const stats = el("div", { class: "stats" });
    const read = el("p");
    root.appendChild(stats);
    root.appendChild(read);

    function draw() {
      const a = Math.max(0, Number(eT.value) || 0);
      const n1 = Math.max(0, Number(nT.value) || 0);
      const c = Math.max(0, Number(eC.value) || 0);
      const n0 = Math.max(0, Number(nC.value) || 0);
      const r1 = ratio(a, n1);
      const r0 = ratio(c, n0);
      const rr = r1 === null || !r0 ? null : r1 / r0;
      const or = (n1 - a) > 0 && (n0 - c) > 0 && c > 0 ? (a / (n1 - a)) / (c / (n0 - c)) : null;
      const arr = r1 === null || r0 === null ? null : r0 - r1;
      const rrr = arr === null || !r0 ? null : arr / r0;
      let nnt = "nicht berechenbar";
      if (arr !== null && arr > 0) nnt = fmt(1 / arr, 1);
      if (arr !== null && arr < 0) nnt = "Schaden, NNH " + fmt(1 / Math.abs(arr), 1);
      if (arr === 0) nnt = "kein Unterschied";
      stats.replaceChildren(
        stat("Risiko Therapie", pct(r1)),
        stat("Risiko Kontrolle", pct(r0)),
        stat("Relatives Risiko", rr === null ? "nicht berechenbar" : fmt(rr, 2)),
        stat("Odds Ratio", or === null ? "nicht berechenbar" : fmt(or, 2)),
        stat("Absolute Risikoreduktion", pct(arr)),
        stat("Relative Risikoreduktion", pct(rrr)),
        stat("NNT", nnt)
      );
      read.textContent = "RR = 1 und OR = 1 heißen: kein Unterschied. Ein großes relatives Risiko bei sehr kleinem Ausgangsrisiko kann eine winzige absolute Differenz sein. Dann wird die NNT groß.";
    }
    [eT, nT, eC, nC].forEach(function (input) { input.addEventListener("input", draw); });
    draw();
  }

  function mountCi(root) {
    root.appendChild(el("h3", { text: "Was ein 95-Prozent-Konfidenzintervall tut" }));
    root.appendChild(el("p", { class: "hint", text: "Wahrer Mittelwert 170, bekannte Streuung 10. Jede Linie ist eine neue Stichprobe. Grün trifft den wahren Wert, rot verfehlt ihn." }));
    const nInput = el("input", { type: "range", min: "15", max: "200", value: "30", class: "slider" });
    const again = el("button", { class: "btn", type: "button", text: "Neue Ziehung" });
    const nLabel = el("span", { text: "n = 30" });
    root.appendChild(el("div", { class: "controls" }, [
      el("label", { text: "Stichprobengröße" }, [nInput, nLabel]),
      again
    ]));
    const picture = el("div");
    const read = el("p");
    root.appendChild(picture);
    root.appendChild(read);

    function draw() {
      const n = Number(nInput.value);
      nLabel.textContent = "n = " + n;
      const mu = 170;
      const sigma = 10;
      const rows = [];
      for (let i = 0; i < 24; i += 1) {
        let sum = 0;
        for (let k = 0; k < n; k += 1) sum += mu + sigma * gauss();
        const mean = sum / n;
        const half = 1.96 * sigma / Math.sqrt(n);
        rows.push({ lo: mean - half, hi: mean + half, hit: mean - half <= mu && mu <= mean + half });
      }
      const hits = rows.filter(function (row) { return row.hit; }).length;
      let lo = mu - 12;
      let hi = mu + 12;
      rows.forEach(function (row) {
        lo = Math.min(lo, row.lo);
        hi = Math.max(hi, row.hi);
      });
      const w = 640;
      const h = 360;
      const pad = 36;
      function X(v) { return pad + ((v - lo) / (hi - lo)) * (w - pad * 2); }
      const pictureSvg = svg("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": "Vierundzwanzig Konfidenzintervalle um einen wahren Mittelwert" });
      pictureSvg.appendChild(svg("line", { x1: X(mu), y1: 16, x2: X(mu), y2: h - 28, stroke: "#1c2430", "stroke-dasharray": "4 4" }));
      const title = svg("text", { x: X(mu) + 6, y: 18, "font-size": "13", fill: "#1c2430" });
      title.textContent = "wahrer Mittelwert";
      pictureSvg.appendChild(title);
      rows.forEach(function (row, i) {
        const y = 32 + i * 12.4;
        const color = row.hit ? "#1c7a4a" : "#9c341f";
        pictureSvg.appendChild(svg("line", { x1: X(row.lo), y1: y, x2: X(row.hi), y2: y, stroke: color, "stroke-width": "3" }));
      });
      picture.replaceChildren(pictureSvg);
      read.textContent = hits + " von 24 Intervallen enthalten den wahren Mittelwert. Bei vielen Wiederholungen sind es etwa 95 Prozent. Dieses eine Intervall aus einer Studie hat den Wert entweder drin oder nicht. Ein größeres n macht die Linien kürzer.";
    }
    nInput.addEventListener("input", draw);
    again.addEventListener("click", draw);
    draw();
  }

  function mountErrors(root) {
    root.appendChild(el("h3", { text: "Fehler 1. Art, Fehler 2. Art, Power" }));
    root.appendChild(el("p", { class: "hint", text: "Klick ein Feld an." }));
    const info = el("p", { text: "Die Zeile ist deine Entscheidung, die Spalte die Wahrheit." });
    const grid = el("div", { class: "error-grid" });
    const cells = [
      { title: "H0 abgelehnt, H0 ist wahr", body: "Fehler 1. Art, Wahrscheinlichkeit α. Du behauptest einen Effekt, den es nicht gibt." },
      { title: "H0 abgelehnt, H0 ist falsch", body: "Richtige Entscheidung. Power = 1 − β. Die Studie hat den vorhandenen Effekt erkannt." },
      { title: "H0 behalten, H0 ist wahr", body: "Richtige Entscheidung. Es gibt keinen Effekt, und du behauptest auch keinen." },
      { title: "H0 behalten, H0 ist falsch", body: "Fehler 2. Art, Wahrscheinlichkeit β. Der Effekt ist da, die Studie hat ihn verpasst." }
    ];
    grid.appendChild(el("div", { class: "corner" }));
    grid.appendChild(el("div", { class: "cell head", text: "H0 wahr" }));
    grid.appendChild(el("div", { class: "cell head", text: "H0 falsch" }));
    grid.appendChild(el("div", { class: "cell head", text: "H0 abgelehnt" }));
    cells.slice(0, 2).forEach(add);
    grid.appendChild(el("div", { class: "cell head", text: "H0 behalten" }));
    cells.slice(2).forEach(add);
    function add(cell) {
      const button = el("button", { type: "button", text: cell.title });
      button.addEventListener("click", function () { info.textContent = cell.body; });
      grid.appendChild(button);
    }
    root.appendChild(grid);
    root.appendChild(info);
  }

  const testTree = {
    q: "Was vergleichst du?",
    options: [
      {
        label: "Einen Mittelwert mit einem Sollwert",
        next: {
          q: "Sind die Werte ungefähr normalverteilt?",
          options: [
            { label: "Ja", result: "Einstichproben-t-Test", detail: "Ein normalverteilter Mittelwert gegen einen festgelegten Wert." },
            { label: "Nein", result: "Vorzeichentest oder Wilcoxon-Vorzeichen-Rang-Test", detail: "Für einen stetigen Mittelwert ohne Normalverteilung. Ein Anteil gehört nicht hierher." }
          ]
        }
      },
      {
        label: "Einen Anteil mit einem Sollwert",
        result: "Binomialtest oder Chi-Quadrat-Test",
        detail: "Ein Anteil, zum Beispiel der Anteil Geheilter, gegen einen festgelegten Wert."
      },
      {
        label: "Zwei Gruppen, stetige Messwerte",
        next: {
          q: "Dieselben Personen vorher und nachher, oder gematchte Paare?",
          options: [
            {
              label: "Ja, verbunden",
              next: {
                q: "Normalverteilt?",
                options: [
                  { label: "Ja", result: "t-Test für verbundene Stichproben", detail: "Die Differenz innerhalb der Paare ist das, was getestet wird." },
                  { label: "Nein", result: "Wilcoxon-Vorzeichen-Rang-Test", detail: "Die rangbasierte Variante für gepaarte stetige Werte." }
                ]
              }
            },
            {
              label: "Nein, unabhängig",
              next: {
                q: "Normalverteilt?",
                options: [
                  { label: "Ja", result: "t-Test für unverbundene Stichproben", detail: "Zwei getrennte Gruppen, stetig und ungefähr normalverteilt." },
                  { label: "Nein", result: "Mann-Whitney-U-Test", detail: "Zwei unabhängige Gruppen, stetig, ohne Normalverteilung." }
                ]
              }
            }
          ]
        }
      },
      {
        label: "Zwei kategoriale Merkmale",
        next: {
          q: "Wie groß sind die erwarteten Häufigkeiten?",
          options: [
            { label: "Ausreichend groß", result: "Chi-Quadrat-Test", detail: "Unabhängigkeit zweier kategorialer Merkmale." },
            { label: "Klein, Vierfeldertafel", result: "Exakter Test nach Fisher", detail: "Dieselbe Frage wie der Chi-Quadrat-Test, wenn die Zahlen klein sind." }
          ]
        }
      }
    ]
  };

  function mountTests(root) {
    root.appendChild(el("h3", { text: "Welcher Test?" }));
    const box = el("div");
    root.appendChild(box);

    function show(node, trail) {
      box.replaceChildren();
      if (trail.length) {
        box.appendChild(el("p", { class: "hint", text: trail.join(" · ") }));
      }
      if (node.result) {
        box.appendChild(el("h3", { text: node.result }));
        box.appendChild(el("p", { text: node.detail }));
      } else {
        box.appendChild(el("p", { text: node.q }));
        const options = el("div", { class: "options" });
        node.options.forEach(function (opt) {
          const button = el("button", { type: "button", text: opt.label });
          button.addEventListener("click", function () {
            show(opt.result ? opt : opt.next, trail.concat(opt.label));
          });
          options.appendChild(button);
        });
        box.appendChild(options);
      }
      const back = el("button", { class: "btn secondary", type: "button", text: "Von vorn" });
      back.addEventListener("click", function () { show(testTree, []); });
      box.appendChild(el("div", { class: "row-actions" }, [back]));
    }
    show(testTree, []);
  }

  function mountScatter(root) {
    root.appendChild(el("h3", { text: "Korrelation und Gerade" }));
    root.appendChild(el("p", { class: "hint", text: "Der Regler setzt den linearen Zusammenhang. Die Gerade ist die beste Gerade durch die Punkte." }));
    const range = el("input", { type: "range", min: "-100", max: "100", value: "70", class: "slider" });
    root.appendChild(el("div", { class: "controls" }, [el("label", { text: "Vorgegebene Korrelation" }, [range])]));
    const picture = el("div");
    const read = el("p");
    root.appendChild(picture);
    root.appendChild(read);
    const rand = mulberry32(2026);
    const baseX = [];
    const noise = [];
    for (let i = 0; i < 48; i += 1) {
      baseX.push(gaussRand(rand));
      noise.push(gaussRand(rand));
    }

    function draw() {
      const r = Number(range.value) / 100;
      const scale = Math.sqrt(Math.max(0, 1 - r * r));
      const xs = baseX.slice();
      const ys = baseX.map(function (x, i) { return r * x + scale * noise[i]; });
      const n = xs.length;
      const mx = xs.reduce(function (a, b) { return a + b; }, 0) / n;
      const my = ys.reduce(function (a, b) { return a + b; }, 0) / n;
      let num = 0;
      let dx = 0;
      let dy = 0;
      for (let i = 0; i < n; i += 1) {
        const vx = xs[i] - mx;
        const vy = ys[i] - my;
        num += vx * vy;
        dx += vx * vx;
        dy += vy * vy;
      }
      const pearson = num / Math.sqrt(dx * dy);
      const slope = num / dx;
      const intercept = my - slope * mx;
      const w = 640;
      const h = 320;
      const pad = 28;
      function X(v) { return pad + ((v + 3.2) / 6.4) * (w - pad * 2); }
      function Y(v) { return h - pad - ((v + 3.2) / 6.4) * (h - pad * 2); }
      const pictureSvg = svg("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": "Streudiagramm mit Regressionsgerade" });
      xs.forEach(function (x, i) {
        pictureSvg.appendChild(svg("circle", { cx: X(x), cy: Y(ys[i]), r: 4.5, fill: "#0e5c56" }));
      });
      const x1 = -3;
      const x2 = 3;
      pictureSvg.appendChild(svg("line", {
        x1: X(x1), y1: Y(intercept + slope * x1), x2: X(x2), y2: Y(intercept + slope * x2),
        stroke: "#9c341f", "stroke-width": "2.5"
      }));
      picture.replaceChildren(pictureSvg);
      const direction = pearson > 0.15 ? "steigend" : pearson < -0.15 ? "fallend" : "kaum linear";
      read.textContent = "Pearson r ≈ " + fmt(pearson, 2) + ", Zusammenhang " + direction + ". Die Steigung sagt, um wie viel y steigt, wenn x um eins steigt. r nahe 1 ist eine enge Gerade und kein Beweis für eine Ursache. Spearman wäre der Rangzusammenhang, passend bei Ausreißern und ordinalen Daten.";
    }
    range.addEventListener("input", draw);
    draw();
  }

  function kaplan(rows) {
    const times = Array.from(new Set(rows.map(function (row) { return row.t; }))).sort(function (a, b) { return a - b; });
    let s = 1;
    const steps = [{ t: 0, s: 1, n: rows.length, d: 0 }];
    times.forEach(function (t) {
      const risk = rows.filter(function (row) { return row.t >= t; }).length;
      const deaths = rows.filter(function (row) { return row.t === t && row.event; }).length;
      if (deaths > 0 && risk > 0) {
        s *= 1 - deaths / risk;
        steps.push({ t: t, s: s, n: risk, d: deaths });
      }
    });
    return steps;
  }

  function mountKaplan(root) {
    root.appendChild(el("h3", { text: "Kaplan-Meier-Kurve" }));
    root.appendChild(el("p", { class: "hint", text: "Ein Ereignis senkt die Stufe. Eine Zensierung senkt sie nicht, nimmt die Person aber danach aus der Risikomenge." }));
    let rows = [
      { t: 2, event: true },
      { t: 4, event: false },
      { t: 5, event: true },
      { t: 6, event: true },
      { t: 9, event: false },
      { t: 12, event: true },
      { t: 16, event: false },
      { t: 20, event: true }
    ];
    const month = el("input", { type: "number", min: "0", max: "60", value: "8" });
    const addEvent = el("button", { class: "btn", type: "button", text: "Ereignis" });
    const addCensor = el("button", { class: "btn secondary", type: "button", text: "Zensierung" });
    const reset = el("button", { class: "btn secondary", type: "button", text: "Beispiel" });
    root.appendChild(el("div", { class: "controls" }, [
      el("label", { text: "Monat" }, [month]),
      addEvent,
      addCensor,
      reset
    ]));
    const picture = el("div");
    const list = el("ul", { class: "person-list" });
    const tableWrap = el("div", { class: "table-wrap" });
    const read = el("p");
    root.appendChild(picture);
    root.appendChild(list);
    root.appendChild(tableWrap);
    root.appendChild(read);

    function draw() {
      const steps = kaplan(rows);
      const horizon = Math.max(24, rows.reduce(function (m, row) { return Math.max(m, row.t); }, 0));
      const w = 640;
      const h = 280;
      const padL = 44;
      const padR = 16;
      const padT = 16;
      const padB = 32;
      function X(t) { return padL + (t / horizon) * (w - padL - padR); }
      function Y(s) { return padT + (1 - s) * (h - padT - padB); }
      const pictureSvg = svg("svg", { viewBox: "0 0 " + w + " " + h, role: "img", "aria-label": "Kaplan-Meier-Stufenkurve" });
      pictureSvg.appendChild(svg("line", { x1: padL, y1: Y(0.5), x2: w - padR, y2: Y(0.5), stroke: "#e3daca", "stroke-dasharray": "4 4" }));
      const half = svg("text", { x: 4, y: Y(0.5) + 4, "font-size": "12", fill: "#5e6874" });
      half.textContent = "50 %";
      pictureSvg.appendChild(half);
      let d = "M" + X(0) + " " + Y(1);
      steps.forEach(function (step, i) {
        if (i === 0) return;
        const prev = steps[i - 1].s;
        d += " L" + X(step.t) + " " + Y(prev) + " L" + X(step.t) + " " + Y(step.s);
      });
      const last = steps[steps.length - 1];
      d += " L" + X(horizon) + " " + Y(last.s);
      pictureSvg.appendChild(svg("path", { d: d, fill: "none", stroke: "#0e5c56", "stroke-width": "2.5" }));
      rows.filter(function (row) { return !row.event; }).forEach(function (row) {
        const sAt = steps.filter(function (step) { return step.t <= row.t; }).pop().s;
        pictureSvg.appendChild(svg("line", {
          x1: X(row.t), y1: Y(sAt) - 7, x2: X(row.t), y2: Y(sAt) + 7, stroke: "#c6a15a", "stroke-width": "2"
        }));
      });
      picture.replaceChildren(pictureSvg);
      list.replaceChildren();
      rows.slice().sort(function (a, b) { return a.t - b.t; }).forEach(function (row) {
        const item = el("li");
        item.appendChild(document.createTextNode("Monat " + row.t + (row.event ? " Ereignis" : " zensiert")));
        const remove = el("button", { type: "button", text: "×", "aria-label": "Eintrag entfernen" });
        remove.addEventListener("click", function () {
          rows = rows.filter(function (other) { return other !== row; });
          draw();
        });
        item.appendChild(remove);
        list.appendChild(item);
      });
      const table = el("table", { class: "km-table" });
      const head = el("tr");
      ["Zeit", "unter Risiko", "Ereignisse", "Anteil ohne Ereignis"].forEach(function (name) {
        head.appendChild(el("th", { text: name }));
      });
      table.appendChild(el("thead", {}, [head]));
      const body = el("tbody");
      steps.forEach(function (step) {
        body.appendChild(el("tr", {}, [
          el("td", { text: String(step.t) }),
          el("td", { text: String(step.n) }),
          el("td", { text: String(step.d) }),
          el("td", { text: pct(step.s) })
        ]));
      });
      table.appendChild(body);
      tableWrap.replaceChildren(table);
      const crossing = steps.find(function (step) { return step.s <= 0.5; });
      read.textContent = crossing
        ? "Medianes Überleben: die Kurve liegt ab Monat " + crossing.t + " bei oder unter 50 Prozent. Goldene Striche sind Zensierungen."
        : "Die Kurve bleibt über 50 Prozent. Ein medianes Überleben ist in diesem Verlauf nicht ablesbar. Goldene Striche sind Zensierungen.";
    }

    function add(event) {
      const t = Number(month.value);
      if (!Number.isFinite(t) || t < 0) return;
      rows.push({ t: t, event: event });
      draw();
    }
    addEvent.addEventListener("click", function () { add(true); });
    addCensor.addEventListener("click", function () { add(false); });
    reset.addEventListener("click", function () {
      rows = [
        { t: 2, event: true }, { t: 4, event: false }, { t: 5, event: true },
        { t: 6, event: true }, { t: 9, event: false }, { t: 12, event: true },
        { t: 16, event: false }, { t: 20, event: true }
      ];
      draw();
    });
    draw();
  }

  function mountDesigns(root, extra) {
    const items = (extra.items || []).map(function (item, index) {
      return { id: index, text: item.text, bin: item.bin, choice: "" };
    });
    root.appendChild(el("h3", { text: "Studiendesign zuordnen" }));
    root.appendChild(el("p", { class: "hint", text: "Wähl eine Karte, dann das Fach. Prüfen kommt erst danach." }));
    const pool = el("div", { class: "pool" });
    const bins = el("div", { class: "bins" });
    const names = [
      ["querschnitt", "Querschnitt"],
      ["fall", "Fall-Kontroll"],
      ["kohorte", "Kohorte"],
      ["rct", "Randomisierte Studie"]
    ];
    const binNodes = {};
    names.forEach(function (pair) {
      const box = el("div", { class: "bin" });
      box.appendChild(el("h4", { text: pair[1] }));
      box.addEventListener("click", function () { place(pair[0]); });
      binNodes[pair[0]] = box;
      bins.appendChild(box);
    });
    const check = el("button", { class: "btn", type: "button", text: "Prüfen" });
    const solve = el("button", { class: "btn secondary", type: "button", text: "Auflösen" });
    const read = el("p");
    let selected = null;
    let revealed = false;

    function paint() {
      pool.replaceChildren();
      Object.keys(binNodes).forEach(function (key) {
        const box = binNodes[key];
        box.replaceChildren(el("h4", { text: names.filter(function (pair) { return pair[0] === key; })[0][1] }));
      });
      items.forEach(function (item) {
        const chip = el("button", { class: "chip", type: "button", text: item.text });
        if (item === selected) chip.classList.add("is-selected");
        if (revealed) chip.classList.add(item.choice === item.bin ? "ok" : "bad");
        chip.addEventListener("click", function (event) {
          event.stopPropagation();
          selected = item;
          revealed = false;
          paint();
        });
        if (item.choice && binNodes[item.choice]) binNodes[item.choice].appendChild(chip);
        else pool.appendChild(chip);
      });
    }

    function place(bin) {
      if (!selected) return;
      selected.choice = bin;
      selected = null;
      revealed = false;
      read.textContent = "";
      paint();
    }

    check.addEventListener("click", function () {
      revealed = true;
      const right = items.filter(function (item) { return item.choice === item.bin; }).length;
      read.textContent = right + " von " + items.length + " sitzen.";
      paint();
    });
    solve.addEventListener("click", function () {
      items.forEach(function (item) { item.choice = item.bin; });
      revealed = true;
      read.textContent = "Jetzt liegt jede Karte im passenden Fach.";
      paint();
    });
    root.appendChild(pool);
    root.appendChild(bins);
    root.appendChild(el("div", { class: "row-actions" }, [check, solve]));
    root.appendChild(read);
    paint();
  }

  function mountMatch(root, extra) {
    root.appendChild(el("h3", { text: "Kürzel zuordnen" }));
    root.appendChild(el("p", { class: "hint", text: "Zieh ein Kürzel auf die Bedeutung oder tippe erst das Kürzel, dann das Feld an." }));
    const pool = el("div", { class: "pool" });
    const grid = el("div", { class: "match-grid" });
    const read = el("p");
    const again = el("button", { class: "btn secondary", type: "button", text: "Andere acht" });
    const check = el("button", { class: "btn", type: "button", text: "Prüfen" });
    let round = [];
    let slotDefs = [];
    let selected = null;
    let revealed = false;

    function deal() {
      round = shuffle(extra.pairs || []).slice(0, 8).map(function (pair) {
        return { term: pair.term, def: pair.def, placed: false };
      });
      slotDefs = round.map(function (item) { return item.def; });
      selected = null;
      revealed = false;
      read.textContent = "";
      paint();
    }

    function chipButton(item, inSlot) {
      const chip = el("button", { class: "chip", type: "button", text: item.term, draggable: inSlot ? "false" : "true" });
      if (item === selected) chip.classList.add("is-selected");
      if (revealed && inSlot) chip.classList.add(item.placed === item.def ? "ok" : "bad");
      chip.addEventListener("dragstart", function (event) {
        if (inSlot) return;
        event.dataTransfer.setData("text/plain", item.term);
        selected = item;
      });
      chip.addEventListener("click", function (event) {
        event.stopPropagation();
        if (inSlot) {
          item.placed = false;
          revealed = false;
        }
        selected = item;
        paint();
      });
      return chip;
    }

    function paint() {
      pool.replaceChildren();
      grid.replaceChildren();
      round.forEach(function (item) {
        if (!item.placed) pool.appendChild(chipButton(item, false));
      });
      slotDefs.forEach(function (def) {
        const slot = el("div", { class: "slot", role: "button", tabindex: "0", "aria-label": def });
        slot.appendChild(document.createTextNode(def));
        const sitting = round.find(function (item) { return item.placed === def; });
        if (sitting) slot.appendChild(chipButton(sitting, true));
        slot.addEventListener("dragover", function (event) { event.preventDefault(); });
        slot.addEventListener("drop", function (event) {
          event.preventDefault();
          if (selected) put(selected, def);
        });
        slot.addEventListener("click", function () {
          if (selected) put(selected, def);
        });
        grid.appendChild(slot);
      });
    }

    function put(item, def) {
      round.forEach(function (other) {
        if (other.placed === def) other.placed = false;
      });
      item.placed = def;
      selected = null;
      revealed = false;
      read.textContent = "";
      paint();
    }

    check.addEventListener("click", function () {
      revealed = true;
      const done = round.filter(function (item) { return item.placed; });
      const right = done.filter(function (item) { return item.placed === item.def; }).length;
      read.textContent = right + " von " + done.length + " gesetzten Kürzeln stimmen. " + (round.length - done.length) + " liegen noch oben.";
      paint();
    });
    again.addEventListener("click", deal);
    root.appendChild(pool);
    root.appendChild(grid);
    root.appendChild(el("div", { class: "row-actions" }, [check, again]));
    root.appendChild(read);
    deal();
  }

  function mountCards(root, extra) {
    const cards = extra.cards || [];
    let index = 0;
    let showBack = false;
    root.appendChild(el("h3", { text: "Karteikarten" }));
    const face = el("div", { class: "card-face" });
    const counter = el("span", { class: "hint" });
    const known = el("button", { class: "btn", type: "button", text: "Sitzt" });
    const again = el("button", { class: "btn secondary", type: "button", text: "Noch unsicher" });
    face.addEventListener("click", function () {
      showBack = !showBack;
      paint();
    });
    function paint() {
      const card = cards[index];
      face.replaceChildren();
      const label = el("p", { class: "hint", text: showBack ? "Bedeutung" : "Begriff · tippen zum Umdrehen" });
      const body = el("p", { class: showBack ? "back" : "", text: showBack ? card.back : card.front });
      face.appendChild(label);
      face.appendChild(body);
      counter.textContent = (index + 1) + " / " + cards.length;
    }
    function step(ok) {
      if (extra.onRate) extra.onRate(cards[index].front, ok);
      index = (index + 1) % cards.length;
      showBack = false;
      paint();
    }
    known.addEventListener("click", function () { step(true); });
    again.addEventListener("click", function () { step(false); });
    root.appendChild(face);
    const tools = el("div", { class: "card-tools" }, [counter]);
    const buttons = el("div", { class: "pair" });
    buttons.appendChild(again);
    buttons.appendChild(known);
    tools.appendChild(buttons);
    root.appendChild(tools);
    if (cards.length) paint();
  }

  const widgets = {
    skew: mountSkew,
    normal: mountNormal,
    boxplot: mountBoxplot,
    fourfold: mountFourfold,
    risks: mountRisks,
    ci: mountCi,
    errors: mountErrors,
    tests: mountTests,
    scatter: mountScatter,
    kaplan: mountKaplan,
    designs: mountDesigns,
    match: mountMatch,
    cards: mountCards
  };

  window.QB1Widgets = {
    mount: function (name, root, extra) {
      const fn = widgets[name];
      if (!fn) {
        root.textContent = "Diese Grafik fehlt.";
        return;
      }
      fn(root, extra || {});
    }
  };
}());
