const grid = document.getElementById("grid");
const search = document.getElementById("search");
const select = document.getElementById("select");

let countries = [];

// 🔥 ЗӨВ load function
async function loadCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");

    if (!res.ok) throw new Error("API error");

    countries = await res.json();

    // 🔽 Select дээр бүх улс нэмэх
    countries
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .forEach(c => {
        const option = document.createElement("option");
        option.value = c.name.common;
        option.textContent = c.name.common;
        select.appendChild(option);
      });

    // 🔥 Эхэнд нь бүгдийг харуул
    render(countries);

  } catch (err) {
    console.error(err);
    alert("Улсууд ачааллахгүй байна 😢 Internet шалга!");
  }
}

loadCountries();

// 🎴 render function
function render(list) {
  grid.innerHTML = "";

  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${c.flags.png}">
      <h3>${c.name.common}</h3>
      <p>${c.region}</p>
      <p>👥 ${c.population.toLocaleString()}</p>
    `;

    grid.appendChild(div);
  });
}

// 🔍 SEARCH
search.addEventListener("input", () => {
  const val = search.value.toLowerCase();

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(val)
  );

  render(filtered);
});

// 📋 SELECT
select.addEventListener("change", () => {
  const val = select.value;

  if (!val) {
    render(countries);
    return;
  }

  const filtered = countries.filter(c =>
    c.name.common === val
  );

  render(filtered);
});