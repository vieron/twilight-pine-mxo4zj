console.log(Blotter);

function rangeInt(max) {
  const random = new Math.seedrandom("hello.");

  return Math.floor(random.quick() * max);
}

function range(min, max) {
  return Math.random() * (min - max) + max;
}

function blotterize(selector) {
  const parentEl = document.querySelector(selector);
  const childEls = parentEl.querySelectorAll("span");
  const lines = Array.from(childEls).map((el) => el.innerText);

  parentEl.classList.add("blotter-text");

  const paddingV = 40;

  const blotterTexts = lines.map(
    (text) =>
      new Blotter.Text(text, {
        family: "'YoungSerif', 'Hoefler Text Black', 'EB Garamond', serif",
        size: 100,
        leading: 1,
        fill: "#FB3640",
        paddingTop: paddingV,
        paddingBottom: paddingV,
        paddingLeft: 120,
        paddingRight: 220,
        // paddinBottom:
      })
  );

  const material = new Blotter.LiquidDistortMaterial();

  // Play with the value for uSpeed. Lower values slow
  // down animation, while higher values speed it up. At
  // a speed of 0.0, animation is stopped entirely.
  material.uniforms.uSpeed.value = 0;
  3;

  // Try uncommenting the following line to play with
  // the "volatility" of the effect. Higher values here will
  // produce more dramatic changes in the appearance of your
  // text as it animates, but you will likely want to keep
  // the value below 1.0.
  material.uniforms.uVolatility.value = 0.2;

  // only applies if uSpeed > 0
  material.uniforms.uSeed.value = 366.5;

  const blotter = new Blotter(material, {
    texts: blotterTexts,
  });

  const scopes = blotterTexts.map((blotterText) => {
    return blotter.forText(blotterText);
  });

  childEls.forEach((span, index) => {
    const hidden = document.createElement("span");
    hidden.style.display = "none";
    hidden.innerText = span.innerText;

    span.childNodes[0].replaceWith(hidden);
    scopes[index].appendTo(span);

    if (index > 0) {
      span.style.position = "relative";
      span.style.marginTop = `-${paddingV * index * 2}px`;
    }

    span.classList.add("blotter-text-fragment");
  });
}

blotterize("#distortion-text");
