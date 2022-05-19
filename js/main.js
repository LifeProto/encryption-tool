define("_", ["encrypt"], (encoder) => {
  const sourceMenu = (menus, onClick) => {
    console.log("groups", menus);
    const fragment = document.createElement('div');

    const elStr = menus
      .map((i) => {
        return `<div>
                  <h5>${i.groupName}</h5>
                  <ul>
                    ${i.items
                      .map(({ meta }) => "<li>" + meta.name + "</li>")
                      .join("")}
                  </ul>
                </div>`;
      })
      .join("");
    fragment.innerHTML = elStr;

    fragment.querySelectorAll("li").forEach((el) =>
      el.addEventListener("click", (e) => {
        onClick(e);
      })
    );

    return fragment;
  };

  encoder.forEach((e) => {
    const { meta } = e;
    console.group("a encryption is loaded...");
    console.group("e.name:", meta.name);
    console.group("e.describe:", meta.describe);
    console.groupEnd();
  });

  // to render

  const menuHash = encoder.reduce((acc, i) => {
    acc[i.groupName ?? "未分组"] = [...(acc[i.groupName ?? "未分组"] ?? []), i];
    return acc;
  }, {});
  console.log("hash", menuHash);
  const menus = Object.entries(menuHash).map(([key, v]) => ({
    groupName: key,
    items: v,
  }));

  document
    .getElementById("sourceMenu")
    .append(sourceMenu(menus, (e) => alert(e)));
});
