define("_", ["utils", "encrypt"], ({ useState, bindInput }, encoders) => {
  const sourceMenu = (menus, onClick) => {
    const fragment = document.createElement("div");
    const elStr = menus
      .map((i) => {
        return `<div>
                  <h5>${i.group}</h5>
                  <ul>
                    ${i.items
                      .map(
                        ({ meta }) =>
                          '<li data-group="' +
                          i.group +
                          '" data-name="' +
                          meta.name +
                          '">' +
                          meta.name +
                          "</li>"
                      )
                      .join("")}
                  </ul>
                </div>`;
      })
      .join("");
    fragment.innerHTML = elStr;

    fragment.querySelectorAll("li").forEach((el) =>
      el.addEventListener("click", (e) => {
        const enc = menus
          ?.find((i) => i.group === el.dataset.group)
          ?.items.find((i) => i.meta.name === el.dataset.name);
        onClick(enc);
      })
    );

    return fragment;
  };

  encoders.forEach((e) => {
    const { meta } = e;
    console.group("encoder");
    console.group("a encryption is loaded...");
    console.group("e.name:", meta.name);
    console.group("e.describe:", meta.describe);
    console.groupEnd("encoder");
  });

  // state
  const curEncoder = useState(null, (oldVal, newVal) => {
    if (newVal == oldVal) return;

    // update attributes
    const els = Array.from(document.querySelectorAll("#sourceMenu li"));
    if (oldVal) {
      els
        .find((i) => i.dataset.name === oldVal.meta.name)
        .setAttribute("class", "");
    }
    els
      .find((i) => i.dataset.name === newVal.meta.name)
      .setAttribute("class", "active");

    // update text
    document.querySelector("#sourceSelector").innerHTML = `${
      newVal.meta.emoji
        ? '<span class="icon">' + newVal.meta.emoji + "</span>"
        : ""
    }${newVal.meta.name}`;
    document.querySelector("#sourceFrom").innerHTML = `${newVal.meta.from}`;
    document.querySelector("#sourceTo").innerHTML = `${newVal.meta.to}`;
    document.querySelector("#tips").setAttribute("title", newVal.meta.describe);
  });

  const queryHistory = useState([], () => {
    const fragment = document.createDocumentFragment();
    console.log("query", queryHistory);
    fragment.append(
      queryHistory.value.map((i) => {
        const el = document.createElement("div");
        el.setAttribute("class", "item");
        el.innerHTML = i.fromText;
        return el;
      })
    );

    document.querySelector("#history").innerHTML = queryHistory.value
      .map(
        (i) =>
          `<div class="item"><p class="title">${i.encoder.meta.name}:${i.encoder.meta.from}-${i.encoder.meta.to}</p><p>${i.fromText}</p> -> <p>${i.toText}</p></div>`
      )
      .join("");

    localStorage.setItem("history", JSON.stringify(queryHistory.value));
  });

  queryHistory.value = JSON.parse(localStorage.getItem("history")) ?? [];

  // to render
  const menuHash = encoders.reduce((acc, i) => {
    acc[i.meta.group ?? "未分组"] = [
      ...(acc[i.meta.group ?? "未分组"] ?? []),
      i,
    ];
    return acc;
  }, {});
  const menus = Object.entries(menuHash).map(([key, v]) => ({
    group: key,
    items: v,
  }));

  document
    .getElementById("sourceMenu")
    .append(sourceMenu(menus, (e) => (curEncoder.value = e)));

  const inputFromEl = document.getElementById("inputFrom");
  const inputToEl = document.getElementById("inputTo");

  bindInput(inputFromEl, (e) => {
    console.log("a", e.target.value);
    inputToEl.value = curEncoder.value.transform(e.target.value);
  });
  bindInput(inputToEl, (e) => {
    inputFromEl.value = curEncoder.value.transformBack(e.target.value);
  });

  const backup = () => {};

  inputFromEl.addEventListener("blur", () => {
    if (inputFromEl.value && inputToEl.value) {
      if (queryHistory.value.length > 100) {
        queryHistory.pop();
      }
      if (queryHistory.value[0]?.fromText === inputFromEl.value) return;
      queryHistory.value = [
        {
          fromText: inputFromEl.value,
          toText: inputToEl.value,
          encoder: curEncoder.value,
        },
        ...queryHistory.value,
      ];
    }
  });

  inputToEl.addEventListener("blur", () => {
    if (inputFromEl.value && inputToEl.value) {
      if (queryHistory.value.length > 100) {
        queryHistory.pop();
      }
      if (queryHistory.value[0]?.fromText === inputFromEl.value) return;
      queryHistory.value = [
        {
          fromText: inputFromEl.value,
          toText: inputToEl.value,
          encoder: curEncoder.value,
        },
        ...queryHistory.value,
      ];
    }
  });

  // set default encoder
  curEncoder.value = encoders[0];
});
