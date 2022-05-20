define("_", ["utils", "encrypt"], ({ useState, bindInput }, encoders) => {
  const sourceMenu = (menus, onClick) => {
    const fragment = document.createElement("div");
    const elStr = menus
      .map((i) => {
        return `<div>
                  <h5>${i.groupName}</h5>
                  <ul>
                    ${i.items
                      .map(
                        ({ meta }) =>
                          '<li data-group="' +
                          i.groupName +
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
          ?.find((i) => i.groupName === el.dataset.group)
          ?.items.find((i) => i.meta.name === el.dataset.name);
        onClick(enc);
      })
    );

    return fragment;
  };

  encoders.forEach((e) => {
    const { meta } = e;
    console.group("a encryption is loaded...");
    console.group("e.name:", meta.name);
    console.group("e.describe:", meta.describe);
    console.groupEnd();
  });

  // state
  let curEncoder = useState(null, (oldVal, newVal) => {
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
    document.querySelector("#tips").innerHTML = newVal.meta.describe;
  });

  // to render
  const menuHash = encoders.reduce((acc, i) => {
    acc[i.groupName ?? "未分组"] = [...(acc[i.groupName ?? "未分组"] ?? []), i];
    return acc;
  }, {});
  const menus = Object.entries(menuHash).map(([key, v]) => ({
    groupName: key,
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

  // set default encoder
  curEncoder.value = encoders[0];
});
