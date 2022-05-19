define("_", ["utils", "encrypt"], ({ useState }, encoders) => {
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
    document.querySelector("#sourceSelector").innerHTML = `${newVal.meta.name}`;
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
});
