const KEY = "exp4.steps";
let steps = JSON.parse(localStorage.getItem(KEY) || "[]");
let id = 1;
const $ = s => document.querySelector(s);
const save = () => localStorage.setItem(KEY, JSON.stringify(steps));

function render() {
  const tbody = $("#tableBody");
  tbody.innerHTML = "";
  steps.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>S-${i+1}</td>
        <td>${s.phase}</td>
        <td>${s.title}</td>
        <td>${s.owner}</td>
        <td><div class="progress" style="width:${s.progress}%;"></div></td>
        <td><button onclick="del(${i})">🗑</button></td>
      </tr>`;
  });
  const avg = steps.length ? Math.round(steps.reduce((a, b) => a + +b.progress, 0) / steps.length) : 0;
  $("#overall").innerHTML = `Overall Progress: ${avg}%`;
}
function del(i) {
  steps.splice(i, 1);
  save();
  render();
}

$("#stepForm").onsubmit = e => {
  e.preventDefault();
  steps.push({
    id: `S-${id++}`,
    phase: $("#phase").value,
    title: $("#title").value,
    owner: $("#owner").value,
    progress: $("#progress").value
  });
  save();
  e.target.reset();
  render();
};

render();
