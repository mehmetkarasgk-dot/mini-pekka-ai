/* ---------------------------------------------------
   SÖZLÜK VERİLERİ
--------------------------------------------------- */

const dictionary = {
"weak":"güçsüz","strong":"güçlü","brave":"cesur","happy":"mutlu",
"sad":"üzgün","tired":"yorgun","boring":"sıkıcı","excited":"heyecanlı",
"careful":"dikkatli","dangerous":"tehlikeli","safe":"güvenli",
"easy":"kolay","difficult":"zor","quick":"hızlı","slow":"yavaş","modern":"modern",
"ancient":"antik","hungry":"aç","thirsty":"susamış","busy":"meşgul","lazy":"tembel",
"clever":"zeki","polite":"kibar","rude":"kaba","expensive":"pahalı","cheap":"ucuz",
"beautiful":"güzel","ugly":"çirkin","useful":"kullanışlı","useless":"işe yaramaz",
"important":"önemli","famous":"ünlü","unknown":"bilinmeyen","big":"büyük","small":"küçük",
"long":"uzun","short":"kısa","thick":"kalın","thin":"ince","young":"genç","old":"yaşlı",
"right":"doğru","wrong":"yanlış","open":"açık","closed":"kapalı","clean":"temiz",
"dirty":"kirli","hot":"sıcak","cold":"soğuk","noisy":"gürültülü","quiet":"sessiz"
};

/* ---------------------------------------------------
   COMPARATIVE
--------------------------------------------------- */
function makeComparative(w) {
    const irregular = { good: "better", bad: "worse", far: "farther" };
    if (irregular[w]) return irregular[w];
    if (w.endsWith("y")) return w.slice(0,-1) + "ier";
    if (w.length <= 5) return w + "er";
    return "more " + w;
}

/* ---------------------------------------------------
   MESAJ
--------------------------------------------------- */
function addMsg(text, from="bot") {
    const box = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "msg " + (from === "me" ? "me" : "bot");
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

/* ---------------------------------------------------
   CEVAP
--------------------------------------------------- */
function answer(q) {

    const text = q.toLowerCase().trim();

    // Easter Egg
    if (text === "pancakes") {
        document.getElementById("pancake-sound").play();
        addMsg("🥞 Mini Pekka güç modunu açtı!", "bot");
        return;
    }

    // Türkçe cümle özel dönüşüm
    if (text.includes("çok yorgunum")) {
        addMsg(`"I am very tired" şeklinde çevrilir.`, "bot");
        return;
    }

    // Comparative
    if (text.includes("comparative") || text.includes("comperative") || text.includes("hali")) {
        let w = text.split(" ")[0];
        addMsg(`${w} → ${makeComparative(w)}`, "bot");
        return;
    }

    // Sözlük
    if (dictionary[text]) {
        addMsg(`"${text}" = ${dictionary[text]}`, "bot");
        return;
    }

    addMsg("Bunu bulamadım kanki 😔", "bot");
}

/* ---------------------------------------------------
   ARAYÜZ
--------------------------------------------------- */
document.getElementById("pekka-btn").onclick = () => {
    const p = document.getElementById("panel");
    p.style.display = p.style.display === "flex" ? "none" : "flex";
};

document.getElementById("send").onclick = () => {
    const inp = document.getElementById("input");
    const msg = inp.value.trim();
    if (!msg) return;
    addMsg(msg, "me");
    answer(msg);
    inp.value = "";
};

document.getElementById("input").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("send").click();
});
