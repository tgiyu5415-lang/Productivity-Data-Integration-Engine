(function() {
    // ⚙️ KONFIGURASI VERSI MIGRASI
    const CURRENT_LOADER_VERSION = "11.0.0"; // Versi lama yang dipakai user
    const latestVersion = "11.1.0";          // Versi baru yang wajib diinstal
    
    // 🟢 GANTI LINK INI DENGAN LINK RAW "loader.user.js" DARI GIST/REPO ANDA YANG BARU!
    const NEW_LOADER_URL = "https://gist.github.com/tgiyu5415-lang/632a1ad64f19071c627598ca64cd2532/raw/loader.user.js";

    // Mencegah modal dobel
    if (document.getElementById("qc-force-update-modal")) return;

    // Membuat Layar Overlay Gelap Total
    const overlay = document.createElement("div");
    overlay.id = "qc-force-update-modal";
    overlay.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);z-index:2147483647;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(8px);font-family:sans-serif;opacity:0;transition:opacity 0.3s ease;";

    // HTML
    overlay.innerHTML = `
        <div style="background:#1a1a1a; padding:30px; border-radius:12px; width:480px; max-width:90%; box-shadow:0 15px 40px rgba(255,77,77,0.3); border:1px solid #ff4d4d; transform:translateY(30px); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
                <h2 style="margin:0; color:#ff4d4d; font-size:20px;">⚠️ Update Required</h2>
                <span style="background:rgba(255,77,77,0.15); color:#ff4d4d; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">v${latestVersion} Available</span>
            </div>
            <div style="color:#ddd; font-size:13px; line-height:1.6; margin-bottom:25px;">
                <p style="margin-top:0;">Your QC Loader Version (<b>v${CURRENT_LOADER_VERSION}</b>) is Outdated.</p>
                <p>Please update to the New Version (<b>v${latestVersion}</b>) so QC Tool can run normally.</p>
            </div>
            <button id="qc-btn-do-update" style="width:100%; padding:12px; background:#ff4d4d; color:#fff; border:none; border-radius:6px; font-weight:bold; font-size:14px; cursor:pointer; transition:all 0.2s;">Click Here To Update</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // Animasi masuk (Fade In & Slide Up)
    setTimeout(() => {
        overlay.style.opacity = "1";
        const innerBox = overlay.querySelector('div');
        if (innerBox) innerBox.style.transform = "translateY(0)";
    }, 50);

    // Kunci layar agar user tidak bisa scroll
    document.body.style.overflow = "hidden";

    // Logika Tombol Hover & Klik Download
    const btnUpdate = document.getElementById("qc-btn-do-update");
    btnUpdate.onmouseenter = () => { btnUpdate.style.background = "#ff3333"; };
    btnUpdate.onmouseleave = () => { btnUpdate.style.background = "#ff4d4d"; };

    btnUpdate.onclick = function() {
        // Arahkan browser ke URL Loader baru 
        window.location.href = NEW_LOADER_URL;
    };

    // 🟢 ANTI-BYPASS: Munculkan lagi kalau user coba menghapus modal pakai Inspect Element
    setInterval(() => {
        if (!document.getElementById("qc-force-update-modal")) {
            console.warn("[SECURITY] Upaya manipulasi UI terdeteksi! Memulihkan modal Force Update.");
            document.body.appendChild(overlay);
        }
        document.body.style.overflow = "hidden";
    }, 1000);
})();
