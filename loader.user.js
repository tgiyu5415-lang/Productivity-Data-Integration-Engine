// ==UserScript==
// @name         QC Tool Enterprise Ultimate - Secured Loader Used
// @namespace    http://tampermonkey.net/
// @version      11.1.7.1.4
// @description  Enterprise Loader (Clean Code / Minified Version)
// @author       [Tgiyu-lang5415]
// @match        https://admin.therealreal.com/admin*
// @match        https://example.com/
// @grant        GM_xmlhttpRequest
// @connect      script.google.com
// @connect      script.googleusercontent.com
// @connect      raw.githubusercontent.com
// @connect      gist.githubusercontent.com
// @connect      gist.github.com
// @run-at       document-start
// ==/UserScript==

/**
 * ==============================================================================================
 * @name        QC Productivity & Data Integration Engine - Enterprise Edition
 * @copyright   © 2026 Tgiyu-lang5415. All Rights Reserved.
 * @license     Proprietary and Confidential. Unauthorized modification is strictly prohibited.
 * ==============================================================================================
 */

(function() {
    'use strict';
    // ==========================================
    // 🌙 INSTANT DARK MODE (ANTI-FLASH / MENCEGAH SILAU)
    // ==========================================
    if (localStorage.getItem("qcDarkMode") === "true") {
        const darkStyle = document.createElement("style");
        darkStyle.id = "qc-dark-mode-style";
        darkStyle.innerHTML = `
            body, .content, #content, .admin-container { background-color: #0f172a !important; color: #cbd5e1 !important; }
            header, .navbar, .admin-header { background-color: #020617 !important; border-bottom: none !important; box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important; }
            .qc-row { background-color: #1e293b !important; border: none !important; border-radius: 12px !important; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important; margin-bottom: 25px !important; padding: 15px !important; }
            .qc-row__image-card, .js-qc-row__image-card { background-color: #0f172a !important; border: none !important; border-radius: 8px !important; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important; }
            .qc-row__sku-attributes { color: #94a3b8 !important; }
            .qc-row__sku-attributes strong { color: #f8fafc !important; }
            .text-danger, .alert-danger, [style*="color: red"], [style*="color:red"] { color: #fb7185 !important; }
            .modal-content, .modal-body, .qc-tool-fail-image-modal__content { background-color: #1e293b !important; color: #cbd5e1 !important; border: 1px solid #334155 !important; border-radius: 12px !important; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8) !important; }
            :root { --qc-target-color: #ffd700 !important; --qc-target-shadow: rgba(255, 215, 0, 0.5) !important; }
        `;
        (document.head || document.documentElement).appendChild(darkStyle);
    }

    // ==========================================
    // ⚙️ KONFIGURASI VERSI & DATABASE
    // ==========================================
    const CURRENT_LOADER_VERSION = "11.1.7.1.4";

    const GITHUB_VERSION_TXT = "https://gist.githubusercontent.com/tgiyu5415-lang/632a1ad64f19071c627598ca64cd2532/raw/version.txt";
    const DOWNLOAD_URL = "https://gist.github.com/tgiyu5415-lang/632a1ad64f19071c627598ca64cd2532/raw/loader.user.js";
    const GITHUB_LICENSE = "https://gist.githubusercontent.com/tgiyu5415-lang/632a1ad64f19071c627598ca64cd2532/raw/license.json";
    const GITHUB_CORE_SCRIPT = "https://gist.githubusercontent.com/tgiyu5415-lang/632a1ad64f19071c627598ca64cd2532/raw/qc-enterprise-new.user.js";

    // ==========================================
    // 🚀 MESIN CACHING ENTERPRISE (ANTI HTTP 429)
    // ==========================================
    function fetchWithCache(url, cacheKey, callback) {
        const now = Date.now();
        const cachedData = localStorage.getItem(cacheKey);
        const lastFetch = localStorage.getItem(cacheKey + "_time");
        const CACHE_DURATION = 60 * 60 * 1000;

        if (cachedData && lastFetch && (now - parseInt(lastFetch) < CACHE_DURATION)) {
            callback(true, cachedData, true);
        } else {
            GM_xmlhttpRequest({
                method: "GET",
                url: url + "?t=" + now,
                nocache: true,
                onload: function(res) {
                    if (res.status === 200) {
                        localStorage.setItem(cacheKey, res.responseText);
                        localStorage.setItem(cacheKey + "_time", now.toString());
                        callback(true, res.responseText, false);
                    } else {
                        if (cachedData) {
                            console.warn(`⚠️ [SYSTEM] GitHub Error ${res.status}. Menggunakan cache darurat untuk ${cacheKey}.`);
                            callback(true, cachedData, true);
                        } else {
                            callback(false, `HTTP Status: ${res.status}`, false);
                        }
                    }
                },
                onerror: function(err) {
                    if (cachedData) {
                        console.warn(`⚠️ [SYSTEM] Koneksi putus. Menggunakan cache darurat untuk ${cacheKey}.`);
                        callback(true, cachedData, true);
                    } else {
                        callback(false, "Koneksi terputus.", false);
                    }
                }
            });
        }
    }

    // ==========================================
    // 🛡️ AUTO-RELOAD ENGINE (SETELAH KEMBALI DARI TAMPERMONKEY)
    // ==========================================
    window.addEventListener("focus", function() {
        if (localStorage.getItem("qc_awaiting_reload") === "true") {
            console.log("🔄 Welcome back! Wiping cache and auto-reloading to apply updates...");
            localStorage.removeItem("qc_awaiting_reload");
            localStorage.removeItem("qc_cache_core_script");
            localStorage.removeItem("qc_cache_version");
            location.reload();
        }
    });

    // ==========================================
    // 🛡️ FUNGSI: AUTO UPDATE CHECKER & SCHEDULER
    // ==========================================
    function isNewerVersion(oldVer, newVer) {
        const oldParts = oldVer.split('.').map(Number);
        const newParts = newVer.split('.').map(Number);
        for (let i = 0; i < Math.max(oldParts.length, newParts.length); i++) {
            const oldVal = oldParts[i] || 0;
            const newVal = newParts[i] || 0;
            if (newVal > oldVal) return true;
            if (newVal < oldVal) return false;
        }
        return false;
    }

    function executeUpdateNow() {
        localStorage.setItem("qc_awaiting_reload", "true");
        window.open(DOWNLOAD_URL, "_blank");

        const overlay = document.getElementById("qc-force-update-modal");
        if (overlay) {
            overlay.innerHTML = `
                <div style="background:#1a1a1a; padding:40px 30px; border-radius:12px; width:480px; max-width:90%; box-shadow:0 15px 40px rgba(0,255,136,0.3); border:1px solid #00ff88; text-align:center;">
                    <h2 style="margin:0 0 15px; color:#00ff88; font-size:24px;">🔄 Installing Update...</h2>
                    <p style="color:#ddd; font-size:14px; line-height:1.5;">Please click <b>"Update"</b> or <b>"Install"</b> in the new Tampermonkey tab.</p>
                    <div style="margin-top:25px; padding:15px; background:rgba(0,255,136,0.1); border-radius:8px; border:1px dashed #00ff88;">
                        <p style="color:#00ff88; font-size:13px; font-weight:bold; margin:0;">When you return to this tab, the page will automatically refresh.</p>
                    </div>
                </div>
            `;
        }
    }

    function showUpdateModal(latestVersion, isMandatory = false) {
        if (document.getElementById("qc-force-update-modal")) return;

        const overlay = document.createElement("div");
        overlay.id = "qc-force-update-modal";
        overlay.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);z-index:2147483647;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(8px);font-family:sans-serif;opacity:0;transition:opacity 0.3s ease;";

        // Generate suggested time (1 hour from now) for the picker
        let now = new Date();
        now.setHours(now.getHours() + 1);
        let suggestedTime = now.toTimeString().slice(0,5);

        let scheduleHTML = isMandatory ?
            `<div style="margin-top:20px; text-align:center; color:#ff4d4d; font-size:12px; font-weight:bold;">Your scheduled time has passed. You must update now.</div>`
            : `
            <div style="margin-top:20px; border-top:1px solid #444; padding-top:15px;">
                <span style="color:#aaa; font-size:12px; display:block; margin-bottom:8px;">Or schedule update for later today:</span>
                <div style="display:flex; gap:10px;">
                    <input type="time" id="qc-schedule-time" value="${suggestedTime}" style="flex:1; padding:10px; background:#111; color:#fff; border:1px solid #555; border-radius:6px; font-size:14px; outline:none;">
                    <button id="qc-btn-schedule" style="flex:1; background:#444; color:#fff; border:none; border-radius:6px; font-weight:bold; font-size:13px; cursor:pointer; transition:0.2s;">⏰ Remind Me Later</button>
                </div>
            </div>
        `;

        overlay.innerHTML = `
            <div style="background:#1a1a1a; padding:30px; border-radius:12px; width:480px; max-width:90%; box-shadow:0 15px 40px rgba(255,77,77,0.3); border:1px solid #ff4d4d; transform:translateY(30px); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
                    <h2 style="margin:0; color:#ff4d4d; font-size:20px;">⚠️ Software Update (v${latestVersion})</h2>
                </div>
                <div style="color:#ddd; font-size:13px; line-height:1.6; margin-bottom:25px;">
                    <p style="margin-top:0;">Your QC Engine (<b>v${CURRENT_LOADER_VERSION}</b>) is outdated.</p>
                    <p>A new version has been deployed. You can install it now, or schedule it to install later today.</p>
                </div>
                <button id="qc-btn-update-now" style="width:100%; padding:12px; background:#ff4d4d; color:#fff; border:none; border-radius:6px; font-weight:bold; font-size:14px; cursor:pointer; transition:all 0.2s;">🚀 Update Now</button>
                ${scheduleHTML}
            </div>
        `;
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = "1";
            overlay.querySelector('div').style.transform = "translateY(0)";
        }, 50);

        document.getElementById("qc-btn-update-now").onclick = () => executeUpdateNow();

        if (!isMandatory) {
            const btnSchedule = document.getElementById("qc-btn-schedule");
            btnSchedule.onmouseenter = () => { btnSchedule.style.background = "#555"; };
            btnSchedule.onmouseleave = () => { btnSchedule.style.background = "#444"; };

            btnSchedule.onclick = () => {
                const timeInput = document.getElementById("qc-schedule-time").value;
                if (!timeInput) return alert("Please select a time.");

                const targetDate = new Date();
                const [hours, minutes] = timeInput.split(":");
                targetDate.setHours(hours, minutes, 0, 0);

                if (targetDate.getTime() <= Date.now()) {
                    return alert("That time has already passed! Please select a future time.");
                }

                localStorage.setItem("qcScheduledUpdateTime", targetDate.getTime().toString());
                localStorage.setItem("qcScheduledUpdateVersion", latestVersion);

                overlay.style.opacity = "0";
                setTimeout(() => {
                    overlay.remove();
                    verifyLicense(); // Lanjutkan masuk aplikasi
                }, 300);
            };
        }
    }

    function checkUpdateAndProceed() {
        console.log("%c[SYSTEM] Memeriksa pembaruan Loader...", "color: #00d4ff;");

        fetchWithCache(GITHUB_VERSION_TXT, "qc_cache_version", function(success, data, isCached) {
            if (success) {
                let latestVersion = data.trim();

                if (isNewerVersion(CURRENT_LOADER_VERSION, latestVersion)) {
                    let scheduledTime = parseInt(localStorage.getItem("qcScheduledUpdateTime"));
                    let scheduledVersion = localStorage.getItem("qcScheduledUpdateVersion");

                    // Cek apakah ada jadwal update untuk versi ini
                    if (scheduledTime && scheduledVersion === latestVersion) {
                        if (Date.now() >= scheduledTime) {
                            console.log("%c[UPDATE] Waktu jadwal tiba! Memaksa update...", "color:#ff4d4d; font-weight:bold;");
                            localStorage.removeItem("qcScheduledUpdateTime"); // Hapus jadwal agar tidak infinite loop
                            showUpdateModal(latestVersion, true); // Paksa update (tanpa tombol schedule)
                            return;
                        } else {
                            console.log(`%c[UPDATE] Ditunda hingga: ${new Date(scheduledTime).toLocaleTimeString()}`, "color:#aaa;");
                            verifyLicense(); // Biarkan user bekerja
                            return;
                        }
                    } else {
                        // Versi benar-benar baru, belum pernah di-schedule
                        showUpdateModal(latestVersion, false);
                        return;
                    }
                }
            } else {
                console.warn("[UPDATE CHECK FAILED] Melanjutkan sistem secara offline.");
            }
            verifyLicense(); // Jika tidak ada update, lanjut normal
        });
    }

    // ==========================================
    // ⚙️ FUNGSI: Memuat dan Mengeksekusi Kode Utama
    // ==========================================
    function loadCoreScript() {
        fetchWithCache(GITHUB_CORE_SCRIPT, "qc_cache_core_script", function(success, data, isCached) {
            if (success && data) {
                if (isCached) console.log("%c[SYSTEM] Memuat Core Script dari Memori Lokal ⚡", "color: #00ff88;");

                // 🟢 THE BULLETPROOF BRIDGE (CUSTOM EVENTS DENGAN BOUNCER & ANONYMOUS)
                document.addEventListener("QC_Cloud_Request", function(e) {
                    try {
                        const reqData = JSON.parse(e.detail);

                        // 🔒 SECURITY PATCH: Strict URL Whitelisting (The Bouncer)
                        if (!reqData.url.startsWith("https://script.google.com/macros/s/")) {
                            console.error("🚨 [SECURITY BLOCK] Unauthorized background fetch attempt blocked!");
                            return;
                        }

                        GM_xmlhttpRequest({
                            method: "GET",
                            url: reqData.url,
                            anonymous: true, // 🟢 SAFE FOR MAC & WINDOWS: Mengabaikan konflik akun Google
                            onload: function(res) {
                                document.dispatchEvent(new CustomEvent("QC_Cloud_Response_" + reqData.id, {
                                    detail: JSON.stringify({ success: true, text: res.responseText })
                                }));
                            },
                            onerror: function(err) {
                                document.dispatchEvent(new CustomEvent("QC_Cloud_Response_" + reqData.id, {
                                    detail: JSON.stringify({ success: false, error: "Network Error" })
                                }));
                            }
                        });
                    } catch(err) {
                        console.error("Bridge Error:", err);
                    }
                });

                // Inject Core Script
                const scriptElement = document.createElement('script');
                scriptElement.type = 'text/javascript';
                scriptElement.textContent = data;
                (document.head || document.documentElement).appendChild(scriptElement);
                scriptElement.remove();

                console.log("%c[SYSTEM] QC Enterprise Core Berhasil Di-inject & Dieksekusi!", "color: #00ff88; font-weight: bold; font-size: 12px;");
            } else {
                console.error("[LOADER ERROR] Gagal mengambil file skrip utama: " + data);
            }
        });
    }

    // ==========================================
    // ⚙️ FUNGSI: Tampilan Gerbang Login
    // ==========================================
    function showLoginGate(database) {
        if (document.getElementById('qc-auth-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'qc-auth-overlay';
        overlay.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(15,15,15,0.95);z-index:2147483647;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(8px);font-family:sans-serif;";

        let optionsHTML = '<option value="" disabled selected>-- Choose Your Identity --</option>';
        for (const [key, user] of Object.entries(database)) {
            if (user.active) {
                optionsHTML += `<option value="${key}">${user.name}</option>`;
            }
        }

        overlay.innerHTML = `
            <div style="background:#222;padding:40px;border-radius:12px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.8);border:1px solid #444;width:320px;">
                <h2 style="color:#f5d48f;margin:0 0 10px;font-size:22px;">QC TOOL ENTERPRISE</h2>
                <p style="color:#aaa;font-size:13px;margin-bottom:25px;">Remote System Authentication</p>
                <select id="qc-user-select" style="width:100%;padding:12px;background:#111;color:#fff;border:1px solid #555;border-radius:6px;margin-bottom:20px;font-size:14px;">
                    ${optionsHTML}
                </select>
                <button id="qc-btn-login" style="width:100%;padding:12px;background:#f5d48f;color:#000;border:none;border-radius:6px;font-weight:bold;cursor:pointer;font-size:14px;transition:0.2s;">VERIFY ACCESS</button>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('qc-btn-login').addEventListener('click', () => {
            const selectedVal = document.getElementById('qc-user-select').value;
            if (selectedVal) {

                // 🔒 SECURITY CHECK FOR ADMIN ACCOUNT IN LOADER
                if (selectedVal === "USER-011") {
                    let pwd = prompt("🔒 Restricted Access\n\nPlease enter the Admin password to login as Andrew:");
                    if (pwd !== "admin202601") {
                        alert("❌ Incorrect password. Access denied.");
                        return;
                    }
                }

                localStorage.setItem("qcActiveLicense", selectedVal);
                location.reload();
            } else {
                alert("Please choose your identity first!");
            }
        });
    }

    // ==========================================
    // ⚙️ FUNGSI: Cek Lisensi dari GitHub
    // ==========================================
    function verifyLicense() {
        console.log("%c[SYSTEM] Memverifikasi Lisensi...", "color: #f5d48f;");

        fetchWithCache(GITHUB_LICENSE, "qc_cache_license", function(success, data, isCached) {
            if (success) {
                try {
                    const db = JSON.parse(data);
                    const activeKey = localStorage.getItem("qcActiveLicense");

                    if (!activeKey || !db[activeKey]) {
                        showLoginGate(db);
                        return;
                    }

                    const user = db[activeKey];
                    const expiryDate = new Date(user.expiry);
                    const today = new Date();

                    if (user.active && expiryDate >= today) {
                        const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                        console.log(`%c[AUTH] Akses Diberikan: ${user.name} (Sisa ${daysLeft} hari)`, "color: #00ff88;");
                        loadCoreScript();
                    } else {
                        const reason = !user.active ? "Akun Anda telah dinonaktifkan." : "Masa berlaku lisensi Anda telah habis.";
                        alert(`AKSES DITOLAK\n\n${reason}\nSilakan hubungi Administrator.`);
                        localStorage.removeItem("qcActiveLicense");
                        location.reload();
                    }
                } catch (e) {
                    console.error("[LOADER ERROR] Format file license.json tidak valid.", e);
                }
            } else {
                console.error("[LOADER ERROR] Gagal membaca lisensi.");
            }
        });
    }

    // ==========================================
    // 🚀 INITIALIZATION
    // ==========================================
    function init() {
        if (document.body) {
            checkUpdateAndProceed();
        } else {
            setTimeout(init, 500);
        }
    }

    init();

})();
