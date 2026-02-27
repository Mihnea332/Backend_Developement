const buton = document.getElementById("butonTrimitere");
buton.addEventListener("click", async () => {
  const nume = document.getElementById("numePostare").value;
  const descriere = document.getElementById("descrierePostare").value;
  const varsta = Number(document.getElementById("varstaPostare").value);
  console.log("Datele colectate:", { nume, descriere, varsta });
  const date = {
    nume: nume,
    description: descriere,
    age: varsta,
  };
  try {
    const raspuns = await fetch("http://localhost:4000/api/v1/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nume,
        description: descriere,
        age: varsta,
      }),
    });
    const dateRezultat = await raspuns.json();
    if (raspuns.ok) {
      alert("Postare creata cu succes");
      document.getElementById("numePostare").value = "";
      document.getElementById("descrierePostare").value = "";
      document.getElementById("varstaPostare").value = "";
      incarcaPostari();
    } else alert("Eroare de la server:" + date.message);
    alert("Raspuns de la server:" + dateRezultat.message);
  } catch (error) {
    console.error("Something went wrong", error);
  }
});
async function incarcaPostari() {
  try {
    const raspuns = await fetch("http://localhost:4000/api/v1/post/getPosts");
    const postari = await raspuns.json();
    const container = document.getElementById("listaPostari");
    container.innerHTML = "";
    postari.forEach((post) => {
      const cardHtml = `
                <div style="border: 1px solid #ddd; padding: 15px; margin-top: 10px; border-radius: 8px; background: #f9f9f9;">
                    <h4>${post.name} <span style="color: #666; font-size: 0.8em;">(${post.age} ani)</span></h4>
                    <p>${post.description}</p>
                    <button onclick="stergePostare('${post._id}')" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Șterge</button>
                </div>
            `;
      container.innerHTML += cardHtml;
    });
  } catch (error) {
    console.error("Eroare la incarcarea listei", error);
  }
}
window.stergePostare = async function (id) {
  if (!confirm("Sigur vrei sa stergi aceasta postare?")) return;
  try {
    const raspuns = await fetch(
      `http://localhost:4000/api/v1/post/delete/${id}`,
      {
        method: "DELETE",
      },
    );
    const date = await raspuns.json();
    if (raspuns.ok) {
      alert("Postarea a fost stearsa");
      incarcaPostari();
    } else {
      alert("Eroare la stergere: " + date.message);
    }
  } catch (error) {
    console.error("Eroare", error);
  }
};
window.onload = incarcaPostari;
