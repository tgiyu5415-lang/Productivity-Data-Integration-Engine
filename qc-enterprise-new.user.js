/**
 * ==============================================================================================
 * @name        QC Productivity & Data Integration Engine - Enterprise Edition
 * @copyright   © 2026 Tgiyu-lang5415. All Rights Reserved.
 * @license     Proprietary and Confidential. Unauthorized modification is strictly prohibited.
 * * ATTN: INFORMATION TECHNOLOGY & INFRASECURITY TEAM
 * ----------------------------------------------------------------------------------------------
 * This script is a benign, client-side workflow optimization tool designed strictly to enhance
 * UI ergonomics (via shortcuts), accessibility, and local data aggregation for the QC team.
 * * SECURITY & COMPLIANCE POSTURE:
 * 1. 100% Client-Side: All tracking data is stored purely in the local browser (`localStorage`).
 * 2. Zero Exfiltration: This script DOES NOT send, beacon, or transmit any data to external servers.
 * 3. Transparent Execution: The code is deliberately unobfuscated for full transparency and auditing.
 * 4. Server-Friendly: Includes micro-jittering and debounce mechanics intentionally designed to
 * prevent rate-limiting and reduce concurrent load (Thundering Herd) on backends.
 * * This tool operates entirely as an overlay and respects the underlying business logic of.
 * ==============================================================================================
 */

(function() {
    'use strict';


    console.info(
        "%cQC Productivity & Data Integration - Enterprise Edition %c\nClient-side productivity script loaded. Zero external tracking. Server-friendly jittering enabled.",
        "color: #1e293b; background: #00ff88; font-weight: bold; padding: 2px 6px; border-radius: 4px;",
        "color: gray; font-style: italic;"
    );

    // ==============================================================
    // 💻 ADMIN CONSOLE COMMAND: Type qcBaseline() in the console
    // ==============================================================
    window.qcBaseline = function() {
        const lockedVol = localStorage.getItem("qcWorkloadLockedVolume");
        const lockedDate = localStorage.getItem("qcWorkloadLockDate");
        const history = JSON.parse(localStorage.getItem("qcVolumeHistory") || "[]");
        const todayStr = new Date().toISOString().slice(0, 10);

        console.log("%c=== 🔐 QC 7 AM BASELINE DIAGNOSTICS ===", "color: #00d4ff; font-weight: bold; font-size: 14px; padding-bottom: 4px;");

        if (lockedDate === todayStr && lockedVol) {
            console.log(`%c📅 Today's Date: %c${lockedDate}`, "color: #aaa; font-size: 12px;", "color: #fff; font-size: 12px; font-weight: bold;");
            console.log(`%c📦 7 AM Locked Volume: %c${parseInt(lockedVol, 10).toLocaleString('id-ID')} SKU`, "color: #aaa; font-size: 12px;", "color: #00ff88; font-size: 14px; font-weight: bold; text-shadow: 0 0 5px rgba(0,255,136,0.4);");
        } else {
            console.log("%c⏳ System is currently waiting for the 7:00 AM server fetch.", "color: #ffb347; font-size: 12px; font-weight: bold;");
            if (lockedVol && lockedDate) {
                console.log(`%c(Previous lock was ${parseInt(lockedVol, 10).toLocaleString('id-ID')} SKU on ${lockedDate})`, "color: #888; font-style: italic; font-size: 11px;");
            }
        }

        console.log(`%c🧠 ML Forecasting Memory: %c${history.length} days successfully recorded.`, "color: #aaa; font-size: 12px;", "color: #b582fa; font-size: 12px; font-weight: bold;");
        console.log("%c=======================================", "color: #00d4ff; font-weight: bold; font-size: 14px; padding-top: 4px;");

        return "Diagnostic complete.";
    };

    // ==============================================================
    // ⏱️ QC PERFORMANCE TRACKER (Smart Metric)
    // ==============================================================

    // METRIK 1: Kapan UI dan kerangka web siap untuk diklik/dikerjakan oleh QCer?
    window.addEventListener('DOMContentLoaded', function() {
        const domTime = (performance.now() / 1000).toFixed(2);
        console.info(`%c[QC PERFORMANCE] UI Ready: ${domTime} detik`, "color: #00d4ff; background: #0f172a; padding: 3px 8px; border-radius: 5px; font-weight: bold; border: 1px solid #00d4ff;");
    });

    // METRIK 2: Kapan SELURUH gambar dari ujung atas sampai ujung bawah selesai diunduh?
    window.addEventListener('load', function() {
        const loadTime = (performance.now() / 1000).toFixed(2);
        console.info(`%c[QC PERFORMANCE] All Images Downloaded: ${loadTime} detik`, "color: #ffb347; background: #0f172a; padding: 3px 8px; border-radius: 5px; font-weight: bold; border: 1px solid #ffb347;");
    });

    document.addEventListener('turbolinks:load', function() {
        const loadTime = (performance.now() / 1000).toFixed(2);
        console.info(`%c[QC PERFORMANCE] SPA Transition Finished in: ${loadTime} detik`, "color: #00d4ff; background: #0f172a; padding: 3px 8px; border-radius: 5px; font-weight: bold; border: 1px solid #00d4ff;");
    });

    // ===== FORCE SCROLL TO TOP SAAAT REFRESH/PINDAH HALAMAN =====
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    // ===== CONFIG =====
    const USERS = {
        "USER-001": "",
        "USER-002": "",
        "USER-003": "",
        "USER-004": "",
        "USER-005": "",
        "USER-006": "",
        "USER-007": "",
        "USER-008": "",
        "USER-009": "",
        "USER-010": "",
        "USER-011": ""
    };
    const QC_RESET_HOUR = 23;
    const QC_RESET_MINUTE = 59;
    // ===== UTILS =====
    function formatTime(sec) {
        let h = Math.floor(sec / 3600);
        let m = Math.floor((sec % 3600) / 60);
        let s = sec % 60;
        return [h, m, s].map(function(v) {
            return v.toString().padStart(2, "0");
        }).join(":");
    }

    function downloadCSV(filename, rows) {
        const csvContent = "data:text/csv;charset=utf-8," + rows.map(function(r) {
            return r.map(function(c) {
                return `"${String(c === null || c === undefined ? "" : c).replace(/"/g,'""')}"`;
            }).join(",");
        }).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    // ===== FUNGSI EKSEKUTOR CSV (MANUAL & AUTO) =====
    function executeCSVExport(isAutoBackup = false) {
        let currentFailData = JSON.parse(localStorage.getItem("qcFailData") || "[]");
        let currentPassData = JSON.parse(localStorage.getItem("qcPassData") || "[]");

        if(currentFailData.length === 0 && currentPassData.length === 0) {
            if(!isAutoBackup) alert("No QC Data Available");
            return false;
        }

        const header = [["Date", "User", "SKU", "Brand", "Color", "Taxons", "Auth Level", "Image URL", "Status", "Reason"]];
        const rows = header.concat(currentFailData, currentPassData).map(r => r.map(v => (v === undefined || v === null ? "" : String(v))));

        let activeKey = localStorage.getItem("qcActiveLicense");
        let userName = activeKey && USERS[activeKey] ? USERS[activeKey] : "Unknown_User";
        let safeUserName = userName.replace(/\s+/g, '_');

        // Jika Auto Backup, gunakan tanggal KEMARIN (tanggal data itu dibuat)
        let exportDate = isAutoBackup ? (localStorage.getItem("qcLastActiveDay") || new Date().toISOString().slice(0, 10)) : new Date().toISOString().slice(0, 10);

        let prefix = isAutoBackup ? "AUTO_BACKUP_QC_" : "qc_report_";
        let dynamicFilename = `${prefix}${exportDate}-${safeUserName}.csv`;

        downloadCSV(dynamicFilename, rows);

        // 💡 SMART BACKUP: Tandai bahwa data saat ini SUDAH diekspor dengan aman
        if (!isAutoBackup) {
            localStorage.setItem("qcNeedsBackup", "false");
        }

        return true;
    }

    // ==============================================================
    // 🌙 ENGINE MODERN DARK MODE (NO-BORDER & DROP SHADOW)
    // ==============================================================
    function toggleDarkMode(enable) {
        let styleEl = document.getElementById("qc-dark-mode-style");
        if (enable) {
            if (!styleEl) {
                styleEl = document.createElement("style");
                styleEl.id = "qc-dark-mode-style";
                // Tema: Slate (Biru Dongker Gelap) & Tanpa Garis (Borderless)
                styleEl.innerHTML = `
                    /* Latar Belakang Utama */
                    body, .content, #content, .admin-container {
                        background-color: #0f172a !important; /* Dark Slate / Navy */
                        color: #cbd5e1 !important;
                    }
                    /* Bagian Header / Navigasi (Aksen Lebih Gelap) */
                    header, .navbar, .admin-header {
                        background-color: #020617 !important;
                        border-bottom: none !important;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.6) !important;
                    }
                    /* Baris Kotak SKU (QC Row) */
                    .qc-row {
                        background-color: #1e293b !important; /* Slate agak terang untuk card */
                        border: none !important; /* TANPA GARIS */
                        border-radius: 12px !important;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important; /* Efek Melayang */
                        margin-bottom: 25px !important;
                        padding: 15px !important;
                    }
                    /* Kotak Gambar Produk */
                    .qc-row__image-card, .js-qc-row__image-card {
                        background-color: #0f172a !important;
                        border: none !important; /* TANPA GARIS */
                        border-radius: 8px !important;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
                    }
                    /* Teks Atribut SKU (Brand, Color, Taxons) */
                    .qc-row__sku-attributes { color: #94a3b8 !important; }
                    .qc-row__sku-attributes strong { color: #f8fafc !important; }
                    /* Menghaluskan teks warna peringatan agar tidak sakit di mata (Bleeding) */
                    .text-danger, .alert-danger, [style*="color: red"], [style*="color:red"] {
                        color: #fb7185 !important; /* Merah Pastel/Soft */
                    }
                    /* Area Background Modal/Pop-Up */
                    .modal-content, .modal-body, .qc-tool-fail-image-modal__content {
                        background-color: #1e293b !important;
                        color: #cbd5e1 !important;
                        border: 1px solid #334155 !important;
                        border-radius: 12px !important;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8) !important;
                    }
                    /* Variabel Warna Kursor Bidikan F untuk Dark Mode */
                    :root {
                        --qc-target-color: #ffd700 !important; /* Kuning Emas */
                        --qc-target-shadow: rgba(255, 215, 0, 0.5) !important;
                    }
                `;
                document.head.appendChild(styleEl);
            }
        } else {
            if (styleEl) styleEl.remove();
        }
    }

    // Aktifkan otomatis saat web dimuat (sesuai memori terakhir)
    let isDarkModeOn = localStorage.getItem("qcDarkMode") === "true";
    toggleDarkMode(isDarkModeOn);
    // ===== INIT FUNCTION =====
    document.body.style.position = "relative";
    document.body.style.minHeight = "100vh";

    // 🛡️ ANTI-BOT SHIELD: Humanized Click Simulator
        function humanClick(element) {
            if (!element) return;
            ['mousedown', 'mouseup', 'click'].forEach(eventType => {
                element.dispatchEvent(new MouseEvent(eventType, {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    buttons: 1
                }));
            });
        }

    function init() {
        if(document.getElementById("qc-counter-pro")) return;
        console.log("INIT RUNNING");

        // ==============================================================
        // 📡 LIVE VOLUME RADAR
        // Mengetuk pintu server TRR HANYA 1X saat halaman pertama kali dimuat.
        // ==============================================================
        window.__qcTotalVolume = "Loading...";

        async function fetchTotalWorkload() {
            try {
            
                const response = await fetch('/admin/photography/pra/qc_tool/fetch_ready_for_qc_tool_count', {
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.item_count !== undefined) {
                        window.__qcTotalVolume = data.item_count.toLocaleString('id-ID'); // Format angka

                        // Tuliskan ke layar
                        const totalVolEl = document.getElementById("qc-total-vol");
                        if (totalVolEl) totalVolEl.textContent = window.__qcTotalVolume;
                    }
                }
            } catch (e) {
                console.log("[QC SYSTEM] Radar gagal mengambil data antrean pusat.");
            }
        }

        // 🟢 SOLUSI PERFORMA: Kunci agar radar benar-benar hanya menembak 1x
        // meskipun Turbo/Hotwire me-reload UI berkali-kali.
        if (!window.__qcWorkloadFetched) {
            window.__qcWorkloadFetched = true; // Langsung kunci!

            setTimeout(() => {
                fetchTotalWorkload();
            }, 4000);
        }

        // ==============================================================
        // ☁️ CLOUD BRAIN SYNC ENGINE
        // ==============================================================
        const SYNC_SERVER_URL = "https://script.google.com/macros/s/AKfycbwyBcUG7dl21lVZup55ulcvbPmBbL9QerHLk_Fh_Z8R09b_LA6u-J8e98ouP_Kqfynw/exec";
        window.__cloudBrainChecked = false;

        // 🛡️ VIP PASS: Secure Event-Driven Message Passing (With Wiretap)
        function fetchCloud(url) {
            return new Promise((resolve, reject) => {
                // Buat ID unik untuk permintaan ini
                const reqId = Date.now() + "_" + Math.floor(Math.random() * 1000);

                // Siapkan telinga untuk mendengar jawaban dari Loader
                const responseListener = function(e) {
                    // Cabut telinga setelah mendengar jawaban agar memori tidak bocor
                    document.removeEventListener("QC_Cloud_Response_" + reqId, responseListener);

                    try {
                        const data = JSON.parse(e.detail);
                        if (data.success) {
                            try {
                                // Coba baca jawaban Google sebagai JSON
                                resolve(JSON.parse(data.text));
                            } catch (parseErr) {
                                // 🚨 WIRETAP: Jika Google tidak membalas dengan JSON, print isi aslinya!
                                console.error("☁️ [CLOUD BRAIN] Raw Response from Google is NOT JSON. Here is what Google actually sent:");
                                console.log(data.text);
                                reject("Google API returned HTML instead of JSON.");
                            }
                        } else {
                            reject(data.error);
                        }
                    } catch(err) {
                        reject("Internal Bridge Parse Error");
                    }
                };

                // Pasang telinga ke document
                document.addEventListener("QC_Cloud_Response_" + reqId, responseListener);

                // Teriakkan permintaan ke Loader
                document.dispatchEvent(new CustomEvent("QC_Cloud_Request", {
                    detail: JSON.stringify({ id: reqId, url: url })
                }));

                // Timeout 15 detik jika server Google sedang mati
                setTimeout(() => {
                    document.removeEventListener("QC_Cloud_Response_" + reqId, responseListener);
                    reject("Request Timeout");
                }, 15000);
            });
        }

        async function syncWithCloudBrain() {
            if (window.__cloudBrainChecked) return;

            const now = new Date();
            if (now.getHours() < 7) return; // Do not lock anything before 7:00 AM

            const todayStr = now.toISOString().slice(0, 10);
            let lockedDate = localStorage.getItem("qcWorkloadLockDate");

            if (lockedDate === todayStr) {
                window.__cloudBrainChecked = true;
                return; // Already locked locally today
            }

            try {
                // 1. Ask the Cloud if someone else already locked it
                let data = await fetchCloud(SYNC_SERVER_URL + "?action=get");
                let finalVolume = 0;

                if (data && data.locked && data.volume) {
                    finalVolume = parseInt(data.volume, 10);
                    console.log("[QC SYSTEM] ☁️ Synced 7AM Baseline from Cloud Brain:", finalVolume);
                } else {
                    // 2. Nobody locked it yet! Are we the first?
                    let rawVolumeStr = window.__qcTotalVolume;
                    if (rawVolumeStr && rawVolumeStr !== "Loading...") {
                        finalVolume = parseInt(rawVolumeStr.replace(/\./g, ""), 10);
                        if (!isNaN(finalVolume) && finalVolume > 0) {
                            // Lock it in the cloud!
                            await fetchCloud(SYNC_SERVER_URL + "?action=set&volume=" + finalVolume);
                            console.log("[QC SYSTEM] ☁️ We are the first! Locked 7AM Baseline to Cloud:", finalVolume);
                        } else { return; }
                    } else { return; }
                }

                // 3. Save it locally
                localStorage.setItem("qcWorkloadLockedVolume", finalVolume.toString());
                localStorage.setItem("qcWorkloadLockDate", todayStr);
                window.__cloudBrainChecked = true;

                // 4. Feed the Machine Learning Memory Bank
                let history = JSON.parse(localStorage.getItem("qcVolumeHistory") || "[]");
                if (!history.some(entry => entry.date === todayStr)) {
                    history.push({ date: todayStr, day: now.getDay(), volume: finalVolume });
                    history.sort((a,b) => new Date(a.date) - new Date(b.date));
                    if (history.length > 730) history = history.slice(-730);
                    localStorage.setItem("qcVolumeHistory", JSON.stringify(history));
                }

                if (typeof window.updateQCDashboard === "function") window.updateQCDashboard();
            } catch (e) {
                 console.log("Cloud Brain sync failed", e);
            }
        }

        // Panggil sinkronisasi ke Google secara instan saat web dimuat (0 detik)
        syncWithCloudBrain();

        // Fire the sync engine every 5 seconds until it successfully locks for the day
        let cloudSyncInterval = setInterval(() => {
            if (window.__cloudBrainChecked) clearInterval(cloudSyncInterval);
            else syncWithCloudBrain();
        }, 5000);

    
        if (!window.__qcWorkloadFetched) {
            window.__qcWorkloadFetched = true; // Langsung kunci!

            setTimeout(() => {
                let isAdmin = localStorage.getItem("qcActiveLicense") === "USER-011";
                let lockedDate = localStorage.getItem("qcWorkloadLockDate");
                let todayStr = new Date().toISOString().slice(0, 10);

                // Jika Cloud Brain (Google) SUDAH memberikan angka baseline hari ini,
                // User biasa TIDAK PERLU menembak API TRR sama sekali. (0% Beban Server)
                if (isAdmin || lockedDate !== todayStr) {
                    fetchTotalWorkload();
                } else {
                    console.log("%c[QC SYSTEM] Baseline already acquired from Cloud.", "color: #b582fa; font-style: italic;");
                }
            }, 4000);
        }

        // 🟢 DESAIN EFEK MENGAMBANG SAAT TAHAN ALT/OPTION (GRAB MODE)
        if (!document.getElementById("qc-floating-style")) {
            const floatStyle = document.createElement("style");
            floatStyle.id = "qc-floating-style";
            floatStyle.innerHTML = `
                /* Transisi super halus untuk efek angkat/turun */
                .qc-image-highlight {
                    transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s ease, outline 0.15s ease !important;
                }

                /* Saat body memiliki class qc-is-grabbing, gambar yang dibidik akan terangkat empuk */
                body.qc-is-grabbing .qc-image-highlight {
                    transform: scale(1.06) translateY(-6px) !important;
                    z-index: 9999 !important;
                }
            `;
            document.head.appendChild(floatStyle);
        }

        // 🟢 DESAIN REASON PREVIEW DENGAN EFEK MENGHILANG SAAT HOVER (BASE: LIGHT THEME)
        if (!document.getElementById("qc-preview-style")) {
            const previewStyle = document.createElement("style");
            previewStyle.id = "qc-preview-style";
            previewStyle.innerHTML = `
                .qc-reason-preview {
                    position: absolute; bottom: 15px; left: 10px; right: 10px; padding: 6px;
                    background: rgba(255, 255, 255, 0.95); /* Putih bersih transparan */
                    border: 1px dashed #ff4d4d; border-radius: 6px;
                    color: #333; font-size: 11px; font-weight: bold; text-align: center;
                    word-wrap: break-word; line-height: 1.3; z-index: 15;
                    transition: opacity 0.2s ease; pointer-events: none;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
                }
                .qc-reason-text {
                    color: #c62828 !important; /* 🔴 Merah Crimson pekat untuk Light Mode */
                    font-weight: 900 !important;
                }
                .js-qc-row__image-card:hover .qc-reason-preview {
                    opacity: 0 !important;
                }
            `;
            document.head.appendChild(previewStyle);
        }

        // 🟢 FUNGSI ANIMASI KARET (WEB ANIMATIONS API)
        function playSquishAnimation(element, type) {
            if (!element) return;

            // Mencegah animasi bertumpuk jika dipanggil berurutan
            if (element.getAnimations) {
                element.getAnimations().forEach(anim => anim.cancel());
            }

            const keyframes = type === 'snap' ? [
                { transform: 'translateY(0) scale(1)' },
                { transform: 'translateY(0) scale(1.04, 0.96)', offset: 0.3 }, // Memipih karena benturan
                { transform: 'translateY(0) scale(0.98, 1.02)', offset: 0.6 }, // Memantul
                { transform: 'translateY(0) scale(1)' }
            ] : [
                { transform: 'translateY(0) scale(1)' },
                { transform: 'translateY(0) scale(0.96, 1.04)', offset: 0.4 }, // Memanjang ditarik
                { transform: 'translateY(0) scale(1.02, 0.98)', offset: 0.7 }, // Memantul lepas
                { transform: 'translateY(0) scale(1)' }
            ];

            element.animate(keyframes, {
                duration: 400,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                iterations: 1
            });
        }

        if(document.getElementById("qc-counter-pro")) return;
        console.log("INIT RUNNING");
        // ===== NEW DAY DETECTION & AUTO RESET LOGIC =====
        const todayStr = new Date().toISOString().slice(0, 10);
        const lastDay = localStorage.getItem("qcLastActiveDay");

        if (lastDay && lastDay !== todayStr) {
            let currentCount = parseInt(localStorage.getItem("qcCount")) || 0;
            let currentImages = parseInt(localStorage.getItem("qcTotalImages")) || 0;
            let hasData = (currentCount > 0 || currentImages > 0);

            // Cek apakah ada data baru yang tertinggal dan belum di-export manual
            let needsBackup = localStorage.getItem("qcNeedsBackup") !== "false";

            if (hasData) {
                if (needsBackup) {
                    console.log("[QC SYSTEM] Unexported data detected. Initiating Auto-Backup...");
                    // 1. PICU DOWNLOAD OTOMATIS
                    executeCSVExport(true);
                    // 2. Beri alert penahan
                    alert("⚠️ AUTO-BACKUP SYSTEM ACTIVE ⚠️\n\nThe system detected unexported QC data from your previous session.\n\nYour CSV file has been AUTOMATICALLY DOWNLOADED (Auto-Backup).\n\nClick OK to reset the counter for today's session.");
                } else {
                    console.log("[QC SYSTEM] Previous session data was manually exported. Performing a clean reset...");
                    alert("☀️ A new QC session has started!\n\nAll your data from the previous session was safely exported.\nThe counter has been reset to 0. Please log in again to continue.");
                }
            } else {
                alert("A new QC session has started! Please log in again to continue.");
            }

            /// 3. Bersihkan SEMUA Data QC
            localStorage.setItem("qcNeedsBackup", "false"); // Reset status backup
            localStorage.setItem("qcCount", "0");
            localStorage.setItem("qcTotalImages", "0");
            localStorage.setItem("qcPassEventCount", "0");
            localStorage.setItem("qcFailEventCount", "0");
            localStorage.setItem("qcStoredFailSkus", "[]");
            localStorage.setItem("qcStoredPassSkus", "[]");
            localStorage.setItem("qcFailData", "[]");
            localStorage.setItem("qcPassData", "[]");
            localStorage.removeItem("qcActiveLicense");
            localStorage.setItem("qcLastActiveDay", todayStr);

            // Reload halaman untuk memaksa mode logout
            setTimeout(() => { location.reload(); }, 500);
            return; // Hentikan inisialisasi skrip lebih lanjut
        }
        // Simpan tanggal hari ini (berlaku untuk pengguna baru atau setelah reset)
        localStorage.setItem("qcLastActiveDay", todayStr);

        // ✅ SEKARANG INI AKAN MENYIMPAN ARRAY: {sku: [{url1, reason1}, {url2, reason2}]}
        let stagedFails = new Map();
        let isSubmitting = false; // Penanda apakah tombol submit diklik
        // 2. DEFINE STATE VARIABLES (Pastikan variabel ini bisa diakses semua listener)
        let drag = false,
            dashDrag = false,
            hasMoved = false; // 🟢 TAMBAHAN SENSOR GERAK
        let offsetX = 0,
            offsetY = 0,
            dashOffsetX = 0,
            dashOffsetY = 0;
        let currentSnap = localStorage.getItem("qcMagneticSnap") || null; // Menyimpan sisi magnet (top/bottom/left/right)

        function getSkuAttributes(row) {
            if(!row) return {brand: "N/A", color: "N/A", taxons: "N/A", auth: "N/A"};
            const attrElem = row.querySelector('.qc-row__sku-attributes');
            if(!attrElem) return {brand: "N/A", color: "N/A", taxons: "N/A", auth: "N/A"};

            // --- TAMBAHAN: EKSTRAK BRAND ---
            let brand = "N/A";
            const firstStrong = attrElem.querySelector('strong');
            // Jika tag strong pertama TIDAK mengandung ":", maka itu adalah nama Brand
            if(firstStrong && !firstStrong.innerText.includes(':')) {
                brand = firstStrong.innerText.trim();
            }

            const fullText = attrElem.textContent;
            const extractLabel = (text, label) => {
                const pattern = label === "Colors" ? "(?:Color|Colors)" : label;
                const regex = new RegExp(pattern + ":\\s*([^\\n\\r\\t]+)", "i");
                const match = text.match(regex);
                if(match) {
                    let result = match[1].trim();
                    return result.split(/Auth Level:|Condition:|Taxons:|Colors:|Color:/i)[0].trim();
                }
                return "N/A";
            };

            return {
                brand: brand, // Masukkan brand ke hasil ekstraksi
                color: extractLabel(fullText, "Colors"),
                taxons: attrElem.querySelector('.js-item-taxons')?.innerText?.replace(/\s+/g, ' ').trim() || "N/A",
                auth: extractLabel(fullText, "Auth Level")
            };
        }

        function snapToEdge(element, saveKeyX, saveKeyY) {
            const snapThreshold = 30;
            // Gunakan clientWidth agar tidak terhalang ukuran scrollbar
            const windowWidth = document.documentElement.clientWidth;
            const windowHeight = window.innerHeight;

            // Gunakan getBoundingClientRect untuk kordinat fixed yang 100% akurat
            let rect = element.getBoundingClientRect();
            let finalX = rect.left;
            let finalY = rect.top;

            if(finalX < snapThreshold) finalX = 0;
            else if(finalX > (windowWidth - rect.width - snapThreshold)) finalX = windowWidth - rect.width;

            if(finalY < snapThreshold) finalY = 0;
            else if(finalY > (windowHeight - rect.height - snapThreshold)) finalY = windowHeight - rect.height;

            element.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            element.style.left = finalX + "px";
            element.style.top = finalY + "px";
            localStorage.setItem(saveKeyX, finalX + "px");
            localStorage.setItem(saveKeyY, finalY + "px");

            // Kembalikan ke transition normal setelah animasi selesai
            setTimeout(() => { element.style.transition = "all 0.25s ease"; }, 300);
        }

        // ===== LOGIKA MAGNET & GROUPING (LINKED PANELS) =====
        function updateSnapPos() {
            if (!currentSnap) return;
            if (box.offsetWidth === 0 || dash.offsetWidth === 0) return;

            let rectBox = box.getBoundingClientRect();
            let dashWidth = dash.offsetWidth;
            let dashHeight = dash.offsetHeight;
            const gap = 5;

            let newTop = rectBox.top;
            let newLeft = rectBox.left;

            // 🟢 KEMBALI KE 8 ARAH UTUH
            switch (currentSnap) {
                case 'bottom-left': newTop = rectBox.bottom + gap; newLeft = rectBox.left; break;
                case 'bottom-right': newTop = rectBox.bottom + gap; newLeft = rectBox.right - dashWidth; break;
                case 'top-left': newTop = rectBox.top - dashHeight - gap; newLeft = rectBox.left; break;
                case 'top-right': newTop = rectBox.top - dashHeight - gap; newLeft = rectBox.right - dashWidth; break;
                case 'right-top': newLeft = rectBox.right + gap; newTop = rectBox.top; break;
                case 'right-bottom': newLeft = rectBox.right + gap; newTop = rectBox.bottom - dashHeight; break;
                case 'left-top': newLeft = rectBox.left - dashWidth - gap; newTop = rectBox.top; break;
                case 'left-bottom': newLeft = rectBox.left - dashWidth - gap; newTop = rectBox.bottom - dashHeight; break;
            }

            dash.style.left = newLeft + "px";
            dash.style.top = newTop + "px";
            localStorage.setItem("dashPosX", newLeft);
            localStorage.setItem("dashPosY", newTop);
        }

        function evaluateSnap() {
            const threshold = 30;
            let rectB = box.getBoundingClientRect();
            let rectD = dash.getBoundingClientRect();

            let dLeft = Math.abs(rectD.right - rectB.left);
            let dRight = Math.abs(rectD.left - rectB.right);
            let dTop = Math.abs(rectD.bottom - rectB.top);
            let dBottom = Math.abs(rectD.top - rectB.bottom);

            let vAligned = !(rectD.bottom < rectB.top - threshold || rectD.top > rectB.bottom + threshold);
            let hAligned = !(rectD.right < rectB.left - threshold || rectD.left > rectB.right + threshold);

            let isDashCenterXLeftOfBoxCenter = (rectD.left + rectD.width / 2) < (rectB.left + rectB.width / 2);
            let isDashCenterYTopOfBoxCenter = (rectD.top + rectD.height / 2) < (rectB.top + rectB.height / 2);

            if (dBottom < threshold && hAligned) return isDashCenterXLeftOfBoxCenter ? 'bottom-left' : 'bottom-right';
            if (dTop < threshold && hAligned) return isDashCenterXLeftOfBoxCenter ? 'top-left' : 'top-right';
            if (dRight < threshold && vAligned) return isDashCenterYTopOfBoxCenter ? 'right-top' : 'right-bottom';
            if (dLeft < threshold && vAligned) return isDashCenterYTopOfBoxCenter ? 'left-top' : 'left-bottom';

            return null;
        }

        // --- SAAT MOUSE DILEPAS ---
        document.addEventListener("mouseup", function(e) {
            if(drag || dashDrag) {
                let isBoxDrag = drag;
                let isDashDrag = dashDrag;

                drag = false;
                dashDrag = false;
                box.style.cursor = "grab";
                dash.style.cursor = "grab";
                document.body.style.userSelect = "";

                // 🟢 HANYA EKSEKUSI MAGNET JIKA PANEL BENAR-BENAR DIGESER (Bukan cuma diklik)
                if (hasMoved) {
                    currentSnap = evaluateSnap();
                    if (currentSnap) {
                        localStorage.setItem("qcMagneticSnap", currentSnap);
                        localStorage.setItem("qcPosX", box.style.left);
                        localStorage.setItem("qcPosY", box.style.top);

                        dash.style.transition = "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                        updateSnapPos();

                        // 🟢 PANGGIL ANIMASI BENTURAN!
                        playSquishAnimation(box, 'snap');
                        playSquishAnimation(dash, 'snap');

                        setTimeout(() => { dash.style.transition = "none"; }, 250);
                    } else {
                        localStorage.removeItem("qcMagneticSnap");
                        if (isBoxDrag) snapToEdge(box, "qcPosX", "qcPosY");
                        if (isDashDrag) snapToEdge(dash, "dashPosX", "dashPosY");
                    }
                }
                hasMoved = false; // Reset sensor
            }
        });

        // --- SAAT MOUSE DISERET ---
        document.addEventListener("mousemove", function(e) {
            if (drag || dashDrag) hasMoved = true; // 🟢 Tandai bahwa mouse sungguhan digeser

            if(drag) {
                box.style.left = (e.clientX - offsetX) + "px";
                box.style.top = (e.clientY - offsetY) + "px";
                if (currentSnap) updateSnapPos();
            }
            if(dashDrag) {
                // 2. Seret Dashboard (Anak)
                dash.style.left = (e.clientX - dashOffsetX) + "px";
                dash.style.top = (e.clientY - dashOffsetY) + "px";
                dash.style.right = "auto";

                // Menarik anak akan memutuskan ikatan magnetnya seketika (Un-snap)
                if (currentSnap) {
                    currentSnap = null;
                    localStorage.removeItem("qcMagneticSnap");

                    // 🟢 PANGGIL ANIMASI LENGKET / DITARIK!
                    playSquishAnimation(box, 'pull');
                    playSquishAnimation(dash, 'pull');
                }
            }
        });
        // PEMICU UPDATE OTOMATIS SAAT INTERAKSI
        document.addEventListener("click", function(e) {
            const isSubmit = e.target.closest(".submit-button, .js-submit-button");
            const isFailAction = e.target.closest(".qc-tool-fail-image-modal__save");
            const isUndoAction = e.target.closest(".qc-row__undo-exception-button");

            if(isSubmit || isFailAction || isUndoAction) {
                // LOGIKA KHUSUS UNDO (IMAGE-SPECIFIC & SKU-SPECIFIC)
                if(isUndoAction) {
                    const row = e.target.closest(".qc-row");
                    const sku = row ? row.dataset.sku : null;
                    const card = e.target.closest(".js-qc-row__image-card"); // Cari apakah undo dilakukan pada kartu gambar spesifik
                    // ⚡ INSTANT UI CLEANUP (HILANGKAN DELAY PREVIEW & BORDER)
                    if (card) {
                        const previewBox = card.querySelector(".qc-reason-preview");
                        if (previewBox) previewBox.remove();
                        card.classList.remove("qc-thick-fail-border");
                    } else if (row) {
                        // Jika Undo diklik dari luar kartu (Undo All baris tersebut)
                        row.querySelectorAll(".qc-reason-preview").forEach(box => box.remove());
                        row.querySelectorAll(".js-qc-row__image-card").forEach(c => c.classList.remove("qc-thick-fail-border"));
                    }
                    let undoneUrl = "";

                    // Dapatkan URL gambar yang spesifik di-undo
                    if (card) {
                        const img = card.querySelector("img");
                        if (img) undoneUrl = img.src.split('?')[0];
                    }

                    if(sku) {
                        let skuStillHasFails = false;

                        if (undoneUrl) {
                            // SKENARIO 1: UNDO SPESIFIK 1 GAMBAR
                            if (stagedFails.has(sku)) {
                                let images = stagedFails.get(sku);
                                let targetImg = images.find(f => f.url === undoneUrl);

                                // Ubah status gambar ini kembali menjadi PASS
                                if (targetImg && targetImg.status === "FAIL") {
                                    targetImg.status = "PASS";
                                    targetImg.reason = "";
                                    console.log(`[QC] Staged Fail dibatalkan untuk gambar spesifik: ${undoneUrl}`);
                                }
                                // Cek apakah MASIH ADA gambar lain di SKU ini yang berstatus FAIL?
                                skuStillHasFails = images.some(f => f.status === "FAIL");
                            }

                            // Hapus spesifik gambar ini dari memori failData permanen
                            failData = failData.filter(r => !(r[2] === sku && r[7] === undoneUrl));
                            localStorage.setItem("qcFailData", JSON.stringify(failData));

                        } else {
                            // SKENARIO 2: UNDO SELURUH SKU SEKALIGUS (Tombol Undo di luar kartu gambar)
                            skuStillHasFails = false; // Anggap semua gambar sudah bersih
                        }

                        // JIKA SKU INI SUDAH BENAR-BENAR BERSIH (TIDAK ADA GAMBAR FAIL SAMA SEKALI)
                        if (!skuStillHasFails) {
                            console.log(`[QC] SKU ${sku} sudah bersih total dari Fail di Staging.`);
                            // 1. Hapus HANYA dari Staging Memory
                            if (stagedFails.has(sku)) stagedFails.delete(sku);

                            // 2. Cabut stempel anti-spam agar bisa disubmit normal nanti
                            row.removeAttribute("data-qc-submitted");
                        }

                        // Reset jejak tracking visual pada elemen HTML
                        if (card) {
                            card.querySelectorAll('[data-qc-tracked]').forEach(el => el.removeAttribute('data-qc-tracked'));
                        } else {
                            row.querySelectorAll('[data-qc-tracked]').forEach(el => el.removeAttribute('data-qc-tracked'));
                        }
                    }
                }

                // Jalankan update dashboard setelah delay agar DOM selesai berubah
                setTimeout(() => {
                    if(typeof window.updateQCDashboard === "function") {
                        window.updateQCDashboard();
                    }
                }, 500);
            }
        });
        // ===== STORAGE & ROLE CHECK =====
        let activeUserKey = localStorage.getItem("qcActiveLicense") || null;
        let isAndrew = activeUserKey === "USER-011";

        let count = parseInt(localStorage.getItem("qcCount")) || 0;
        let target = parseInt(localStorage.getItem("qcTarget")) || 50;
        let totalImages = parseInt(localStorage.getItem("qcTotalImages")) || 0;
        let passEventCount = parseInt(localStorage.getItem("qcPassEventCount")) || 0;
        let failEventCount = parseInt(localStorage.getItem("qcFailEventCount")) || 0;

        let failData = JSON.parse(localStorage.getItem("qcFailData") || "[]");
        let passData = JSON.parse(localStorage.getItem("qcPassData") || "[]");
        // AUTO-MIGRASI DATA LAMA:
        failData = failData.map(r => r.length === 9 ? [r[0], r[1], r[2], "N/A", r[3], r[4], r[5], r[6], r[7], r[8]] : r);
        passData = passData.map(r => r.length === 9 ? [r[0], r[1], r[2], "N/A", r[3], r[4], r[5], r[6], r[7], r[8]] : r);
        localStorage.setItem("qcFailData", JSON.stringify(failData));
        localStorage.setItem("qcPassData", JSON.stringify(passData));
        // Menyimpan SKU terakhir yang berhasil dihitung gambarnya
        let lastProcessedSkus = JSON.parse(localStorage.getItem("qcLastProcessedSkus") || "[]");
        let posX = parseInt(localStorage.getItem("qcPosX")) || 20;
        let posY = parseInt(localStorage.getItem("qcPosY")) || 20;
        let minimized = localStorage.getItem("qcMin") === "true";
        // Nilai awal slider opacity (default: 0.95 = solid, 0.1 = sangat pudar)
        let currentOpacity = parseFloat(localStorage.getItem("qcOpacity")) || 0.95;
        let isLocked = localStorage.getItem("qcUiLocked") === "true";
        // SMART DELAY SETTINGS
        let delayEnabled = localStorage.getItem("qcDelayEnabled") !== "false"; // Default is ON (true)
        let delaySeconds = parseInt(localStorage.getItem("qcDelaySeconds")) || 3; // Default is 3 seconds
        let stopwatchTime = parseInt(localStorage.getItem("qcStopwatch")) || 0;
        let stopwatchRunning = localStorage.getItem("qcRunning") === "true";
        let isDashLocked = localStorage.getItem("qcDashLocked") === "true";
        // ==========================================
        // ===== UI =====
        const box = document.createElement("div");
        box.id = "qc-counter-pro";
        // Logika Posisi Baru (Membaca koordinat absolut dari memori)
        if (isLocked) {
            box.style.position = "absolute";
            box.style.left = (localStorage.getItem("qcAbsPosX") || posX) + "px";
            box.style.top = (localStorage.getItem("qcAbsPosY") || posY) + "px";
        } else {
            box.style.position = "fixed";
            // Pastikan ini selalu menggunakan posX dan posY dari memori
            box.style.left = posX + "px";
            box.style.top = posY + "px";
        }
        // Box sekarang membaca nilai opacity langsung
        box.style.background = `rgba(10,10,10,${currentOpacity})`;
        box.style.backdropFilter = "blur(14px)";
        box.style.webkitBackdropFilter = "blur(14px)";
        box.style.color = "#f5d48f";
        box.style.padding = "10px";
        box.style.fontSize = "10px";
        box.style.border = "1px solid rgba(255,218,134,0.4)";
        box.style.borderRadius = "14px";
        box.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
        box.style.zIndex = "9999";
        box.style.cursor = "grab";
        box.style.minWidth = "220px";
        box.style.transition = "all 0.25s ease";
        box.style.userSelect = "none";
        box.style.opacity = "0";
        box.style.transform = "translateY(-15px)"; // Efek melayang dari atas
        box.style.transition = "opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.25s ease";
        // Hover glow (FIXED: Efek translateY dihapus agar koordinat tidak bocor)
        box.addEventListener("mouseenter", function() {
            box.style.boxShadow = "0 0 25px rgba(245,212,143,0.45)";
        });
        box.addEventListener("mouseleave", function() {
            box.style.boxShadow = "0 10px 30px rgba(0,0,0,0.6)";
        });
        // ===== INNER HTML =====
        let userHTML = "";
        if(activeUserKey && USERS[activeUserKey]) {
            userHTML = `<div id="qc-user-active" style="margin-bottom:6px;font-weight:600;display:flex;align-items:center;gap:6px;">QCer: ${USERS[activeUserKey]} <button id="qc-logout" style="font-size:10px;padding:2px 6px;border-radius:5px;border:1px solid #ff4d4d;color:#ff4d4d;background:rgba(255,0,0,0.05);cursor:pointer;">Logout</button></div>`;
        } else {
            let options = "";
            Object.keys(USERS).forEach(function(k) {
                options += `<option value="${k}">${USERS[k]}</option>`;
            });
            userHTML = `<div id="qc-login-container" style="margin-bottom:6px;display:flex;gap:4px;"><select id="qc-user-select" style="font-size:10px;padding:2px 4px;">${options}</select><button id="qc-login" style="font-size:10px;padding:2px 6px;border-radius:5px;border:1px solid #ffda86;color:#ffda86;background:rgba(255,255,255,0.05);cursor:pointer;">Login</button></div>`;
        }
        box.innerHTML = `
        <div id="qc-header" style="font-weight:600;margin-bottom:8px;text-align:center;font-size:14px;">
        QC: <span id="qc-count" style="font-size:16px">${count}</span> |
        IMG: <span id="qc-image-count" style="font-size:16px">${totalImages}</span>
        <div style="font-size:9px; color:#aaa; text-transform:uppercase;">Page Volume: <b id="qc-page-vol" style="color:#f5d48f;">0</b> SKU</div>


        </div>
        ${userHTML}
        <div id="qc-body" style="transition:all 0.25s ease;">
        Target:
        <input type="number" id="qc-target-input" value="${target}" style="width:55px;font-size:10px">
        <button id="qc-set-target">Set</button>
        <div style="margin-top:6px;">
        Progress:
        <div style="background:rgba(255,255,255,0.08);height:6px;border-radius:6px;overflow:hidden;">
        <div id="qc-progress" style="height:6px;width:0%;background:linear-gradient(90deg,#f5d48f,#ffb347);border-radius:6px;"></div>
        </div>
        </div>
        <div style="margin-top:8px;">
        ⏱ <span id="qc-stopwatch">00:00:00</span>
        <button id="qc-start-stop">${stopwatchRunning ? 'Stop' : 'Start'}</button>
        <button id="qc-reset-time">Reset</button>
        </div>
        <div style="margin-top:8px;display:flex;align-items:center;gap:4px;">
            <button id="qc-dec" style="font-size:10px;">-</button>
            QC Count
            <button id="qc-inc" style="font-size:10px;">+</button>
            <input type="number" id="qc-manual" placeholder="Input" style="width:50px;font-size:10px">
            <button id="qc-set-manual">Set</button> <button id="qc-reset-count">Reset</button>
        </div>
        <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:5px; align-items:center;">
            <div style="display:flex; align-items:center; gap:4px; padding:0 2px; margin-left:2px;" title="Adjust Transparency">
                <span style="font-size:11px; opacity:0.8;">Transparency</span>
                <input type="range" id="qc-opacity-slider" min="0.1" max="1" step="0.05" value="${currentOpacity}" style="width:50px; height:4px; cursor:pointer; accent-color:#00ff88;">
            </div>
            <div style="display:flex; align-items:center; gap:4px; padding:0 2px; border-left: 1px solid rgba(255,255,255,0.2); padding-left: 6px;" title="Smart Submit Delay">
                <label style="font-size:11px; opacity:0.8; display:flex; align-items:center; cursor:pointer; color: #fff;">
                    <input type="checkbox" id="qc-delay-toggle" ${delayEnabled ? 'checked' : ''} style="margin:0 4px 0 0; cursor:pointer; accent-color:#00ff88;"> Delay
                </label>
                <input type="range" id="qc-delay-slider" min="1" max="5" step="1" value="${delaySeconds}" ${!delayEnabled ? 'disabled' : ''} style="width:40px; height:4px; cursor:pointer; accent-color:#00d4ff; ${!delayEnabled ? 'opacity:0.4;' : ''}">
                <span id="qc-delay-val" style="font-size:10px; color:#00d4ff; font-weight:bold; ${!delayEnabled ? 'opacity:0.4;' : ''}">${delaySeconds}s</span>
            </div>
            <button id="qc-reset-images">Reset IMG</button>
            <button id="qc-export-csv">Export CSV</button>
            <button id="qc-toggle-lock" title="Lock Position">${isLocked ? '🔒' : '🔓'}</button>
            <button id="qc-toggle-darkmode" title="Toggle Dark Mode" style="font-size:12px; padding:2px 5px;">${isDarkModeOn ? '☀️' : '🌙'}</button>
        </div>
        <div style="margin-top:6px;">
        <button id="qc-btn-whats-new" title="View Update Notes" style="font-size:10px; padding:2px 5px; background:rgba(0,212,255,0.1); color:#00d4ff; border:1px solid rgba(0,212,255,0.3); border-radius:4px; margin-left:auto;">What's New?</button>
        </div>
        </div>
        `;
        document.body.appendChild(box);
        // Jeda 80ms memaksa browser merender state awal sebelum memulai transisi
        setTimeout(() => {
            box.style.opacity = "1";
            box.style.transform = "translateY(0)";
        }, 80);
        // ===== BUTTON STYLES =====
        box.querySelectorAll("button").forEach(btn => {
            btn.style.background = "rgba(255,255,255,0.05)";
            btn.style.border = "1px solid rgba(255,218,134,0.4)";
            btn.style.color = "#f5d48f";
            btn.style.borderRadius = "6px";
            btn.style.padding = "2px 6px";
            btn.style.cursor = "pointer";
            btn.style.transition = "all 0.2s ease";
            btn.onmouseenter = () => {
                btn.style.background = "rgba(255,255,255,0.15)";
                btn.style.boxShadow = "0 0 8px rgba(245,212,143,0.6)";
            }
            btn.onmouseleave = () => {
                btn.style.background = "rgba(255,255,255,0.05)";
                btn.style.boxShadow = "none";
            }
        });
        // ===== ELEMENTS =====
        const countEl = document.getElementById("qc-count");
        const countDisplay = document.getElementById("qc-count-display");
        const imageEl = document.getElementById("qc-image-count");
        const progressEl = document.getElementById("qc-progress");
        const stopwatchEl = document.getElementById("qc-stopwatch");
        const bodyEl = document.getElementById("qc-body");
        const userActiveEl = document.getElementById("qc-user-active") || document.getElementById("qc-login-container");
        const setManualBtn = document.getElementById("qc-set-manual");
        const manualInput = document.getElementById("qc-manual");
        if(setManualBtn) {
            setManualBtn.onclick = function(e) {
                e.stopPropagation();
                const newVal = parseInt(manualInput.value);
                if(!isNaN(newVal)) {
                    count = newVal;
                    localStorage.setItem("qcCount", count);
                    updateProgress(); // Memperbarui tampilan angka dan bar progress
                    manualInput.value = ""; // Bersihkan input setelah set
                } else {
                    alert("Please enter a valid number");
                }
            };
        }
        // ===== COLLAPSE/EXPAND VIA HEADER =====
        const headerEl = document.getElementById("qc-header");
        if(minimized) bodyEl.style.display = "none";
        headerEl.addEventListener("dblclick", (e) => {
            e.stopPropagation();
            window.getSelection().removeAllRanges(); // Bersihkan blok biru instan saat klik 2x

            if(bodyEl.style.display === "none") {
                bodyEl.style.display = "block";
                localStorage.setItem("qcMin", "false");
                countEl.style.fontSize = "16px";
                imageEl.style.fontSize = "16px";
                if (localStorage.getItem("qcBoxH")) box.style.height = localStorage.getItem("qcBoxH"); // Kembalikan ukurannya
            } else {
                bodyEl.style.display = "none";
                localStorage.setItem("qcMin", "true");
                countEl.style.fontSize = "13px";
                imageEl.style.fontSize = "13px";
                box.style.height = "auto"; // Kempeskan paksa
            }
            // 🌟 KEMBALIKAN MAGNET DENGAN ANIMASI HALUS (SMOOTH GLIDE)
            if (currentSnap) {
                dash.style.transition = "top 0.3s ease, left 0.3s ease";
                setTimeout(() => {
                    updateSnapPos(); // Paksa Dashboard mengejar ukuran baru Toolbar

                    // Matikan transisi setelah selesai agar tidak mengganggu saat di-drag mouse
                    setTimeout(() => { dash.style.transition = "none"; }, 300);
                }, 10); // Jeda sangat kecil agar DOM selesai merender ukuran baru
            }
        });
        // ===== LOGIN / LOGOUT =====
        const loginBtn = document.getElementById("qc-login");
        if(loginBtn) {
            loginBtn.onclick = function(e) {
                e.stopPropagation();
                const sel = document.getElementById("qc-user-select");
                const val = sel.value;

                if(USERS[val]) {
                    // 🔒 SECURITY CHECK FOR ADMIN ACCOUNT (ANDREW)
                    if (val === "USER-011") {
                        // Prompt for password
                        let pwd = prompt("🔒 Restricted Access\n\nPlease enter the Admin password to login as Andrew:");

                        if (pwd !== "admin202601") {
                            alert("❌ Incorrect password. Access denied.");
                            return; // Stop the login process instantly
                        }
                    }

                    // If it's a normal user, or if Andrew entered the right password, proceed:
                    localStorage.setItem("qcActiveLicense", val);
                    location.reload();
                }
            };
        }

        const logoutBtn = document.getElementById("qc-logout");
        if(logoutBtn) {
            logoutBtn.onclick = function(e) {
                e.stopPropagation();
                localStorage.removeItem("qcActiveLicense");
                location.reload();
            };
        }

        let celebrationActive = false;
        function launchConfettiAroundToolbar(toolbar) {
            if(celebrationActive) return;
            celebrationActive = true;
            const rect = toolbar.getBoundingClientRect();
            const colors = ["#f5d48f", "#ffb347", "#00ff88", "#00d4ff", "#ff4d4d", "#ffffff", "#ffd700", "#ff69b4"];
            const container = document.createElement("div");
            container.style.position = "fixed";
            container.style.left = rect.left + "px";
            container.style.top = rect.top + "px";
            container.style.width = rect.width + "px";
            container.style.height = rect.height + "px";
            container.style.pointerEvents = "none";
            container.style.zIndex = "10000";
            document.body.appendChild(container);
            const particleCount = 100;
            for(let i = 0; i < particleCount; i++) {
                const piece = document.createElement("div");
                piece.style.position = "absolute";
                piece.style.width = Math.random() > 0.5 ? "6px" : "4px";
                piece.style.height = piece.style.width;
                piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                piece.style.left = rect.width / 2 + "px";
                piece.style.top = rect.height / 2 + "px";
                piece.style.borderRadius = "2px";
                piece.style.opacity = "1";
                piece.style.transform = "translate(0,0) rotate(0deg)";
                piece.style.transition = "transform 1.4s cubic-bezier(.17,.67,.83,.67), opacity 1.4s ease-out";
                container.appendChild(piece);
                const angle = Math.random() * 2 * Math.PI;
                const radius = 80 + Math.random() * 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                setTimeout(() => {
                    piece.style.transform = `translate(${x}px,${y}px) rotate(${Math.random()*720}deg)`;
                    piece.style.opacity = "0";
                }, 30);
            }
            setTimeout(() => {
                container.remove();
                celebrationActive = false;
            }, 1600);
        }

        function celebrationGlow(toolbar) {
            const glow = document.createElement("div");
            glow.style.position = "fixed";
            glow.style.left = toolbar.offsetLeft - 20 + "px";
            glow.style.top = toolbar.offsetTop - 20 + "px";
            glow.style.width = toolbar.offsetWidth + 40 + "px";
            glow.style.height = toolbar.offsetHeight + 40 + "px";
            glow.style.borderRadius = "20px";
            glow.style.background = "radial-gradient(circle, rgba(0,255,120,0.6) 0%, rgba(0,255,120,0.2) 40%, transparent 70%)";
            glow.style.pointerEvents = "none";
            glow.style.zIndex = "9998";
            glow.style.opacity = "0.9";
            glow.style.transition = "opacity 1.2s ease-out, transform 1.2s ease-out";
            document.body.appendChild(glow);
            setTimeout(() => {
                glow.style.opacity = "0";
                glow.style.transform = "scale(1.3)";
            }, 50);
            setTimeout(() => {
                glow.remove();
            }, 1300);
        }

        function playCelebrationSound() {
            try {
                const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.type = "triangle";
                oscillator.frequency.setValueAtTime(523, audioCtx.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
                gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.start();
                oscillator.stop(audioCtx.currentTime + 0.5);
            } catch (e) {
                console.log("Audio blocked by browser policy");
            }
        }
        // ==============================================================
        // ⌨️ MAGIC SHORTCUTS: TAB+SPACE | SPACE | SHIFT+SPACE | F | X | ARROWS | ENTER | Z | U | ESC
        // ==============================================================
        let isTabPressed = false;
        let lastShortcutTime = 0;
        let lastSpaceJumpTime = 0;

        let activeRowForSelection = null;
        let activeImageIndex = -1;

        function clearImageHighlight() {
            document.querySelectorAll(".qc-image-highlight, .qc-multi-selected").forEach(el => {
                el.style.outline = "none";
                el.style.transform = "scale(1)";
                el.style.boxShadow = "none";
                el.style.zIndex = "1";
                el.classList.remove("qc-image-highlight", "qc-multi-selected");
            });
            activeRowForSelection = null;
            activeImageIndex = -1;
            window.__qcMultiFailQueue = [];
        }

        // Fungsi Helper untuk merender visual (Kuning = Bidik, Ungu = Terpilih)
        function renderTargetVisuals(imageCards) {
            imageCards.forEach(card => {
                card.classList.remove("qc-image-highlight");
                if (card.classList.contains("qc-multi-selected")) {
                    card.style.outline = "5px dashed #b582fa";
                    card.style.boxShadow = "0 15px 30px rgba(181, 130, 250, 0.6)";
                    card.style.transform = "scale(1)";
                    card.style.zIndex = "1";
                } else {
                    card.style.outline = "none";
                    card.style.boxShadow = "none";
                    card.style.transform = "scale(1)";
                    card.style.zIndex = "1";
                }
            });

            if (activeImageIndex >= 0 && imageCards[activeImageIndex]) {
                const selectedCard = imageCards[activeImageIndex];
                selectedCard.classList.add("qc-image-highlight");

                if (selectedCard.classList.contains("qc-multi-selected")) {
                    selectedCard.style.outline = "5px dashed #b582fa";
                    selectedCard.style.boxShadow = "0 15px 30px rgba(181, 130, 250, 0.8)";
                } else {
                    // 🟢 MENGGUNAKAN VARIABEL BINGKAI BUNGLON
                    // Default (Light Mode) akan menggunakan warna Biru Royal (#2563eb)
                    selectedCard.style.outline = "4px solid var(--qc-target-color, #2563eb)";
                    selectedCard.style.boxShadow = "0 15px 30px var(--qc-target-shadow, rgba(37, 99, 235, 0.4))";
                }

                selectedCard.style.outlineOffset = "-4px";
                selectedCard.style.transform = "scale(1.03)";
                selectedCard.style.zIndex = "10";
                selectedCard.style.transition = "all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

                // 🟢 KAMERA OTOMATIS (SMART SCROLL)
                // Mengecek apakah gambar ini tertutup batas atas atau batas bawah layar
                const rect = selectedCard.getBoundingClientRect();
                const viewHeight = window.innerHeight;

                // Margin 60px agar gambar tidak terlalu mepet dengan header The RealReal
                if (rect.bottom > viewHeight - 60 || rect.top < 60) {
                    selectedCard.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }
        }

        document.addEventListener('keydown', function(e) {
            if (window.__isAutoFailing) { e.preventDefault(); return; }
            if (e.key === 'Tab') isTabPressed = true;

            const activeEl = document.activeElement;
            const activeTag = activeEl ? activeEl.tagName.toLowerCase() : '';
            const isTyping = ['input', 'textarea', 'select'].includes(activeTag) || (activeEl && activeEl.isContentEditable);

            // ⚡ SMART DOUBLE-TAP CATCHER
            if (isSubmitting && !isTyping && !isTabPressed && !e.repeat && (e.key === 'Enter' || e.key === ' ' || e.code === 'Space')) {
                e.preventDefault();
                e.stopPropagation();
                triggerUniversalSubmit(); // Let the Universal Catch hunt the button automatically!
                return;
            }
            // 🟢 TAMBAHAN: Deteksi jika kursor sedang berada/fokus di atas Tombol atau Link
            const isActionableFocused = ['button', 'a'].includes(activeTag) || (activeTag === 'input' && ['submit', 'button', 'checkbox', 'radio'].includes(activeEl.type));

            const modalFail = document.querySelector("#qc-tool-fail-image-modal");
            const isFailModalOpen = modalFail && modalFail.offsetWidth > 0 && modalFail.offsetHeight > 0;
            const modalZoom = document.querySelector("#qc-tool-detailed-image-modal");
            const isZoomOpen = modalZoom && window.getComputedStyle(modalZoom).display !== "none" && modalZoom.offsetWidth > 0;

            // 🟢 LINDUNGI FOKUS TOMBOL: Jika QCer menekan Enter/Spasi saat fokus di tombol (misal setelah Tab),
            // lepaskan kuncian shortcut agar browser bisa menekan tombol tersebut secara alami!
            if (isActionableFocused && (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') && !isTabPressed) {
                return; // Berhenti di sini, biarkan Jaring Universal (klik mouse) yang menangkap efek kliknya!
            }

            // ==========================================
            // 🔒 SKENARIO TAB: FOCUS TRAP (KUNCI FOKUS DI DALAM MODAL)
            // ==========================================
            if (e.key === 'Tab' && isFailModalOpen) {
                e.preventDefault(); // Tahan sifat asli Tab agar tidak bocor ke background

                // Kumpulkan elemen penting di dalam modal
                const selectReason = document.querySelector("#s2id_qc_fail_reason a") || document.querySelector("#qc_fail_reason");
                const saveBtn = modalFail.querySelector(".qc-tool-fail-image-modal__save");
                const cancelBtn = modalFail.querySelector(".qc-tool-fail-image-modal__cancel");

                // 🔄 URUTAN BARU: Select Reason ➔ Save ➔ Cancel
                const focusables = [selectReason, saveBtn, cancelBtn].filter(el => el != null);

                if (focusables.length > 0) {
                    // Cari di mana fokus kursor saat ini berada
                    let currentIndex = focusables.findIndex(el => el === document.activeElement || el.contains(document.activeElement));

                    if (e.shiftKey) {
                        // Jika Shift + Tab (Mundur)
                        currentIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
                    } else {
                        // Jika Tab biasa (Maju)
                        currentIndex = currentIndex >= focusables.length - 1 || currentIndex === -1 ? 0 : currentIndex + 1;
                    }

                    // Pindahkan fokus ke elemen selanjutnya di dalam siklus
                    focusables[currentIndex].focus();
                }
                return;
            }

            // ==========================================
            // 🎯 SKENARIO TAB: MAGNET FOKUS KE TOMBOL SUBMIT TERDEKAT (SMART SENSOR)
            // ==========================================
            if (e.key === 'Tab' && !isFailModalOpen && !isZoomOpen && !isTyping) {
                e.preventDefault(); // 🛑 Cegah kursor jalan-jalan ke header TRR atau UI lain

                // 🧹 MUTUALLY EXCLUSIVE: Hancurkan bidikan gambar (F) agar QCer fokus ke Submit!
                clearImageHighlight();

                // 1. Ambil SEMUA tombol submit yang aktif di halaman (Atas & Bawah)
                const submitBtns = Array.from(document.querySelectorAll(".submit-button:not([disabled]), .js-submit-button:not([disabled])"))
                                        .filter(btn => btn.offsetWidth > 0 || btn.offsetHeight > 0); // Pastikan tombolnya tidak disembunyikan (display: none)

                if (submitBtns.length > 0) {
                    let closestBtn = null;
                    let minDistance = Infinity;
                    const viewportCenter = window.innerHeight / 2; // Titik tengah layar Anda saat ini

                    // 2. 📡 Radar Jarak: Hitung jarak setiap tombol ke tengah layar
                    submitBtns.forEach(btn => {
                        const rect = btn.getBoundingClientRect();
                        const btnCenter = rect.top + (rect.height / 2);
                        const distance = Math.abs(viewportCenter - btnCenter); // Jarak absolut

                        // Jika jarak tombol ini lebih dekat dari rekor sebelumnya, jadikan target utama
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestBtn = btn;
                        }
                    });

                    // 3. ⚡ Eksekusi Magnet ke Tombol Paling Dekat
                    if (closestBtn) {
                        closestBtn.focus(); // Kunci fokus tanpa membuat layar meloncat jauh

                        // 🌟 Beri efek visual Hijau Neon sesaat agar QCer sadar tombol sudah terkunci
                        const origShadow = closestBtn.style.boxShadow;
                        const origOutline = closestBtn.style.outline;
                        closestBtn.style.outline = "1px solid #00ff88";
                        closestBtn.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.5)";

                        // Hilangkan efek neon setelah 600ms
                        setTimeout(() => {
                            closestBtn.style.outline = origOutline;
                            closestBtn.style.boxShadow = origShadow;
                        }, 300);
                    }
                }
                return;
            }

            // ==========================================
            // 🛑 SKENARIO ESCAPE: BATALKAN SUBMIT ATAU LEPASKAN FOKUS
            // ==========================================
            if (e.key === 'Escape') {
                // 1. CEK: Apakah sedang dalam mode hitung mundur 3 detik Submit?
                if (window.__qcPendingSubmitTimer && typeof window.__cancelPendingSubmit === 'function') {
                    e.preventDefault();
                    window.__cancelPendingSubmit(); // 🛑 Bunuh proses submit segera!
                    return;
                }

                // 2. HILANGKAN FOKUS: Jika kursor sedang menyorot tombol biasa
                if (isActionableFocused && activeEl) {
                    activeEl.blur();
                }

                // 3. Batalkan bidikan Kursor (F) atau Multi-Select (X)
                if (!isTyping && !isFailModalOpen && !isZoomOpen) {
                    e.preventDefault();
                    clearImageHighlight();
                }
                return;
            }

            // ==========================================
            // 🔍 SKENARIO Z: ZOOM IN / ZOOM OUT
            // ==========================================
            if (e.key.toLowerCase() === 'z' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping && !isFailModalOpen) {
                e.preventDefault();
                if (isZoomOpen) {
                    const closeBtn = modalZoom.querySelector(".qc-tool-detailed-image-modal__close-button");
                    if (closeBtn) closeBtn.click();
                } else {
                    const highlightedCard = document.querySelector(".qc-image-highlight");
                    if (highlightedCard) {
                        const imgEl = highlightedCard.querySelector(".js-qc-row__image");
                        if (imgEl) imgEl.click();
                    }
                }
                return;
            }

            // ==========================================
            // ↩️ SKENARIO U: UNDO FAIL (SINGLE & MULTI-SELECT MASS UNDO)
            // ==========================================
            if (e.key.toLowerCase() === 'u' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping && !isFailModalOpen && !isZoomOpen) {
                e.preventDefault();

                // 1. Kumpulkan semua gambar yang ditandai Ungu (Multi-select)
                let cardsToUndo = Array.from(document.querySelectorAll(".qc-multi-selected"));
                const highlightedCard = document.querySelector(".qc-image-highlight");

                // 2. Gabungkan dengan gambar yang sedang dibidik Kursor (Kuning/Biru)
                if (cardsToUndo.length === 0 && highlightedCard) {
                    cardsToUndo.push(highlightedCard);
                } else if (cardsToUndo.length > 0 && highlightedCard && !cardsToUndo.includes(highlightedCard)) {
                    cardsToUndo.push(highlightedCard);
                }

                if (cardsToUndo.length > 0) {
                    cardsToUndo.forEach(card => {
                        const undoBtn = card.querySelector(".qc-row__undo-exception-button");
                        // Eksekusi hanya jika gambar tersebut memang berstatus Fail (tombol Undo-nya muncul)
                        if (undoBtn && window.getComputedStyle(undoBtn).display !== "none") {
                            Click(undoBtn); // 🪄 Tembak tombol Undo!

                            // Efek visual penyembuhan (Hijau Neon)
                            card.style.boxShadow = "0 15px 40px rgba(0, 255, 136, 0.8)";
                            card.style.outline = "4px solid #00ff88";
                            card.classList.remove("qc-multi-selected"); // Lepaskan jeratan seleksi
                        }
                    });

                    // Kembalikan visual ke normal setelah efek hijau selesai (300ms)
                    setTimeout(() => {
                        if (cardsToUndo.length > 0) {
                            const parentRow = cardsToUndo[0].closest(".qc-row");
                            if (parentRow) {
                                // Memanggil fungsi perender agar garis kursor bidikan kembali terpasang rapi
                                renderTargetVisuals(Array.from(parentRow.querySelectorAll(".js-qc-row__image-card")));
                            }
                        }
                    }, 300);

                    window.__qcMultiFailQueue = []; // Kosongkan antrean robot pembunuh (jika ada)
                }
                return;
            }

            // ==========================================
            // ✖️ SKENARIO X: TOGGLE MULTI-SELECT MANUAL
            // ==========================================
            if (e.key.toLowerCase() === 'x' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping && !isFailModalOpen && !isZoomOpen) {
                e.preventDefault();
                const highlightedCard = document.querySelector(".qc-image-highlight");
                if (highlightedCard) {
                    highlightedCard.classList.toggle("qc-multi-selected");
                    const parentRow = highlightedCard.closest(".qc-row");
                    if (parentRow) renderTargetVisuals(Array.from(parentRow.querySelectorAll(".js-qc-row__image-card")));
                }
                return;
            }

            // ==========================================
            // 🔄 SKENARIO S: SWAP GAMBAR (TUKAR POSISI JAUH)
            // ==========================================
            if (e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping && !isFailModalOpen && !isZoomOpen) {
                e.preventDefault();

                // Cari 1 gambar yang ditandai Ungu (X) dan 1 gambar yang sedang dibidik (Kursor)
                const multiSelectedCards = Array.from(document.querySelectorAll(".qc-multi-selected"));
                const highlightedCard = document.querySelector(".qc-image-highlight");

                if (multiSelectedCards.length === 1 && highlightedCard && multiSelectedCards[0] !== highlightedCard) {
                    const cardA = multiSelectedCards[0];
                    const cardB = highlightedCard;

                    // Pastikan mereka berada di dalam baris produk (SKU) yang sama
                    const rowA = cardA.closest(".qc-row");
                    const rowB = cardB.closest(".qc-row");

                    if (rowA && rowB && rowA === rowB) {
                        // Trik Sulap Tukar Posisi DOM (Menggunakan elemen penanda sementara)
                        const marker = document.createElement("div");
                        cardA.parentNode.insertBefore(marker, cardA);
                        cardB.parentNode.insertBefore(cardA, cardB);
                        marker.parentNode.insertBefore(cardB, marker);
                        marker.parentNode.removeChild(marker);

                        // Efek visual membal agar terasa "menggigit" saat ditukar
                        cardA.style.transform = "scale(1.1)";
                        cardB.style.transform = "scale(1.1)";
                        setTimeout(() => {
                            cardA.style.transform = "scale(1)";
                            cardB.style.transform = "scale(1.03)"; // Kursor kembali membesar sedikit
                        }, 150);

                        // Lepaskan status seleksi Ungu agar tidak tidak sengaja tertukar lagi
                        cardA.classList.remove("qc-multi-selected");

                        // Perbarui urutan mesin agar panah navigasi tidak tersesat
                        const imageCards = Array.from(rowA.querySelectorAll(".js-qc-row__image-card"));
                        activeImageIndex = imageCards.indexOf(highlightedCard); // Update posisi kursor

                        renderTargetVisuals(imageCards);
                    } else {
                        // Jika user mencoba menukar gambar antar SKU yang berbeda
                        const flash = document.createElement("div");
                        flash.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(255,0,0,0.2); z-index:9999; pointer-events:none; transition:0.3s;";
                        document.body.appendChild(flash);
                        setTimeout(() => { flash.style.opacity="0"; setTimeout(()=>flash.remove(),300); }, 100);
                    }
                }
                return;
            }

            // ==========================================
            // 🎮 SKENARIO ARROW: NAVIGASI, MASS SELECT (CTRL+SHIFT) & SWAP
            // ==========================================
            const isArrow = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key);
            if (isArrow && activeRowForSelection && !isTyping && !isFailModalOpen && !isZoomOpen) {
                e.preventDefault();

                let imageCards = Array.from(activeRowForSelection.querySelectorAll(".js-qc-row__image-card"));
                if (imageCards.length === 0) return;

                // 🔄 1. LOGIKA SWAP (GESER GAMBAR BEBAS: KIRI/KANAN/ATAS/BAWAH) DENGAN TAHAN ALT / OPTION
                if (e.altKey && isArrow && activeImageIndex >= 0) {
                    let cardToMove = imageCards[activeImageIndex];
                    let parent = cardToMove.parentNode;
                    let targetIndex = -1;

                    // A. Cari tahu ke Index mana gambar ini harus mendarat
                    if (e.key === 'ArrowLeft') {
                        targetIndex = activeImageIndex - 1;
                    } else if (e.key === 'ArrowRight') {
                        targetIndex = activeImageIndex + 1;
                    } else if (e.key === 'ArrowUp') {
                        const currentRect = cardToMove.getBoundingClientRect();
                        let minDistance = Infinity;
                        for (let i = 0; i < imageCards.length; i++) {
                            const rect = imageCards[i].getBoundingClientRect();
                            if (rect.bottom < currentRect.top + 20) {
                                const dist = Math.abs(rect.left - currentRect.left);
                                if (dist < minDistance) { minDistance = dist; targetIndex = i; }
                            }
                        }
                    } else if (e.key === 'ArrowDown') {
                        const currentRect = cardToMove.getBoundingClientRect();
                        let minDistance = Infinity;
                        for (let i = 0; i < imageCards.length; i++) {
                            const rect = imageCards[i].getBoundingClientRect();
                            if (rect.top > currentRect.bottom - 20) {
                                const dist = Math.abs(rect.left - currentRect.left);
                                if (dist < minDistance) { minDistance = dist; targetIndex = i; }
                            }
                        }
                    }

                    // B. Eksekusi pemindahan fisik di DOM HTML
                    if (targetIndex >= 0 && targetIndex < imageCards.length) {
                        let referenceNode = imageCards[targetIndex];

                        if (targetIndex < activeImageIndex) {
                            parent.insertBefore(cardToMove, referenceNode); // Geser mundur
                        } else {
                            parent.insertBefore(cardToMove, referenceNode.nextSibling); // Geser maju
                        }

                        activeImageIndex = targetIndex;

                        // Perbarui array saja TANPA merender ulang visualnya (Anti-Kedip)
                        imageCards = Array.from(activeRowForSelection.querySelectorAll(".js-qc-row__image-card"));

                        // 🟢 Auto-Scroll Halus: Mengikuti gambar jika digeser ke luar layar
                        const rect = cardToMove.getBoundingClientRect();
                        if (rect.bottom > window.innerHeight - 60 || rect.top < 60) {
                            cardToMove.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    }
                    return;
                }
                // 🟢 2. LOGIKA WINDOWS EXPLORER: MASS BLOCK SELECTION (CMD/CTRL + SHIFT + ARROW)
                if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
                    let startIndex = activeImageIndex;
                    let endIndex = activeImageIndex;

                    // Ambil kordinat gambar saat ini untuk mencari teman sebarisnya
                    const currentRect = imageCards[activeImageIndex].getBoundingClientRect();

                    if (e.key === 'ArrowDown') {
                        // Tarik seleksi sampai ke gambar PALING AKHIR (Semua)
                        endIndex = imageCards.length - 1;
                    } else if (e.key === 'ArrowUp') {
                        // Tarik seleksi mundur sampai ke gambar PALING AWAL (Semua)
                        endIndex = 0;
                    } else if (e.key === 'ArrowRight') {
                        // Tarik seleksi ke kanan HANYA SEBATAS BARIS YANG SAMA
                        for (let i = activeImageIndex + 1; i < imageCards.length; i++) {
                            const rect = imageCards[i].getBoundingClientRect();
                            // Jika gambar selanjutnya melenceng lebih dari 20px secara vertikal, berarti sudah ganti baris bawahnya
                            if (Math.abs(rect.top - currentRect.top) < 20) {
                                endIndex = i;
                            } else {
                                break; // Hentikan seleksi karena sudah beda baris
                            }
                        }
                    } else if (e.key === 'ArrowLeft') {
                        // Tarik seleksi mundur ke kiri HANYA SEBATAS BARIS YANG SAMA
                        for (let i = activeImageIndex - 1; i >= 0; i--) {
                            const rect = imageCards[i].getBoundingClientRect();
                            if (Math.abs(rect.top - currentRect.top) < 20) {
                                endIndex = i;
                            } else {
                                break; // Hentikan seleksi karena sudah beda baris
                            }
                        }
                    }

                    activeImageIndex = endIndex; // Pindahkan kursor ke ujung hasil tarikan

                    // Beri warna ungu pada semua gambar yang dilewati
                    let start = Math.min(startIndex, endIndex);
                    let end = Math.max(startIndex, endIndex);
                    for (let i = start; i <= end; i++) {
                        imageCards[i].classList.add("qc-multi-selected");
                    }

                    renderTargetVisuals(imageCards);
                    return;
                }

                // 🟢 3. LOGIKA WINDOWS EXPLORER: JUMP KE UJUNG TANPA SELEKSI (CMD/CTRL + ARROW)
                if ((e.metaKey || e.ctrlKey) && !e.shiftKey) {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') activeImageIndex = imageCards.length - 1;
                    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') activeImageIndex = 0;

                    renderTargetVisuals(imageCards);
                    return;
                }

                // --- 4. LOGIKA NAVIGASI NORMAL & SWEEP SELECT BIASA (SHIFT + ARROW) ---
                if (e.shiftKey && activeImageIndex >= 0) {
                    imageCards[activeImageIndex].classList.add("qc-multi-selected"); // Tandai titik awal
                }

                const currentRect = imageCards[activeImageIndex]?.getBoundingClientRect();

                if (e.key === 'ArrowRight') {
                    activeImageIndex = (activeImageIndex + 1) % imageCards.length;
                }
                else if (e.key === 'ArrowLeft') {
                    activeImageIndex = (activeImageIndex - 1 + imageCards.length) % imageCards.length;
                }
                else if (e.key === 'ArrowDown' && currentRect) {
                    let bestMatch = -1; let minDistance = Infinity;
                    for (let i = 0; i < imageCards.length; i++) {
                        const rect = imageCards[i].getBoundingClientRect();
                        if (rect.top > currentRect.bottom - 20) {
                            const dist = Math.abs(rect.left - currentRect.left);
                            if (dist < minDistance) { minDistance = dist; bestMatch = i; }
                        }
                    }
                    if (bestMatch !== -1) activeImageIndex = bestMatch;
                }
                else if (e.key === 'ArrowUp' && currentRect) {
                    let bestMatch = -1; let minDistance = Infinity;
                    for (let i = 0; i < imageCards.length; i++) {
                        const rect = imageCards[i].getBoundingClientRect();
                        if (rect.bottom < currentRect.top + 20) {
                            const dist = Math.abs(rect.left - currentRect.left);
                            if (dist < minDistance) { minDistance = dist; bestMatch = i; }
                        }
                    }
                    if (bestMatch !== -1) activeImageIndex = bestMatch;
                }

                if (e.shiftKey) {
                    imageCards[activeImageIndex].classList.add("qc-multi-selected"); // Tandai titik tujuan
                }

                renderTargetVisuals(imageCards);
                return;
            }
            // ==========================================
            // 🎯 SKENARIO F: PILIH GAMBAR AWAL (SMART VIEWPORT TARGETING)
            // ==========================================
            if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping && !isFailModalOpen && !isZoomOpen) {
                e.preventDefault();

                // 🧹 MUTUALLY EXCLUSIVE: Buang fokus dari tombol Submit jika sebelumnya ditekan Tab!
                if (document.activeElement && ['button', 'submit'].includes(document.activeElement.type || document.activeElement.tagName.toLowerCase())) {
                    document.activeElement.blur();
                }

                const rows = document.querySelectorAll(".qc-row");
                let targetRow = null;
                let maxVisibleHeight = 0;

                // 🟢 ALGORITMA BARU: Mencari baris yang "Mendominasi Layar"
                for (let i = 0; i < rows.length; i++) {
                    const rect = rows[i].getBoundingClientRect();

                    // Potong kordinat maya yang berada di luar layar (di atas 0 atau di bawah tinggi layar)
                    const visibleTop = Math.max(0, rect.top);
                    const visibleBottom = Math.min(window.innerHeight, rect.bottom);

                    // Hitung berapa pixel fisik baris ini yang benar-benar terlihat oleh mata QCer
                    const visibleHeight = visibleBottom - visibleTop;

                    // Pilih baris dengan eksposur visual paling besar (Syarat minimal 100px agar tidak salah pilih ekor/header)
                    if (visibleHeight > maxVisibleHeight && visibleHeight > 100) {
                        maxVisibleHeight = visibleHeight;
                        targetRow = rows[i];
                    }
                }

                if (targetRow) {
                    if (activeRowForSelection !== targetRow) {
                        clearImageHighlight();
                        activeRowForSelection = targetRow;
                    }

                    const imageCards = Array.from(targetRow.querySelectorAll(".js-qc-row__image-card"));
                    if (imageCards.length > 0) {
                        activeImageIndex = (activeImageIndex + 1) % imageCards.length;
                        renderTargetVisuals(imageCards);
                    }
                }
                return;
            }

            // ==========================================
            // 💥 SKENARIO ENTER: START QC ATAU BUKA KOLOM REASON
            // ==========================================
            if (e.key === 'Enter' && !isTyping) {
                if (!isFailModalOpen && !isZoomOpen) {
                    e.preventDefault();

                    // 🌟 FITUR BARU: AUTO-START QC DARI BERANDA (KUCING)
                    // Menggunakan class spesifik tombol "Request Images" TRR
                    const startBtn = document.querySelector('.btn.btn--next.qc-starting-prompt__button');

                    if (startBtn && window.getComputedStyle(startBtn).display !== "none") {
                        humanClick(startBtn); // 🪄 Tembak tombol Request Images!

                        // Efek visual animasi klik agar QCer tahu perintahnya masuk
                        startBtn.style.transition = "transform 0.1s ease";
                        startBtn.style.transform = "scale(0.95)";
                        setTimeout(() => { startBtn.style.transform = "scale(1)"; }, 150);

                        return; // Berhenti di sini karena halaman akan memuat gambar
                    }

                    // ⬇️ LOGIKA LAMA (Untuk mem-fail gambar saat sudah di halaman produk)
                    const multiSelected = Array.from(document.querySelectorAll(".qc-multi-selected"));
                    let targetCard = null;

                    if (multiSelected.length > 0) {
                        window.__qcMultiFailQueue = multiSelected.slice(1);
                        targetCard = multiSelected[0];
                    } else {
                        targetCard = document.querySelector(".qc-image-highlight");
                    }

                    if (targetCard) {
                        const failBtn = targetCard.querySelector(".qc-row__fail-image-button");
                        if (failBtn && window.getComputedStyle(failBtn).display !== "none") {
                            failBtn.click();
                            setTimeout(() => {
                                const select2Input = document.querySelector("#s2id_qc_fail_reason a");
                                if (select2Input) {
                                    const mousedownEvent = new MouseEvent('mousedown', {bubbles: true, cancelable: true, view: window});
                                    select2Input.dispatchEvent(mousedownEvent);
                                }
                            }, 200);
                        }
                    }
                }
                return;
            }

            // ==========================================
            // LOGIKA SPASI (JUMP NEXT / JUMP PREV / SUBMIT)
            // ==========================================
            if (e.key === ' ' || e.code === 'Space') {
                if (isTabPressed) {
                    e.preventDefault();
                    const currentTime = new Date().getTime();
                    if (currentTime - lastShortcutTime < 2000) return;
                    lastShortcutTime = currentTime;

                    if (isFailModalOpen || isZoomOpen || window.__qcSubmitLocked && !isSubmitting) return;

                    clearImageHighlight();
                    if (document.activeElement) {
                        document.activeElement.blur(); // Remove phantom mouse focus
                    }

                    triggerUniversalSubmit(); // Trigger the Master Engine directly!
                    return;
                }
                else {
                    // ... (Logika Jump Next/Prev bawaan Anda tetap aman di bawah sini)
                    if (isTyping || isFailModalOpen || isZoomOpen) return;

                    e.preventDefault();
                    const currentTime = new Date().getTime();
                    if (currentTime - lastSpaceJumpTime < 400) return;
                    lastSpaceJumpTime = currentTime;

                    const rows = document.querySelectorAll(".qc-row");
                    if (rows.length === 0) return;

                    clearImageHighlight();

                    const performSmartLanding = (row) => {
                        const rect = row.getBoundingClientRect();
                        const rowAbsoluteTop = rect.top + window.scrollY;
                        const imagesCount = row.querySelectorAll(".qc-row__image-card").length;
                        let targetY;
                        if (imagesCount <= 3) {
                            const viewportHeight = window.innerHeight;
                            const availableSpace = viewportHeight - 50;
                            const emptySpace = availableSpace - rect.height;
                            targetY = rowAbsoluteTop - 50 - (emptySpace > 0 ? (emptySpace / 2) : 10);
                        } else {
                            targetY = rowAbsoluteTop - 10;
                        }
                        window.scrollTo({ top: targetY, behavior: "smooth" });

                        const originalBg = row.style.backgroundColor;
                        row.style.transition = "background-color 0.4s ease";
                        row.style.backgroundColor = "rgba(0, 255, 136, 0.1)";
                        setTimeout(() => { row.style.backgroundColor = originalBg; }, 500);
                    };

                    if (e.shiftKey) {
                        let targetRow = null;
                        for (let i = rows.length - 1; i >= 0; i--) {
                            const rect = rows[i].getBoundingClientRect();
                            if (rect.top < -20) { targetRow = rows[i]; break; }
                        }
                        if (targetRow) performSmartLanding(targetRow);
                        else window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    else {
                        let targetRow = null;
                        const nextRowThreshold = window.innerHeight * 0.45;
                        for (let i = 0; i < rows.length; i++) {
                            const rect = rows[i].getBoundingClientRect();
                            if (rect.top > nextRowThreshold) { targetRow = rows[i]; break; }
                        }

                        if (targetRow) {
                            performSmartLanding(targetRow);
                        } else {
                            if (localStorage.getItem("qcHideEndPageToast") === "true") { window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); return; }
                            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                            if (!document.getElementById("qc-end-page-toast")) {
                                const toast = document.createElement("div");
                                toast.id = "qc-end-page-toast";
                                toast.style.cssText = `position: fixed; bottom: 120px; left: 50%; transform: translateX(-50%) translateY(20px); background: rgba(20, 20, 20, 0.7); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid rgba(255, 255, 255, 0.15); color: #fff; padding: 10px 14px 10px 20px; border-radius: 30px; font-family: sans-serif; font-size: 13px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 999999; opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events: auto; display: flex; align-items: center; gap: 15px; overflow: hidden;`;
                                // UBAH 1: Progress bar dimulai dengan width: 100% dan ditambat di sisi kanan (right: 0) agar menyusut ke arah kanan
                                toast.innerHTML = `<div id="qc-toast-progress" style="position: absolute; bottom: 0; right: 0; height: 3px; background: #00ff88; width: 100%; transition: width 3.9s linear; box-shadow: 0 0 10px #00ff88;"></div><div style="display: flex; align-items: center; gap: 8px; z-index: 1;"><span style="letter-spacing: 0.3px;">Click <b style="color:#00ff88; text-shadow: 0 0 5px rgba(0,255,136,0.4);">Submit and Continue</b> to the next page.</span></div><button id="qc-toast-never" style="z-index: 1; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#bbb; padding:5px 12px; border-radius:20px; cursor:pointer; font-size:11px; font-weight:bold; transition:all 0.2s;">Don't show again</button>`;
                                document.body.appendChild(toast);
                                const btnNever = document.getElementById("qc-toast-never");
                                btnNever.onmouseenter = () => { btnNever.style.background = "rgba(255,80,80,0.2)"; btnNever.style.color = "#ff6b6b"; btnNever.style.borderColor = "rgba(255,80,80,0.4)"; };
                                btnNever.onmouseleave = () => { btnNever.style.background = "rgba(255,255,255,0.1)"; btnNever.style.color = "#bbb"; btnNever.style.borderColor = "rgba(255,255,255,0.2)"; };

                                // UBAH 2: Animasi menargetkan width menjadi 0% (sehingga garisnya menipis dan habis)
                                setTimeout(() => { toast.style.opacity = "1"; toast.style.transform = "translateX(-50%) translateY(0)"; const prog = document.getElementById("qc-toast-progress"); if (prog) prog.style.width = "0%"; }, 50);
                                let isDismissed = false;
                                btnNever.onclick = (ev) => { ev.stopPropagation(); isDismissed = true; localStorage.setItem("qcHideEndPageToast", "true"); toast.style.opacity = "0"; toast.style.transform = "translateX(-50%) translateY(-20px)"; setTimeout(() => toast.remove(), 400); };
                                setTimeout(() => { if (!isDismissed && toast) { toast.style.opacity = "0"; toast.style.transform = "translateX(-50%) translateY(-20px)"; setTimeout(() => toast.remove(), 400); } }, 4000);
                            }
                        }
                    }
                }
            }
        });

        // ===== SENSOR LEPAS TOMBOL =====
        document.addEventListener('keyup', function(e) {
            if (e.key === 'Tab') isTabPressed = false;
            // 🟢 JATUHKAN GAMBAR SAAT OPTION/ALT DILEPAS
            if (e.key === 'Alt') document.body.classList.remove('qc-is-grabbing');
        });

        // ===== SENSOR TAHAN TOMBOL KHUSUS GRAB =====
        document.addEventListener('keydown', function(e) {
            // 🟢 ANGKAT GAMBAR SAAT OPTION/ALT DITAHAN
            if (e.key === 'Alt') document.body.classList.add('qc-is-grabbing');
        });

        // Fallback: Jika klik di luar layar, jatuhkan gambar
        window.addEventListener('blur', function() {
            isTabPressed = false;
            document.body.classList.remove('qc-is-grabbing');
        });

        // ===== PROGRESS =====
        function updateProgress() {
            let pct = Math.min((count / target) * 100, 100);
            if(progressEl) {
                progressEl.style.width = pct + "%";
                progressEl.style.background = pct >= 100 ? "lime" : "linear-gradient(90deg,#f5d48f,#ffb347)";
            }
            if(countEl) countEl.textContent = count;
            if(countDisplay) countDisplay.textContent = count;
            // RUMUS SINKRON: Tampilkan total lama + halaman aktif
            if(imageEl) imageEl.textContent = totalImages;
            if(pct >= 100 && !celebrationActive) {
                box.animate(
                    [{
                        transform: "scale(1.18)"
                    }, {
                        transform: "scale(1)"
                    }], {
                        duration: 600,
                        iterations: 1,
                        easing: "ease-out"
                    });
                box.style.background = "rgba(0,200,0,0.8)";
                launchConfettiAroundToolbar(box);
                celebrationGlow(box);
                playCelebrationSound();
                setTimeout(() => {
                    box.style.background = `rgba(10,10,10,${currentOpacity})`;
                }, 1200);
            }
        }

        function makeKey(sku, imgId, imgSrc) {
            return `${sku}__${imgId || imgSrc}`.toLowerCase();
        }

        function time24() {
            const d = new Date();
            const pad = n => String(n).padStart(2, "0");
            // Format diubah menjadi MM/DD/YYYY
            return `${pad(d.getMonth()+1)}/${pad(d.getDate())}/${d.getFullYear()}`;
        }
        // ==============================================================
        // 🤖 MESIN ROBOT AUTO-FAIL MACRO (TURBO MODE ⚡)
        // ==============================================================
        window.processNextMultiFail = function(reasonValue) {
            // Jika antrean habis, hentikan robot & flash sangat cepat
            if (!window.__qcMultiFailQueue || window.__qcMultiFailQueue.length === 0) {
                window.__isAutoFailing = false;
                document.querySelectorAll(".qc-multi-selected").forEach(el => {
                    el.classList.remove("qc-multi-selected");
                    el.style.outline = "none";
                    el.style.transform = "scale(1)";
                    el.style.boxShadow = "none";
                });

                const flash = document.createElement("div");
                flash.style.cssText = "position:fixed; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:999999; box-shadow:inset 0 0 100px rgba(181, 130, 250, 0.6); border:5px solid #b582fa; opacity:0; transition:opacity 0.2s;";
                document.body.appendChild(flash);
                flash.offsetHeight; flash.style.opacity = "1";
                setTimeout(() => { flash.style.opacity = "0"; setTimeout(() => flash.remove(), 300); }, 150);
                return;
            }

            let nextCard = window.__qcMultiFailQueue.shift();
            let failBtn = nextCard.querySelector(".qc-row__fail-image-button");

            if (failBtn && window.getComputedStyle(failBtn).display !== "none") {
                humanClick(failBtn); // 🪄 Tembak tombol fail!

                // 🛡️ ANTI-WAF SHIELD: Slow down the macro to human speed
                let jitter1 = Math.floor(Math.random() * 120) + 80; // 150ms to 300ms
                let jitter2 = Math.floor(Math.random() * 110) + 90; // 100ms to 200ms
                let jitter3 = Math.floor(Math.random() * 100) + 100; // 200ms to 450ms

                // Wait for DOM to render pop-up (Humanized Delay)
                setTimeout(() => {
                    let selectEl = document.getElementById("qc_fail_reason");
                    if (selectEl && reasonValue) {
                        selectEl.value = reasonValue;
                        selectEl.dispatchEvent(new Event("change", { bubbles: true }));

                        let chosenText = selectEl.options[selectEl.selectedIndex]?.text || "";
                        let s2Text = document.querySelector("#s2id_qc_fail_reason .select2-chosen");
                        if (s2Text) s2Text.innerText = chosenText;

                        // Click Save (Humanized Delay)
                        setTimeout(() => {
                            let autoSaveBtn = document.querySelector(".qc-tool-fail-image-modal__save");
                           if (autoSaveBtn) humanClick(autoSaveBtn);

                            // Wait for modal to close before looping to next image (Humanized Delay)
                            setTimeout(() => { window.processNextMultiFail(reasonValue); }, jitter3);
                        }, jitter2);
                    } else {
                        window.processNextMultiFail(reasonValue);
                    }
                }, jitter1);
            } else {
                window.processNextMultiFail(reasonValue);
            }
        };

        // ===== QC TRACKING (SINKRONISASI TOMBOL SAVE MODAL) =====
        document.addEventListener("click", function(e) {
            const saveBtn = e.target.closest(".qc-tool-fail-image-modal__save");
            if(!saveBtn) return;

            // Tangkap elemen secepat kilat sebelum dihancurkan oleh sistem web asli
            const modal = document.querySelector("#qc-tool-fail-image-modal");
            const modalImages = modal ? Array.from(modal.querySelectorAll("img")) : [];
            const activeImg = modalImages.find(img => img.src.includes("assets.therealreal.com"));
            const capturedUrl = activeImg ? activeImg.src.split('?')[0] : "";
            const chosenText = document.querySelector(".select2-chosen")?.innerText.trim() || "";
            const sku = modal?.querySelector(".qc-tool-fail-image-modal__item-sku")?.innerText.trim() || "UNKNOWN";
            const row = document.querySelector(`.qc-row[data-sku="${sku}"]`);

            // ⚡ TURBO: Simpan data ke memori Dashboard hanya dalam 50ms (Sebelumnya 600ms)
            setTimeout(() => {
                if(chosenText.toLowerCase() === "select reason" || chosenText === "") return;
                const attrs = getSkuAttributes(row);

                if (!stagedFails.has(sku)) {
                    let initialArray = [];
                    const allImgElements = row ? row.querySelectorAll(".js-qc-row__image-card img") : [];
                    allImgElements.forEach(imgEl => {
                        initialArray.push({
                            time: time24(), user: USERS[activeUserKey] || "Unknown User",
                            sku: sku, brand: attrs.brand, color: attrs.color, taxons: attrs.taxons, auth: attrs.auth,
                            url: imgEl.src.split('?')[0], status: "PASS", reason: ""
                        });
                    });
                    stagedFails.set(sku, initialArray);
                }
                const existingImages = stagedFails.get(sku);
                let targetImg = existingImages.find(f => f.url === capturedUrl);
                if (targetImg) {
                    targetImg.status = "FAIL"; targetImg.reason = chosenText; targetImg.time = time24();
                } else {
                    existingImages.push({
                        time: time24(), user: USERS[activeUserKey] || "Unknown User",
                        sku: sku, brand: attrs.brand, color: attrs.color, taxons: attrs.taxons, auth: attrs.auth,
                        url: capturedUrl, status: "FAIL", reason: chosenText
                    });
                }
                window.updateQCDashboard();

                // 🟢 INJEKSI REASON PREVIEW (DENGAN EFEK HOVER SWAP)
                const targetImages = Array.from(document.querySelectorAll(".js-qc-row__image-card img")).filter(img => img.src.split('?')[0] === capturedUrl);
                targetImages.forEach(imgEl => {
                    const cardEl = imgEl.closest(".js-qc-row__image-card");
                    if (cardEl) {
                        // Kunci posisi card agar label absolute tidak melenceng keluar
                        cardEl.style.position = "relative";

                        let previewBox = cardEl.querySelector(".qc-reason-preview");
                        if (!previewBox) {
                            previewBox = document.createElement("div");
                            previewBox.className = "qc-reason-preview";
                            cardEl.appendChild(previewBox);
                        }
                        previewBox.innerHTML = `<span class="qc-reason-text">${chosenText}</span>`;
                    }
                });

                // 🌟 PELATUK MACRO ROBOT (Hanya terpicu di klik Save manual yang pertama)
                if (window.__qcMultiFailQueue && window.__qcMultiFailQueue.length > 0 && !window.__isAutoFailing) {
                    window.__isAutoFailing = true;
                    const selectEl = document.getElementById("qc_fail_reason");
                    const reasonVal = selectEl ? selectEl.value : "";

                    // ⚡ TURBO: Mulai tembakan robot beruntun hanya 100ms setelah Save manual (Sebelumnya 600ms)
                    setTimeout(() => { window.processNextMultiFail(reasonVal); }, 100);
                }
            }, 50);
        });
        // ==========================================
        // 💡 FUNGSI PEMUNCUL POP-UP EDUKASI SHORTCUT
        // ==========================================
        window.showEdukasiPopup = function() {
            if (localStorage.getItem("qcHideTip_V2") === "true" || document.getElementById("qc-shortcut-tip")) return;

            const tip = document.createElement("div");
            tip.id = "qc-shortcut-tip";
            tip.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:999999; background:#1e293b; color:#fff; padding:15px 20px; border-radius:10px; box-shadow:0 15px 35px rgba(0,0,0,0.6); border:1px solid #f5d48f; font-family:sans-serif; font-size:12px; width:280px; transform:translateY(30px); opacity:0; transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);";
            tip.innerHTML = `
                        <div style="font-weight:bold; margin-bottom:8px; color:#f5d48f; font-size:14px;">💡 Tips Submit Lebih Mudah!</div>
                        <div style="margin-bottom:15px; line-height:0,5; color:#cbd5e1;"><br>Coba gunakan trik rahasia ini:<br><br><b>Tekan dan Tahan [Tab] + [Space]</b></div>
                        <div style="display:flex; justify-content:space-between; gap: 8px;">
                            <button id="qc-tip-never" style="flex:1; background:rgba(255,80,80,0.15); border:1px solid rgba(255,80,80,0.4); color:#ff8080; padding:8px; border-radius:6px; cursor:pointer; font-size:10px; font-weight:bold; transition:all 0.2s;">Jangan Tampilkan</button>
                            <button id="qc-tip-ok" style="flex:1; background:rgba(0,255,136,0.15); border:1px solid rgba(0,255,136,0.4); color:#00ff88; padding:8px; border-radius:6px; cursor:pointer; font-size:10px; font-weight:bold; transition:all 0.2s;">Oke, Mengerti</button>
                        </div>
                    `;
            document.body.appendChild(tip);

            setTimeout(() => { tip.style.transform = "translateY(0)"; tip.style.opacity = "1"; }, 50);

            const btnNever = document.getElementById("qc-tip-never");
            const btnOk = document.getElementById("qc-tip-ok");
            btnNever.onmouseenter = () => { btnNever.style.background = "rgba(255,80,80,0.3)"; };
            btnNever.onmouseleave = () => { btnNever.style.background = "rgba(255,80,80,0.15)"; };
            btnOk.onmouseenter = () => { btnOk.style.background = "rgba(0,255,136,0.3)"; };
            btnOk.onmouseleave = () => { btnOk.style.background = "rgba(0,255,136,0.15)"; };

            btnOk.onclick = (ev) => {
                ev.stopPropagation();
                tip.style.opacity = "0"; setTimeout(() => tip.remove(), 400);
            };

            btnNever.onclick = (ev) => {
                ev.stopPropagation();
                localStorage.setItem("qcHideTip_V2", "true");
                tip.style.opacity = "0"; setTimeout(() => tip.remove(), 400);
            };
        };

        // ==========================================
        // 🛡️ THE PURE LOG SUBMIT LOGIC & WARP TRANSITION 🚀
        // ==========================================

        // 1. MESIN PUSAT PENGHITUNGAN (Hanya jalan 1x per halaman)
        function executeQcTracking() {
            if (window.__qcDataSaved) return;
            window.__qcDataSaved = true;

            if (localStorage.getItem("qcHideTip_V2") !== "true") {
                localStorage.setItem("qcShowTipNext", "true");
                const firstRow = document.querySelector(".qc-row");
                if (firstRow && firstRow.dataset.sku) localStorage.setItem("qcLastSkuBeforeSubmit", firstRow.dataset.sku);
            }

            count = parseInt(localStorage.getItem("qcCount")) || 0;
            passEventCount = parseInt(localStorage.getItem("qcPassEventCount")) || 0;
            failEventCount = parseInt(localStorage.getItem("qcFailEventCount")) || 0;
            totalImages = parseInt(localStorage.getItem("qcTotalImages")) || 0;
            failData = JSON.parse(localStorage.getItem("qcFailData") || "[]");
            passData = JSON.parse(localStorage.getItem("qcPassData") || "[]");

            const rows = document.querySelectorAll(".qc-row");
            rows.forEach(row => {
                const sku = row.dataset.sku;
                if (!sku) return;

                if (row.hasAttribute("data-qc-submitted")) return;
                row.setAttribute("data-qc-submitted", "true");

                const attrs = getSkuAttributes(row);
                const cardsInRow = row.querySelectorAll(".js-qc-row__image-card");
                let newImagesProcessed = cardsInRow.length;

                if (stagedFails.has(sku)) {
                    let dataArray = stagedFails.get(sku);
                    dataArray.forEach(data => { failData.push([data.time, data.user, sku, data.brand, data.color, data.taxons, data.auth, data.url, data.status, data.reason]); });
                    stagedFails.delete(sku);
                    failEventCount++;
                    count++;
                } else {
                    const undo = row.querySelector(".qc-row__undo-exception-button");
                    const isValidFail = undo && window.getComputedStyle(undo).display !== "none";

                    if (!isValidFail) {
                        cardsInRow.forEach(card => {
                            const url = card.querySelector("img")?.src.split('?')[0] || "";
                            passData.push([time24(), USERS[activeUserKey] || "User", sku, attrs.brand, attrs.color, attrs.taxons, attrs.auth, url, "PASS", ""]);
                        });
                        passEventCount++;
                        count++;
                    } else {
                        cardsInRow.forEach(card => {
                            const url = card.querySelector("img")?.src.split('?')[0] || "";
                            failData.push([time24(), USERS[activeUserKey] || "User", sku, attrs.brand, attrs.color, attrs.taxons, attrs.auth, url, "FAIL", "Unknown (Ghost Fail)"]);
                        });
                        failEventCount++;
                        count++;
                        console.log(`[QC SYSTEM] 👻 Ghost Fail diselamatkan untuk SKU: ${sku}`);
                    }
                }
                totalImages += newImagesProcessed;
            });

            localStorage.setItem("qcCount", count);
            localStorage.setItem("qcPassEventCount", passEventCount);
            localStorage.setItem("qcFailEventCount", failEventCount);
            localStorage.setItem("qcFailData", JSON.stringify(failData));
            localStorage.setItem("qcPassData", JSON.stringify(passData));
            localStorage.setItem("qcTotalImages", totalImages);
            localStorage.setItem("qcNeedsBackup", "true");

            updateProgress();
            if(typeof window.updateQCDashboard === "function") window.updateQCDashboard();
        }

        // 2. JARING PENANGKAP UNIVERSAL (OMNI-TARGETING & SMART DELAY)
        function triggerUniversalSubmit(passedButton, formElement) {

            // 🌟 OMNI-TARGETING: Grab ALL visible submit buttons on the page (Top and Bottom)
            let targetBtns = Array.from(document.querySelectorAll(".submit-button:not([disabled]), .js-submit-button:not([disabled]), input[type='submit']:not([disabled])"))
                                  .filter(btn => btn.offsetWidth > 0 || btn.offsetHeight > 0);

            // Just in case the script missed it, but one was clicked manually, force it into the array
            if (passedButton && !targetBtns.includes(passedButton)) {
                targetBtns.push(passedButton);
            }

            if (targetBtns.length === 0) return; // No active submit buttons found

            // Ensure we have the form to submit to TRR's servers later
            if (!formElement) {
                formElement = targetBtns[0].closest("form");
            }

            // ⚡ SCENARIO A: DOUBLE-TAP OVERRIDE (If already waiting, force submit instantly)
            if (isSubmitting && window.__qcSubmitLocked) {
                console.log("⚡ Override activated. Instant submit.");
                clearTimeout(window.__qcPendingSubmitTimer);
                clearInterval(window.__qcSubmitCountdownInterval);
                if(typeof window.__executeSubmitPayload === "function") window.__executeSubmitPayload();
                return;
            }

            if (window.__qcSubmitLocked || window.__qcBypassSubmit) return;

            window.__qcSubmitLocked = true;
            isSubmitting = true;

            // 📸 SNAPSHOT: Memorize the original colors and text of ALL buttons so we can restore them if canceled
            let originalStates = targetBtns.map(btn => ({
                el: btn,
                text: btn.tagName === "INPUT" ? btn.value : btn.innerText,
                bg: btn.style.background,
                color: btn.style.color,
                border: btn.style.borderColor
            }));

            // 🌟 THE CORE EXECUTION PAYLOAD
            window.__executeSubmitPayload = () => {
                clearInterval(window.__qcSubmitCountdownInterval);
                window.__qcPendingSubmitTimer = null;

                window.__qcIsLoadingNextPage = true;
                setTimeout(() => { window.__qcIsLoadingNextPage = false; }, 7000);

                // Flash Hijau Neon
                const flash = document.createElement("div");
                flash.style.cssText = "position:fixed; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:999999; box-shadow:inset 0 0 80px rgba(0, 255, 136, 0.4), inset 0 0 15px rgba(0, 255, 136, 0.6); border:3px solid rgba(0, 255, 136, 0.4); opacity:0; transition:opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);";
                document.body.appendChild(flash);
                flash.offsetHeight; flash.style.opacity = "1";
                setTimeout(() => { flash.style.opacity = "0"; }, 150);
                setTimeout(() => { flash.remove(); }, 1000);

                // Turn all buttons semi-transparent and say "Submitting..."
                originalStates.forEach(state => {
                    state.el.style.setProperty("opacity", "0.5", "important");
                    state.el.style.background = state.bg;
                    state.el.style.color = state.color;
                    state.el.style.borderColor = state.border;
                    if (state.el.tagName === "INPUT") state.el.value = "Submitting...";
                    else state.el.innerText = "Submitting...";
                });

                executeQcTracking(); // Save to CSV/Memory

                const jitterDelay = Math.floor(Math.random() * 1400) + 100;
                setTimeout(() => {
                    window.__qcBypassSubmit = true;
                    if (passedButton) humanClick(passedButton);
                    else if (formElement) formElement.submit();
                    else targetBtns[0].click(); // Fallback trigger
                }, jitterDelay);
            };

            // ⚡ SCENARIO B: DELAY TURNED OFF IN SETTINGS
            if (!delayEnabled) {
                window.__executeSubmitPayload();
                return;
            }

            // ⏳ SCENARIO C: SMART COUNTDOWN FOR ALL BUTTONS
            let timeLeft = delaySeconds;

            const updateButtonTexts = (sec) => {
                const text = `${sec}s ESC to Cancel`;
                originalStates.forEach(state => {
                    if (state.el.tagName === "INPUT") state.el.value = text;
                    else state.el.innerText = text;
                });
            };

            // 🛡️ AGGRESSIVE STYLING: Force ALL visible buttons to turn red!
            originalStates.forEach(state => {
                state.el.style.setProperty("background", "#ff4d4d", "important");
                state.el.style.setProperty("color", "#ffffff", "important");
                state.el.style.setProperty("border-color", "#ff4d4d", "important");
            });
            updateButtonTexts(timeLeft);

            window.__qcSubmitCountdownInterval = setInterval(() => {
                timeLeft--;
                if (timeLeft >= 0) updateButtonTexts(timeLeft);
            }, 1000);

            // Cancel Function mapped to ESC
            window.__cancelPendingSubmit = () => {
                clearTimeout(window.__qcPendingSubmitTimer);
                clearInterval(window.__qcSubmitCountdownInterval);
                window.__qcSubmitLocked = false;
                isSubmitting = false;
                window.__qcPendingSubmitTimer = null;

                // Restores ALL buttons to their original color/text
                originalStates.forEach(state => {
                    state.el.style.background = state.bg;
                    state.el.style.color = state.color;
                    state.el.style.borderColor = state.border;
                    if (state.el.tagName === "INPUT") state.el.value = state.text;
                    else state.el.innerText = state.text;
                    state.el.blur();
                });

                if (document.activeElement) document.activeElement.blur();

                const abortToast = document.createElement("div");
                abortToast.style.cssText = "position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.8); color:#ffd700; border:1px solid #ffd700; padding:10px 20px; border-radius:30px; font-weight:bold; font-size:13px; z-index:999999;";
                abortToast.innerText = "Submit Canceled";
                document.body.appendChild(abortToast);
                setTimeout(() => abortToast.remove(), 2000);
            };

            // Start the waiting timer
            window.__qcPendingSubmitTimer = setTimeout(window.__executeSubmitPayload, delaySeconds * 1000);
        }

        // 3. TANGKAP TOMBOL ENTER / SUBMIT DARI FORM (Menangkap 'Tab + Enter' atau ketik 'Enter' di kolom)
        document.addEventListener("submit", function(e) {
            if (window.__qcBypassSubmit) return; // Biarkan lolos ke server jika sudah di-bypass

            // Pastikan ini adalah form Submit QC
            const submitBtn = e.target.querySelector(".submit-button, .js-submit-button");
            if (submitBtn || e.target.closest('.retouching-qc-tool')) {
                e.preventDefault();
                e.stopPropagation();
                triggerUniversalSubmit(submitBtn, e.target);
            }
        }, true);

        // 4. TANGKAP KLIK MOUSE / TRACKPAD
        document.addEventListener("click", function(e) {
            if (window.__qcBypassSubmit) return; // Biarkan lolos ke server jika sudah di-bypass

            const submitBtn = e.target.closest(".submit-button, .js-submit-button");
            if (submitBtn) {
                e.preventDefault();
                e.stopPropagation();
                triggerUniversalSubmit(submitBtn, submitBtn.closest("form"));
            }
        }, true);


        // ===== TARGET =====
        document.getElementById("qc-set-target").onclick = function(e) {
            e.stopPropagation();
            target = parseInt(document.getElementById("qc-target-input").value) || 1;
            localStorage.setItem("qcTarget", target);
            updateProgress();
        };
        // ===== QC INC/DEC =====
        document.getElementById("qc-inc").onclick = function(e) {
            e.stopPropagation();
            count++;
            localStorage.setItem("qcCount", count);
            updateProgress();
        };
        document.getElementById("qc-dec").onclick = function(e) {
            e.stopPropagation();
            count = Math.max(0, count - 1);
            localStorage.setItem("qcCount", count);
            updateProgress();
        };
        // ===== MANUAL COUNT =====
        document.getElementById("qc-manual").addEventListener("change", function(e) {
            let val = parseInt(this.value);
            if(!isNaN(val)) {
                count = val;
                localStorage.setItem("qcCount", count);
                updateProgress();
            }
        });
        // ===== RESET COUNT =====
        document.getElementById("qc-reset-count").onclick = function(e) {
            e.stopPropagation();
            count = 0;
            localStorage.setItem("qcCount", count);
            updateProgress();
        };
        // ===== STOPWATCH =====
        let timer;

        function updateStopwatch() {
            stopwatchEl.textContent = formatTime(stopwatchTime);
            localStorage.setItem("qcStopwatch", stopwatchTime);
        }
        if(stopwatchRunning) {
            timer = setInterval(() => {
                stopwatchTime++;
                updateStopwatch();
            }, 1000);
        }
        document.getElementById("qc-start-stop").onclick = function(e) {
            e.stopPropagation();
            if(stopwatchRunning) {
                clearInterval(timer);
                stopwatchRunning = false;
                localStorage.setItem("qcRunning", "false");
                this.textContent = "Start";
            } else {
                timer = setInterval(() => {
                    stopwatchTime++;
                    updateStopwatch();
                }, 1000);
                stopwatchRunning = true;
                localStorage.setItem("qcRunning", "true");
                this.textContent = "Stop";
            }
        };
        document.getElementById("qc-reset-time").onclick = function(e) {
            e.stopPropagation();
            stopwatchTime = 0;
            updateStopwatch();
        };
        updateStopwatch();
        // ===== ADJUSTABLE TRANSPARENCY (SYNCED) =====
        document.getElementById("qc-opacity-slider").addEventListener("input", function(e) {
            currentOpacity = e.target.value;
            // 1. Ubah transparansi Toolbar Utama
            box.style.background = `rgba(10,10,10,${currentOpacity})`;

            // 2. Sinkronkan (Ubah) transparansi Dashboard Mini juga
            const dashEl = document.getElementById("qc-mini-dashboard");
            if (dashEl) dashEl.style.background = `rgba(17,17,17,${currentOpacity})`;

            // 3. Simpan settingan user
            localStorage.setItem("qcOpacity", currentOpacity);
        });
        // ===== SMART DELAY CONFIGURATION =====
        const delayToggle = document.getElementById("qc-delay-toggle");
        const delaySlider = document.getElementById("qc-delay-slider");
        const delayVal = document.getElementById("qc-delay-val");

        if(delayToggle) {
            delayToggle.addEventListener("change", (e) => {
                delayEnabled = e.target.checked;
                localStorage.setItem("qcDelayEnabled", delayEnabled);

                // Update UI state
                delaySlider.disabled = !delayEnabled;
                delaySlider.style.opacity = delayEnabled ? "1" : "0.4";
                delayVal.style.opacity = delayEnabled ? "1" : "0.4";
            });
        }
        if(delaySlider) {
            delaySlider.addEventListener("input", (e) => {
                delaySeconds = parseInt(e.target.value);
                localStorage.setItem("qcDelaySeconds", delaySeconds);
                if(delayVal) delayVal.innerText = delaySeconds + "s";
            });
        }
        // ===== RESET IMAGE =====
        document.getElementById("qc-reset-images").onclick = function(e) {
            e.stopPropagation();
            // 💡 TAMBAHKAN PROTEKSI KONFIRMASI DI SINI
            if (confirm("Are you sure you want to reset the Image Counter?")) {
                totalImages = 0;
                lastProcessedSkus = []; // Kosongkan catatan SKU
                localStorage.setItem("qcTotalImages", 0);
                localStorage.setItem("qcLastProcessedSkus", JSON.stringify([]));
                if (imageEl) imageEl.textContent = 0;
                // Menghapus tulisan alert lama agar tidak ada pop-up dua kali yang mengganggu
            }
        };
        // ===== CSV EXPORT =====
        // 🛡️ PURE LOG CSV EXPORT 🛡️
        document.getElementById("qc-export-csv").onclick = function(e) {
            e.stopPropagation();

            executeCSVExport(false);
        };

        // ===== LOGIKA TOMBOL LOCK =====
        const lockBtn = document.getElementById("qc-toggle-lock");
        if(lockBtn) {
            lockBtn.onclick = function(e) {
                e.stopPropagation();
                isLocked = !isLocked;
                localStorage.setItem("qcUiLocked", isLocked);
                this.innerText = isLocked ? "🔒" : "🔓";

                if(isLocked) {
                    let currentTop = box.offsetTop;
                    let currentLeft = box.offsetLeft;
                    let absY = currentTop + window.scrollY;
                    let absX = currentLeft + window.scrollX;
                    box.style.position = "absolute";
                    box.style.top = absY + "px";
                    box.style.left = absX + "px";

                    localStorage.setItem("qcAbsPosX", absX);
                    localStorage.setItem("qcAbsPosY", absY);
                } else {
                    let currentTop = box.offsetTop;
                    let currentLeft = box.offsetLeft;
                    box.style.position = "fixed";
                    box.style.top = (currentTop - window.scrollY) + "px";
                    box.style.left = (currentLeft - window.scrollX) + "px";
                }

                if (currentSnap) {
                    isDashLocked = isLocked;
                    localStorage.setItem("qcDashLocked", isDashLocked);

                    if (isDashLocked) {
                        let dTop = dash.offsetTop;
                        let dLeft = dash.offsetLeft;
                        dash.style.position = "absolute";
                        dash.style.top = (dTop + window.scrollY) + "px";
                        dash.style.left = (dLeft + window.scrollX) + "px";
                    } else {
                        let dTop = dash.offsetTop;
                        let dLeft = dash.offsetLeft;
                        dash.style.position = "fixed";
                        dash.style.top = (dTop - window.scrollY) + "px";
                        dash.style.left = (dLeft - window.scrollX) + "px";
                    }
                    if (typeof window.updateQCDashboard === "function") window.updateQCDashboard();
                }
            };
        } // <-- Penutup tombol Lock

        // ===== LOGIKA TOMBOL DARK MODE =====
        const darkBtn = document.getElementById("qc-toggle-darkmode");
        if(darkBtn) {
            darkBtn.onclick = function(e) {
                e.stopPropagation();
                isDarkModeOn = !isDarkModeOn;
                localStorage.setItem("qcDarkMode", isDarkModeOn);

                // Ganti Icon Tombol
                this.innerText = isDarkModeOn ? "☀️" : "🌙";

                // Terapkan Tema
                toggleDarkMode(isDarkModeOn);

                // Reposisi otomatis Dashboard jika ukuran border/shadow mengubah dimensi layout
                setTimeout(() => { if (currentSnap) updateSnapPos(); }, 100);
            };
        } // <-- Penutup tombol Dark Mode

        // ===== LOGIKA TOMBOL WHAT'S NEW (MANUAL) =====
        const btnWhatsNew = document.getElementById("qc-btn-whats-new");
        if (btnWhatsNew) {
            btnWhatsNew.onclick = function(e) {
                e.stopPropagation();
                showUpdateNotes(true); // 'true' memaksa pop-up muncul mengabaikan blokiran
            };
        }
        // Listener Mousedown untuk Toolbar Utama
        box.addEventListener("mousedown", function(e) {
            if(e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;
            if(isLocked) return;
            // 🟢 PROTEKSI RESIZE: Jangan digeser jika mouse berada di area pojok kanan bawah!
            let rectBox = box.getBoundingClientRect();
            if (e.clientX >= rectBox.right - 20 && e.clientY >= rectBox.bottom - 20) return;
            drag = true;
            hasMoved = false; // 🟢 TAMBAHKAN INI
            // ... (kode lainnya tetap)
            box.style.cursor = "grabbing";

            // Gunakan getBoundingClientRect agar kursor mouse tidak loncat saat digeser
            let rect = box.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.body.style.userSelect = "none";
            box.style.transition = "none"; // Matikan transisi saat ditarik
        });


        // ===== IMAGE ACCELERATOR (SMART HYBRID: NATIVE QUEUE + LIGHTWEIGHT WATCHDOG) =====
        function accelerateImages() {
            const images = document.querySelectorAll('.js-qc-row__image-card img');
            const currentTime = Date.now(); // Ambil waktu saat ini

            images.forEach(img => {
                // 1. KEMBALIKAN KE NORMAL: Biarkan browser mengatur antrean download dengan cerdas.
                // (Tanpa 'lazy', gambar akan dimuat tepat sebelum masuk layar. Tanpa 'Preloader', bandwidth aman).
                if (img.getAttribute('loading') === 'lazy') {
                    img.removeAttribute('loading');
                }

                // 2. INISIALISASI PENJAGA (Hanya dijalankan 1x saat gambar pertama kali terdeteksi)
                if (!img.dataset.qcHealInit) {
                    img.dataset.qcHealInit = currentTime; // Catat waktu kedatangan gambar
                    img.dataset.qcRetryCount = "0"; // Mulai dengan 0 percobaan

                    // JURUS NINJA: Tangkap "Kertas Robek" instan
                    img.onerror = function() {
                        let attempts = parseInt(this.dataset.qcRetryCount) || 0;

                        // Maksimal coba 5x agar jika server TRR benar-benar mati, laptop Anda tidak crash (Infinite Loop)
                        if (attempts < 5) {
                            this.dataset.qcRetryCount = attempts + 1;
                            const originalUrl = this.src.split('?qc_bypass')[0].split('&qc_bypass')[0];
                            const separator = originalUrl.includes('?') ? '&' : '?';

                            // Jeda 1 detik agar tidak membombardir server
                            setTimeout(() => {
                                if (!this.complete || this.naturalHeight === 0) {
                                    this.src = originalUrl + separator + "qc_bypass=" + Date.now();
                                }
                            }, 1000);
                        }
                    };
                } else {
                
                    // Memanfaatkan loop "scanEnterpriseWorkload" yang sudah ada (jalan tiap 3 detik).
                    // Kita tidak pakai setInterval baru, jadi 0% beban tambahan untuk CPU/RAM!
                    let initTime = parseInt(img.dataset.qcHealInit);
                    let attempts = parseInt(img.dataset.qcRetryCount) || 0;

                    // Jika sudah lewat 6 detik (6000ms) tapi gambar masih macet (hang) & ukuran 0 pixel
                    if (currentTime - initTime > 6000 && (!img.complete || img.naturalHeight === 0)) {
                        if (attempts < 5) {
                            img.dataset.qcHealInit = currentTime; // Reset argo waktu
                            img.onerror(); // Paksa panggil Ninja untuk memuat ulang!
                        }
                    }
                }
            });
        }

        // ==============================================================
        // 🔮 7-DAY PREDICTIVE FORECASTING ENGINE
        // ==============================================================
        window.get7DayForecastHTML = function() {
            let history = JSON.parse(localStorage.getItem("qcVolumeHistory") || "[]");
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            if (history.length < 3) {
                return `<div style='color:#aaa; font-style:italic; text-align:center; padding: 20px 0;'>Gathering Data... ⏳<br><span style="font-size:10px;">Import historical data to jumpstart.</span></div>`;
            }

            let today = new Date();
            let htmlList = "";

            for (let i = 1; i <= 7; i++) {
                let targetDate = new Date(today);
                targetDate.setDate(today.getDate() + i);
                let targetDayInt = targetDate.getDay();
                let dateStr = targetDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'short'}); // e.g., "30 Mar"

                let pastSimilarDays = history.filter(entry => entry.day === targetDayInt).slice(-4);

                if(pastSimilarDays.length === 0) {
                    htmlList += `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #222;"><span>${days[targetDayInt]} <span style="color:#666; font-size:10px;">(${dateStr})</span></span><span style="color:#666;">No data</span></div>`;
                    continue;
                }

                let totalWeight = 0; let weightedSum = 0;
                pastSimilarDays.forEach((entry, index) => {
                    let weight = index + 1; // 1 to 4 scaling
                    weightedSum += entry.volume * weight;
                    totalWeight += weight;
                });
                let predictedVolume = Math.round(weightedSum / totalWeight);

                let symbol = "🟢";
                let isWeekday = (targetDayInt >= 1 && targetDayInt <= 5);
                if (isWeekday) {
                    if (predictedVolume >= 27001) symbol = "🔴";
                    else if (predictedVolume >= 24001) symbol = "🟡";
                } else {
                    // 🛠️ FIX: Removed the "/ 2" division. The ML engine already outputs daily averages!
                    if (targetDayInt === 6) { // Saturday
                        if (predictedVolume >= 11001) symbol = "🔴";
                        else if (predictedVolume >= 9501) symbol = "🟡";
                    } else if (targetDayInt === 0) { // Sunday
                        if (predictedVolume >= 9501) symbol = "🔴";
                        else if (predictedVolume >= 8001) symbol = "🟡";
                    }
                }

                htmlList += `
                    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #222; align-items:center;">
                        <span>${days[targetDayInt]} <span style="color:#666; font-size:10px;">(${dateStr})</span></span>
                        <span><b style="color:#fff;">${predictedVolume.toLocaleString('id-ID')}</b> ${symbol}</span>
                    </div>
                `;
            }
            return htmlList;
        };

        // ==============================================================
        // 📊 EXPORT / IMPORT FORECAST HISTORY (WITH DRAG & DROP ENGINE)
        // ==============================================================
        window.exportForecastCSV = function(e) {
            if (e) e.stopPropagation();
            let history = JSON.parse(localStorage.getItem("qcVolumeHistory") || "[]");
            if (history.length === 0) { alert("No data to export."); return; }
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let csvContent = "data:text/csv;charset=utf-8,Date,Day of Week,Total Volume\n";
            history.forEach(row => { csvContent += `"${row.date}","${days[row.day] || "Unknown"}","${row.volume}"\n`; });
            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", `QC_Forecast_Data_${new Date().toISOString().slice(0, 10)}.csv`);
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
        };

        // The unified file processor (Handles both click-to-browse and drag-and-drop)
        // The unified Async Multi-File processor (Handles both click-to-browse and drag-and-drop)
        window.processMultipleCSVFiles = async function(files) {
            if (!files || files.length === 0) return;

            let history = JSON.parse(localStorage.getItem("qcVolumeHistory") || "[]");
            let added = 0;
            let validFilesCount = 0;

            // Helper function to read a file as a Promise
            const readFileAsText = (file) => new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(reader.error);
                reader.readAsText(file, 'UTF-8');
            });

            // 1. Gather all text lines from all dropped CSV files
            let allLines = [];
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if (!file.name.toLowerCase().endsWith('.csv')) continue;

                try {
                    validFilesCount++;
                    let fileText = await readFileAsText(file);
                    let lines = fileText.split('\n');
                    allLines = allLines.concat(lines);
                } catch (e) {
                    console.error("Failed to read file:", file.name, e);
                }
            }

            if (validFilesCount === 0) {
                alert("Please select or drop valid .csv files.");
                return;
            }

            // 2. Process every line we gathered from all files
            for(let i = 0; i < allLines.length; i++) {
                let line = allLines[i].trim();
                if (!line) continue;

                let firstCommaIdx = line.indexOf(',');
                if (firstCommaIdx === -1) continue;

                let dateRaw = line.substring(0, firstCommaIdx).replace(/['"]/g, '').trim();
                let volRaw = line.substring(firstCommaIdx + 1).replace(/['",]/g, '').trim();

                let dObj = new Date(dateRaw);
                let vol = parseInt(volRaw, 10);

                if(!isNaN(dObj.getTime()) && !isNaN(vol) && vol > 0) {
                    // 🛡️ TIMEZONE FIX: Force strict local time extraction
                    let year = dObj.getFullYear();
                    let month = String(dObj.getMonth() + 1).padStart(2, '0');
                    let day = String(dObj.getDate()).padStart(2, '0');
                    let standardDate = `${year}-${month}-${day}`;
                    let dayInt = dObj.getDay();

                    history = history.filter(h => h.date !== standardDate);
                    history.push({date: standardDate, day: dayInt, volume: vol});
                    added++;
                }
            }

            // 3. Sort chronologically and Cap Memory
            history.sort((a,b) => new Date(a.date) - new Date(b.date));
            if(history.length > 730) history = history.slice(-730); // Max 2 Years of Memory
            localStorage.setItem("qcVolumeHistory", JSON.stringify(history));

            alert(`✅ Successfully imported and learned ${added} daily records from ${validFilesCount} file(s)!`);

            // Auto-refresh the panel
            let panel = document.getElementById("qc-summary-panel");
            if (panel) {
                panel.remove();
                document.querySelector("button[innerText='📊 QC Stats']").click();
                setTimeout(() => {
                    let toggleBtn = document.getElementById("qc-toggle-view-btn");
                    if(toggleBtn) toggleBtn.click();
                }, 50);
            }
        };

        window.importForecastCSV = function(e) {
            if (e) e.stopPropagation();
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = '.csv';
            input.multiple = true; // 🌟 ALLOW MULTIPLE FILE SELECTION VIA BROWSE
            input.onchange = e => { window.processMultipleCSVFiles(e.target.files); };
            input.click();
        };

        // ===== ENTERPRISE IMAGE WORKLOAD (SMART SYNC & PAGE RADAR) =====
        function scanEnterpriseWorkload() {
            if (window.__qcIsLoadingNextPage) return;

            if(imageEl) {
                imageEl.textContent = totalImages;
            }

            accelerateImages();

            // 🟢 PAGE VOLUME RADAR: Hitung semua SKU yang ada di halaman saat ini
            const pageVolumeEl = document.getElementById("qc-page-vol");
            if (pageVolumeEl) {
                const currentSkuOnPage = document.querySelectorAll(".qc-row").length;
                pageVolumeEl.textContent = currentSkuOnPage;
            }

            // 🟢 PENDETEKSI FAIL OTOMATIS (Menebalkan Border & Membersihkan Preview)
            document.querySelectorAll(".js-qc-row__image-card").forEach(card => {
                const undoBtn = card.querySelector(".qc-row__undo-exception-button");

                if (undoBtn && window.getComputedStyle(undoBtn).display !== "none") {
                    card.classList.add("qc-thick-fail-border");
                } else {
                    card.classList.remove("qc-thick-fail-border");

                    // 🧹 Hapus Reason Preview jika gambar kembali di-Undo (Pass)
                    const previewBox = card.querySelector(".qc-reason-preview");
                    if (previewBox) previewBox.remove();
                }
            });
        }

        // Jalankan scanner secara berkala
        setTimeout(scanEnterpriseWorkload, 1500);
        setInterval(scanEnterpriseWorkload, 3000);
        // ===== QC SUMMARY PANEL =====
        const summaryBtn = document.createElement("button");
        summaryBtn.innerText = "📊 QC Stats";
        summaryBtn.style = `

            position: absolute;

            bottom: 20px;

            left: 20px;

            z-index: 99999;

            padding: 10px 14px;

            border-radius: 8px;

            background: #222;

            color: #fff;

            cursor: pointer;

        `;
        // Summary Panel
        document.body.appendChild(summaryBtn);
        summaryBtn.onclick = () => {
            let panel = document.getElementById("qc-summary-panel");
            if(panel) { panel.remove(); return; }
            window.updateQCDashboard();

            // Summary Math
            let pCount = parseInt(localStorage.getItem("qcPassEventCount")) || 0;
            let fCount = parseInt(localStorage.getItem("qcFailEventCount")) || 0;

            const byReason = {}; let currentSku = ""; let currentReason = "";
            failData.forEach(r => {
                if(r[8] === "FAIL" && r[9].toLowerCase() !== "no reason") {
                    if (r[2] !== currentSku || r[9] !== currentReason) { byReason[r[9]] = (byReason[r[9]] || 0) + 1; currentSku = r[2]; currentReason = r[9]; }
                }
            });

            // 🛑 SECURITY CHECK: Is this Andrew?
            let isAndrewUser = localStorage.getItem("qcActiveLicense") === "USER-011";

            const panelDiv = document.createElement("div");
            panelDiv.id = "qc-summary-panel";
            panelDiv.style.cssText = "position:fixed; bottom:70px; left:20px; z-index:99999; background:#111; color:#fff; padding:15px; border-radius:10px; font-size:12px; width:280px; max-height:450px; display:flex; flex-direction:column; box-shadow:0 4px 15px rgba(0,0,0,.5); border:1px solid #333; opacity:0; transform:translateY(20px) scale(0.95); transition:all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);";

            panelDiv.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #444; padding-bottom:8px; margin-bottom:10px; flex-shrink: 0;">
                    <b id="qc-panel-title">📋 QC SUMMARY REPORT</b>
                    ${isAndrewUser ? `<button id="qc-toggle-view-btn" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; font-size:10px; padding:3px 8px; border-radius:12px; cursor:pointer; transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">Forecast ➔</button>` : ''}
                </div>

                <div id="qc-view-summary" style="display:block; display:flex; flex-direction:column; overflow:hidden;">
                    <div style="background:rgba(255,255,255,0.07); padding:10px; border-radius:6px; margin-bottom:12px; border:1px solid #444; flex-shrink: 0;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>Total SKU Fail:</span><b style="color:#ff6b6b">${fCount}</b></div>
                        <div style="display:flex; justify-content:space-between;"><span>Total SKU Pass:</span><b style="color:#4ade80">${pCount}</b></div>
                        <div style="display:flex; justify-content:space-between; margin-top:4px; border-top:1px dashed #555; padding-top:4px;"><span>Total SKU:</span><b style="color:#f5d48f">${fCount + pCount}</b></div>
                    </div>
                    <div style="font-size:11px; color:#aaa; margin-bottom:6px; text-transform:uppercase; flex-shrink: 0;">Failure Breakdown:</div>
                    <div id="qc-reason-list" style="overflow-y: auto; flex-grow: 1; padding-right: 5px;">
                        ${Object.entries(byReason).length > 0 ? Object.entries(byReason).sort((a, b) => b[1] - a[1]).map(([reason, c]) => `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #222;"><span style="max-width:180px; word-wrap: break-word;">• ${reason}</span><b style="color:#ff9f43">${c}</b></div>`).join('') : `<div style="color:#666; font-style:italic;">No failures recorded.</div>`}
                    </div>
                </div>

                ${isAndrewUser ? `
                <div id="qc-view-forecast" style="display:none; flex-direction:column; overflow:hidden; height: 100%;">
                    <div style="font-size:11px; color:#00d4ff; margin-bottom:6px; text-transform:uppercase;">Volume Prediction (Next 7 Days):</div>

                    <div style="overflow-y: auto; flex-grow: 1; padding-right: 5px; margin-bottom:10px; border: 1px solid #222; border-radius:6px; padding: 10px; background: rgba(0,212,255,0.03);">
                        ${window.get7DayForecastHTML()}
                    </div>

                    <div id="qc-drop-zone" style="display:flex; flex-direction:column; gap: 6px; flex-shrink: 0; margin-top: auto; padding: 12px 10px; border: 1px dashed rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.02); text-align: center; transition: all 0.2s ease;">
                        <span style="font-size:10px; color:#aaa; font-style:italic; pointer-events:none;">Drag & Drop a .CSV file here, or</span>
                        <div style="display:flex; gap: 5px;">
                            <button onclick="window.importForecastCSV(event)" style="flex:1; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; padding:6px; border-radius:6px; font-size:11px; cursor:pointer; transition:0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">⬆️ Browse File</button>
                            <button onclick="window.exportForecastCSV(event)" style="flex:1; background:rgba(0,212,255,0.15); border:1px solid rgba(0,212,255,0.4); color:#00d4ff; padding:6px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer; transition:0.2s;" onmouseover="this.style.background='rgba(0,212,255,0.3)'" onmouseout="this.style.background='rgba(0,212,255,0.15)'">⬇️ Export History</button>
                        </div>
                    </div>
                </div>
                ` : ''}
            `;

            document.body.appendChild(panelDiv);
            setTimeout(() => { panelDiv.style.opacity = "1"; panelDiv.style.transform = "translateY(0) scale(1)"; }, 10);

            // Toggle Logic (Only attached if the button actually exists for Andrew)
            const toggleBtn = document.getElementById("qc-toggle-view-btn");
            if (toggleBtn) {
                const titleText = document.getElementById("qc-panel-title");
                const viewSum = document.getElementById("qc-view-summary");
                const viewFor = document.getElementById("qc-view-forecast");

                let showingForecast = false;
                toggleBtn.onclick = (e) => {
                    e.stopPropagation();
                    showingForecast = !showingForecast;
                    if (showingForecast) {
                        viewSum.style.display = "none";
                        viewFor.style.display = "flex";
                        titleText.innerText = "🔮 VOLUME FORECAST";
                        toggleBtn.innerText = "Summary ➔";
                    } else {
                        viewFor.style.display = "none";
                        viewSum.style.display = "flex";
                        titleText.innerText = "📋 QC SUMMARY REPORT";
                        toggleBtn.innerText = "Forecast ➔";
                    }
                };

                // 🖱️ DRAG AND DROP EVENT LISTENERS (Only attach if Admin)
                const dropZone = document.getElementById("qc-drop-zone");
                if (dropZone) {
                    dropZone.addEventListener('dragover', (e) => {
                        e.preventDefault(); e.stopPropagation();
                        dropZone.style.background = "rgba(0, 212, 255, 0.1)";
                        dropZone.style.borderColor = "#00d4ff";
                    });
                    dropZone.addEventListener('dragleave', (e) => {
                        e.preventDefault(); e.stopPropagation();
                        dropZone.style.background = "rgba(255,255,255,0.02)";
                        dropZone.style.borderColor = "rgba(255,255,255,0.2)";
                    });
                    dropZone.addEventListener('drop', (e) => {
                        e.preventDefault(); e.stopPropagation();
                        dropZone.style.background = "rgba(255,255,255,0.02)";
                        dropZone.style.borderColor = "rgba(255,255,255,0.2)";

                        let files = e.dataTransfer.files;
                        window.processMultipleCSVFiles(files);
                    });
                }
            }
        };

        // ===== MINI QC DASHBOARD =====
        const dash = document.createElement("div");
        dash.id = "qc-mini-dashboard";

        // 1. Selalu mulai dari Fixed agar selalu ada di layar
        let startDashTop = "80px";
        let startDashLeft = "";
        let startDashRight = "20px";

        // Cek posisi terakhir (jika ada)
        if (localStorage.getItem("dashPosX")) {
            startDashLeft = parseInt(localStorage.getItem("dashPosX")) + "px";
            startDashTop = parseInt(localStorage.getItem("dashPosY")) + "px";
            startDashRight = "auto";
        }

        dash.style.cssText = `
                    position: fixed;
                    top: ${startDashTop};
                    ${startDashLeft ? `left: ${startDashLeft};` : ''}
                    right: ${startDashRight};
                    z-index: 99999;
                    background: rgba(17,17,17,${currentOpacity});
                    backdrop-filter: blur(14px); /* 💡 EFEK KACA (BLUR) DITAMBAHKAN DI SINI */
                    -webkit-backdrop-filter: blur(14px); /* 💡 DUKUNGAN UNTUK BROWSER CHROME/SAFARI */
                    color: #0f0;
                    padding: 10px 14px;
                    border-radius: 10px;
                    font-size: 12px;
                    font-family: helvetica;
                    box-shadow: 0 4px 12px rgba(0,0,0,.4);
                    user-select: none;
                    -webkit-user-select: none;
                    opacity: 0;
                    transform: translateY(-15px); /* Efek melayang dari atas */
                    transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                `;
        document.body.appendChild(dash);

        // 2. Ubah ke Absolute (jika dilock) SETELAH posisi scroll stabil
        if (isDashLocked) {
            setTimeout(() => {
                dash.style.position = "absolute";
                dash.style.top = (dash.offsetTop + window.scrollY) + "px";
                dash.style.left = (dash.offsetLeft + window.scrollX) + "px";
            }, 300);
        }

        setTimeout(() => {
            dash.style.opacity = "1";
            dash.style.transform = "translateY(0)";
        }, 80);

        let startX, startY;
        dash.addEventListener("mousedown", e => {
            if(e.target.tagName==="BUTTON" || e.target.tagName==="SPAN") return;
            if(isDashLocked) return;
            // 🟢 PROTEKSI RESIZE: Jangan digeser jika mouse berada di area pojok kanan bawah!
            let rectDash = dash.getBoundingClientRect();
            if (e.clientX >= rectDash.right - 20 && e.clientY >= rectDash.bottom - 20) return;
            dashDrag = true;
            hasMoved = false; // 🟢 TAMBAHKAN INI
            
            // Gunakan getBoundingClientRect agar kursor akurat
            let rect = dash.getBoundingClientRect();
            dashOffsetX = e.clientX - rect.left;
            dashOffsetY = e.clientY - rect.top;

            document.body.style.userSelect = "none"; // Cegah teks layar tersorot biru
            dash.style.transition = "none"; // Matikan animasi saat ditarik agar sangat responsif
        });

        // Pastikan tidak mengecilkan kotak saat double-click ikon gembok
        dash.addEventListener("dblclick", function(e) {
            if(e.target.id === "qc-reset-all-dash" || e.target.id === "qc-dash-lock") return;
            window.getSelection().removeAllRanges(); // Bersihkan blok biru instan saat klik 2x

            let isMin = localStorage.getItem("qcDashMinimized") === "true";
            isMin = !isMin;
            localStorage.setItem("qcDashMinimized", isMin);
            if(typeof window.updateQCDashboard === "function") window.updateQCDashboard();

            if (isMin) {
                dash.style.height = "auto"; // Kempeskan paksa
            } else {
                if (localStorage.getItem("qcDashH")) dash.style.height = localStorage.getItem("qcDashH"); // Kembalikan ukurannya
            }

            // 🌟 KEMBALIKAN MAGNET DENGAN ANIMASI HALUS (SMOOTH GLIDE)
            if (currentSnap) {
                dash.style.transition = "top 0.3s ease, left 0.3s ease";
                setTimeout(() => {
                    updateSnapPos(); // Selaraskan posisinya dengan Toolbar
                    setTimeout(() => { dash.style.transition = "none"; }, 300);
                }, 10);
            }
        });

        window.updateQCDashboard = function() {
            if(dashDrag) return;
            const isMin = localStorage.getItem("qcDashMinimized") === "true";

            let pCount = parseInt(localStorage.getItem("qcPassEventCount")) || 0;
            let fCount = parseInt(localStorage.getItem("qcFailEventCount")) || 0;

            const byReason = {}; let currentSku = ""; let currentReason = "";
            failData.forEach(r => {
                if(r[8] === "FAIL" && r[9].toLowerCase() !== "no reason") {
                    if (r[2] !== currentSku || r[9] !== currentReason) { byReason[r[9]] = (byReason[r[9]] || 0) + 1; currentSku = r[2]; currentReason = r[9]; }
                }
            });
            const topReasonEntry = Object.entries(byReason).sort((a, b) => b[1] - a[1])[0];
            const topReasonText = topReasonEntry ? `${topReasonEntry[0]} (${topReasonEntry[1]})` : "-";

            // ==============================================================
            // 🔒 ADAPTIVE WORKLOAD INDICATOR & SMART 7 AM LOCK
            // ==============================================================
            const now = new Date();
            const currentDay = now.getDay(); // 0 = Sunday, 1-5 = Weekdays, 6 = Saturday
            const currentHour = now.getHours();
            const todayStr = now.toISOString().slice(0, 10);
            const isWeekday = (currentDay >= 1 && currentDay <= 5);

            let actUserKey = localStorage.getItem("qcActiveLicense");
            let isAndrewNow = actUserKey === "USER-011";
            let isTiranggaNow = actUserKey === "USER-007";

            let indicatorHTML = "";
            let workloadInfoHTML = "";

            // 🛑 USER-007 sees absolutely nothing.
            if (!isTiranggaNow) {

                // Activate indicator every day from 7:00 AM onwards
                if (currentHour >= 7) {
                    let lockedVolume = localStorage.getItem("qcWorkloadLockedVolume");
                    let lockedDate = localStorage.getItem("qcWorkloadLockDate");

                    let rawVolumeStr = window.__qcTotalVolume || "Loading...";
                    let displayVolume = 0;

                    // The Cloud Engine handles the saving now. We just prioritize the locked volume if we have it!
                    if (lockedDate === todayStr && lockedVolume) {
                        displayVolume = parseInt(lockedVolume, 10);
                    } else if (rawVolumeStr !== "Loading...") {
                        // Fallback just in case the Cloud Sync hasn't finished its 5-second loop yet
                        displayVolume = parseInt(rawVolumeStr.replace(/\./g, ""), 10);
                    }

                    // Default to an hourglass while fetching data
                    let indicatorSymbol = "⏳";

                    // Once we have a real number, calculate the colors
                    if (!isNaN(displayVolume) && displayVolume > 0) {
                        indicatorSymbol = "🟢"; // Base status is Green

                        if (isWeekday) {
                            // MONDAY - FRIDAY LOGIC
                            if (displayVolume >= 27001) indicatorSymbol = "🔴";
                            else if (displayVolume >= 24001) indicatorSymbol = "🟡";
                        } else {
                            // WEEKEND LOGIC (Split the total backlog by 2 for the daily target)
                            let dailyWeekendVolume = displayVolume / 2;

                            if (currentDay === 6) {
                                // SATURDAY LOGIC (6 Personnel Max ~10.9K)
                                if (dailyWeekendVolume >= 11001) indicatorSymbol = "🔴";
                                else if (dailyWeekendVolume >= 9501) indicatorSymbol = "🟡";
                            } else if (currentDay === 0) {
                                // SUNDAY LOGIC (5 Personnel Max ~9.1K)
                                if (dailyWeekendVolume >= 9501) indicatorSymbol = "🔴";
                                else if (dailyWeekendVolume >= 8001) indicatorSymbol = "🟡";
                            }
                        }
                    }

                    indicatorHTML = `<span style="font-size:14px; text-shadow: 0 0 5px rgba(255,255,255,0.3); pointer-events:none; margin-left:auto;" title="Today's Target Status">${indicatorSymbol}</span>`;
                }

                // 🛑 ONLY USER-011 gets the Raw Numbers in the mini dash
                if (isAndrewNow) {
                    workloadInfoHTML = `
                        <div style="font-size:10px; color:#aaa; letter-spacing:0.5px; margin-top:4px; padding-bottom: 4px;">
                            Total Workload: <b style="color:#fff;">${window.__qcTotalVolume || "Loading..."}</b> SKU
                        </div>
                    `;
                }
            }

            const dashEl = document.getElementById("qc-mini-dashboard");
            if(dashEl) {
                dashEl.innerHTML = `
                    <div id="qc-dash-header" style="cursor:pointer;font-weight:600; display:flex; justify-content:space-between; align-items:center;">
                        <span>📊 QC DASHBOARD</span>
                        ${indicatorHTML}
                    </div>
                    <div style="display: ${isMin ? 'none' : 'block'}; margin-top:6px;">
                        Total SKU Fail: <b style="color:#ff6b6b">${fCount}</b><br>
                        Total SKU Pass: <b style="color:#4ade80">${pCount}</b><br>
                        Top Reason: <span style="font-size:10px">${topReasonText}</span><br>
                        <div style="margin-top:4px; font-size:10px; color:#aaa;">Total SKU: ${pCount + fCount} </div>
                        ${workloadInfoHTML}
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 5px;">
                            <br><button id="qc-sync-update" style="background:rgba(0,212,255,0.15); border:1px solid rgba(0,212,255,0.4); color:#00d4ff; padding:6px 8px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer; width: 100%; transition:all 0.2s;">🔄 Sync Latest Update</button>
                            <div style="display: flex; align-items: center; gap: 5px;">
                                <button id="qc-reset-all-dash" style="background:rgba(255,80,80,.15); border:1px solid rgba(255,80,80,.4); color:#ff8080; padding:4px 8px; border-radius:6px; font-size:11px; cursor:pointer; width: 100%; transition:all 0.2s;">Reset Dashboard</button>
                                <span id="qc-dash-lock" style="cursor:pointer; font-size:14px; background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:6px; transition:all 0.2s;" title="Lock/Unlock Position">${isDashLocked ? '🔒' : '🔓'}</span>
                            </div>
                        </div>
                    </div>`;

                // 🔄 SYNC LATEST SCRIPT FROM GITHUB
                const syncBtn = document.getElementById("qc-sync-update");
                if (syncBtn) {
                    syncBtn.onmouseenter = () => { syncBtn.style.background = "rgba(0,212,255,0.3)"; };
                    syncBtn.onmouseleave = () => { syncBtn.style.background = "rgba(0,212,255,0.15)"; };

                    syncBtn.onclick = (e) => {
                        e.stopPropagation();

                        if(confirm("Sync the latest system update from the cloud?\n\nThis will clear the cached engine and safely reload your page. Your current session data will not be lost.")) {

                            // Visual Feedback: Let them know it's working
                            syncBtn.innerText = "Syncing...";
                            syncBtn.style.opacity = "0.5";

                            // 💥 THE MAGIC: Destroy BOTH caches so the Loader is forced to fetch fresh from GitHub
                            localStorage.removeItem("qc_cache_core_script");
                            localStorage.removeItem("qc_cache_version");

                            // Give the UI a split second to render the "Syncing..." text, then reload
                            setTimeout(() => {
                                location.reload();
                            }, 300);
                        }
                    };
                }

                document.getElementById("qc-reset-all-dash").onclick = (e) => {
                    e.stopPropagation();
                    if(confirm("Yakin ingin mereset angka QC hari ini? (Posisi Layar & Transparansi UI tidak akan hilang)")) {
                        localStorage.setItem("qcCount", "0");
                        localStorage.setItem("qcTotalImages", "0");
                        localStorage.setItem("qcPassEventCount", "0");
                        localStorage.setItem("qcFailEventCount", "0");
                        localStorage.setItem("qcStoredFailSkus", "[]");
                        localStorage.setItem("qcStoredPassSkus", "[]");
                        localStorage.setItem("qcFailData", "[]");
                        localStorage.setItem("qcPassData", "[]");
                        location.reload();
                    }
                };
                const dashLockBtn = document.getElementById("qc-dash-lock");
                if (dashLockBtn) {
                    dashLockBtn.onclick = (e) => {
                        e.stopPropagation();
                        isDashLocked = !isDashLocked;
                        localStorage.setItem("qcDashLocked", isDashLocked);

                        if (isDashLocked) {
                            dash.style.position = "absolute";
                            dash.style.top = (dash.offsetTop + window.scrollY) + "px";
                            dash.style.left = (dash.offsetLeft + window.scrollX) + "px";
                        } else {
                            dash.style.position = "fixed";
                            dash.style.top = (dash.offsetTop - window.scrollY) + "px";
                            dash.style.left = (dash.offsetLeft - window.scrollX) + "px";
                        }

                        if (currentSnap) {
                            isLocked = isDashLocked;
                            localStorage.setItem("qcUiLocked", isLocked);

                            const mainLockBtn = document.getElementById("qc-toggle-lock");
                            if (mainLockBtn) mainLockBtn.innerText = isLocked ? "🔒" : "🔓";

                            if (isLocked) {
                                let bTop = box.offsetTop;
                                let bLeft = box.offsetLeft;
                                let absY = bTop + window.scrollY;
                                let absX = bLeft + window.scrollX;
                                box.style.position = "absolute";
                                box.style.top = absY + "px";
                                box.style.left = absX + "px";
                                localStorage.setItem("qcAbsPosX", absX);
                                localStorage.setItem("qcAbsPosY", absY);
                            } else {
                                let bTop = box.offsetTop;
                                let bLeft = box.offsetLeft;
                                box.style.position = "fixed";
                                box.style.top = (bTop - window.scrollY) + "px";
                                box.style.left = (bLeft - window.scrollX) + "px";
                            }
                        }

                        window.updateQCDashboard();
                    };
                }
            }
        };
        // ===== SAVE PASS ROW =====
        window.savePassRow = function(row) {
            passData.push(row);
            localStorage.setItem("qcPassData", JSON.stringify(passData));
        };
        // ===== REFRESH DASHBOARD TIAP 2 DETIK =====
        setInterval(window.updateQCDashboard, 2000);
        window.updateQCDashboard();
        // ===== AUTO RESET DAILY =====
        function scheduleMidnightReset() {
            const now = new Date();
            const resetTime = new Date();
            // Set alarm tepat jam 00:00:05 dini hari esok
            resetTime.setHours(24, 0, 5, 0);
            const msUntilReset = resetTime - now;
            setTimeout(() => {
                // Saat jam 12 malam lewat 5 detik, paksa reload halaman.
                // Logika New Day Detection di atas otomatis akan mendeteksi hari berubah dan mereset semuanya.
                location.reload();
            }, msUntilReset);
        }
        if(!window.__qcAutoResetStarted) {
            window.__qcAutoResetStarted = true;
            scheduleMidnightReset();
        }
        // 1. PROTEKSI "DETIK TERAKHIR" (Sangat diringankan agar pindah halaman INSTAN)
        window.addEventListener("beforeunload", () => {
            if(!isSubmitting) return;

            // Hapus fungsi pembacaan DOM yang berat (querySelectorAll).
            // Kita cukup gabungkan data dari memori yang sudah ada.
            let sFail = JSON.parse(localStorage.getItem("qcStoredFailSkus") || "[]");
            const finalSet = new Set([...sFail, ...stagedFails.keys()]);
            localStorage.setItem("qcStoredFailSkus", JSON.stringify([...finalSet]));
        });

        // ==========================================
        // 📢 FUNGSI: POP-UP UPDATE SOFTWARE (WHAT'S NEW - MULTI SLIDE)
        // ==========================================
        function showUpdateNotes(forceShow = false) {
            // 🟢 Ubah Key agar pop-up ini dipaksa muncul lagi untuk semua user yang sudah update
            const versionKey = "qcUpdate_v11_2_0_slides";

            // 🟢 Identifikasi User
            const activeKey = localStorage.getItem("qcActiveLicense");
            const isTirangga = activeKey === "USER-007";

            // JIKA BUKAN DARI TOMBOL MANUAL DAN USER SUDAH PERNAH BACA, JANGAN MUNCUL
            if (!forceShow && localStorage.getItem(versionKey) === "true") return;

            // Mencegah pop-up ganda
            if (document.getElementById("qc-update-modal")) return;

            const overlay = document.createElement("div");
            overlay.id = "qc-update-modal";
            overlay.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);z-index:2147483647;display:flex;justify-content:center;align-items:center;backdrop-filter:blur(5px);font-family:sans-serif;opacity:0;transition:opacity 0.3s ease;";

         
            const indicatorFeatureHTML = isTirangga ? "" : `<li style="margin-bottom:6px;">
        <b>📊 Smart Queue Indicator:</b> Know your workload before you even begin. An intuitive, color-responsive badge adapts in real-time to today's item count. From green (< 25K) to yellow, straight through to red (29K+), you are always in perfect sync with the day's momentum.
    </li>`;

            overlay.innerHTML = `
                <div style="background:#1a1a1a; padding:30px; border-radius:12px; width:520px; max-width:90%; box-shadow:0 15px 40px rgba(0,255,136,0.2); border:1px solid #00ff88; transform:translateY(30px); transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); max-height: 85vh; overflow-y: auto; position: relative;">

                    <div id="qc-update-slide-1">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
                            <h2 style="margin:0; color:#00ff88; font-size:20px;">🚀 New in v11.2.0</h2>
                            <span style="background:rgba(0,255,136,0.15); color:#00ff88; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">Slide 1/2</span>
                        </div>
                        <div style="color:#ddd; font-size:13px; line-height:1.5; margin-bottom:25px;">
                            <p style="margin-top:0;">All-new features meticulously designed to accelerate your workflow today:</p>

                            <div style="color:#00ff88; font-weight:bold; margin-top:12px; margin-bottom:6px;">🛡️ Intelligent Workflow & Safety</div>
                            <ul style="padding-left:20px; margin-bottom:10px; margin-top:0;">
                                <li style="margin-bottom:6px;"><b>⚡ Auto-Start QC:</b> From the home screen, simply press <kbd style="background:#333;padding:2px 5px;border-radius:4px;color:#fff;">Enter</kbd> to instantly load images. No mouse required. Effortless and seamless.</li>
                                <li style="margin-bottom:6px;"><b>⏳ 3-Second Undo Submit:</b> Total peace of mind. The submit button now features a 3-second countdown to prevent accidental clicks. Press <kbd style="background:#333;padding:2px 5px;border-radius:4px;color:#fff;">ESC</kbd> to cancel instantly.</li>
                                <li style="margin-bottom:6px;"><b>✨ Neon Submission Feedback:</b> A brilliant neon green flash provides instant visual confirmation when the Submit button locks or successfully processes. Beautifully intuitive.</li>
                                ${indicatorFeatureHTML}
                            </ul>
                        </div>
                        <button id="qc-btn-next-slide" style="width:100%; padding:12px; background:#00ff88; color:#000; border:none; border-radius:6px; font-weight:bold; font-size:14px; cursor:pointer; transition:all 0.2s;">Next: Previous Features ➔</button>
                    </div>

                    <div id="qc-update-slide-2" style="display: none;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
                            <h2 style="margin:0; color:#00d4ff; font-size:20px;">⏪ Previously in v11.1.0</h2>
                            <span style="background:rgba(0,212,255,0.15); color:#00d4ff; padding:4px 8px; border-radius:4px; font-size:11px; font-weight:bold;">Slide 2/2</span>
                        </div>
                        <div style="color:#ddd; font-size:13px; line-height:1.5; margin-bottom:25px;">
                            <p style="margin-top:0;">A quick look back at the incredible capabilities from our last update:</p>

                            <div style="color:#00d4ff; font-weight:bold; margin-top:12px; margin-bottom:6px;">🎨 Beautiful UI & Visuals</div>
                            <ul style="padding-left:20px; margin-bottom:10px; margin-top:0;">
                                <li style="margin-bottom:4px;"><b>Borderless Dark Mode:</b> A stunning, ultra-smooth Navy theme designed for the modern eye.</li>
                                <li style="margin-bottom:4px;"><b>Magnetic Snap UI:</b> Drag the mini Dashboard near the Toolbar, and it snaps into place automatically. It just works.</li>
                                <li style="margin-bottom:4px;"><b>Smart Proximity Tab:</b> Pressing Tab intelligently detects and locks onto the nearest Submit button on your screen.</li>
                            </ul>

                            <div style="color:#00d4ff; font-weight:bold; margin-top:12px; margin-bottom:6px;">⚡ Magic Shortcuts</div>
                            <ul style="padding-left:20px; margin-bottom:10px; margin-top:0;">
                                <li style="margin-bottom:4px;"><b>[Tab] + [Space]:</b> Instant, ultra-secure Auto-Submit.</li>
                                <li style="margin-bottom:4px;"><b>[Space] / [Shift]+[Space]:</b> Smart jump to the next or previous product.</li>
                                <li style="margin-bottom:4px;"><b>[F] Target | [X] Multi-Select | [Z] Zoom | [U] Undo:</b> Pro-level control right at your fingertips.</li>
                            </ul>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <button id="qc-btn-prev-slide" style="flex: 1; padding:12px; background:rgba(255,255,255,0.1); color:#fff; border:1px solid rgba(255,255,255,0.2); border-radius:6px; font-weight:bold; font-size:14px; cursor:pointer; transition:all 0.2s;">⬅ Back</button>
                            <button id="qc-btn-update-ok" style="flex: 2; padding:12px; background:#00d4ff; color:#000; border:none; border-radius:6px; font-weight:bold; font-size:14px; cursor:pointer; transition:all 0.2s;">Awesome, Let's Go!</button>
                        </div>
                    </div>

                </div>
            `;
            document.body.appendChild(overlay);

            // Animasi Membal Masuk
            setTimeout(() => {
                overlay.style.opacity = "1";
                overlay.querySelector('div').style.transform = "translateY(0)";
            }, 50);

            // Referensi Elemen UI untuk Navigasi Slide
            const slide1 = document.getElementById("qc-update-slide-1");
            const slide2 = document.getElementById("qc-update-slide-2");
            const btnNext = document.getElementById("qc-btn-next-slide");
            const btnPrev = document.getElementById("qc-btn-prev-slide");
            const btnOk = document.getElementById("qc-btn-update-ok");

            // Logika Transisi Slide 1 ke Slide 2
            btnNext.addEventListener("click", () => {
                slide1.style.display = "none";
                slide2.style.display = "block";
            });

            // Logika Transisi Slide 2 kembali ke Slide 1
            btnPrev.addEventListener("click", () => {
                slide2.style.display = "none";
                slide1.style.display = "block";
            });

            // Efek Hover Tombol OK di Slide 2
            btnOk.onmouseenter = () => { btnOk.style.background = "#00b8e6"; };
            btnOk.onmouseleave = () => { btnOk.style.background = "#00d4ff"; };

            // Logika Tutup Modal (Hanya ada di Slide 2)
            btnOk.addEventListener("click", () => {
                // Simpan ke memori agar besok tidak muncul otomatis
                localStorage.setItem(versionKey, "true");

                // Animasi Keluar
                overlay.style.opacity = "0";
                overlay.querySelector('div').style.transform = "translateY(-30px)";
                setTimeout(() => { overlay.remove(); }, 300);
            });
        }

        // ==============================================================
        // 🟢 FITUR RESIZABLE UI (TARIK BEBAS) & AUTO-SAVE UKURAN
        // ==============================================================
        box.style.resize = "both";
        box.style.overflow = "hidden";
        dash.style.resize = "both";
        dash.style.overflow = "hidden";

        // Kembalikan ukuran Toolbar dari memori
        let savedBoxW = localStorage.getItem("qcBoxW");
        let savedBoxH = localStorage.getItem("qcBoxH");
        if(savedBoxW) box.style.width = savedBoxW;
        if(savedBoxH && !minimized) box.style.height = savedBoxH;

        // Kembalikan ukuran Dashboard dari memori
        let savedDashW = localStorage.getItem("qcDashW");
        let savedDashH = localStorage.getItem("qcDashH");
        let isDashMin = localStorage.getItem("qcDashMinimized") === "true";
        if(savedDashW) dash.style.width = savedDashW;
        if(savedDashH && !isDashMin) dash.style.height = savedDashH;

        // Pasang Mata-mata (Observer) untuk merekam ukuran saat ditarik
        const uiObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target.id === "qc-counter-pro") {
                    if (entry.target.style.width) localStorage.setItem("qcBoxW", entry.target.style.width);
                    if (entry.target.style.height && document.getElementById("qc-body").style.display !== "none") {
                        localStorage.setItem("qcBoxH", entry.target.style.height);
                    }
                } else if (entry.target.id === "qc-mini-dashboard") {
                    if (entry.target.style.width) localStorage.setItem("qcDashW", entry.target.style.width);
                    if (entry.target.style.height && localStorage.getItem("qcDashMinimized") !== "true") {
                        localStorage.setItem("qcDashH", entry.target.style.height);
                    }
                }
                // Jika ditarik memanjang saat sedang menempel, paksa ukuran magnet untuk merapat!
                if (currentSnap) updateSnapPos();
            }
        });
        uiObserver.observe(box);
        uiObserver.observe(dash);

        // 2. MENGINGAT PROGRESS BAR SAAT REFRESH
        updateProgress();

        // 🚀 KUNCI MAGNET SAAT REFRESH (ANTI-OVERLAP FIX):
        if (currentSnap) {
            // Matikan transisi sejenak agar tidak terlihat goyang saat dikalibrasi
            dash.style.transition = "none";

            // Tembak 3 kali untuk mengawal jalannya animasi sampai selesai
            updateSnapPos(); // 1. Kalibrasi Instan

            setTimeout(updateSnapPos, 150); // 2. Kalibrasi di tengah animasi

            // 3. Kalibrasi Final (Setelah animasi turun 0.5s selesai). Ini kunci utamanya!
            setTimeout(() => {
                updateSnapPos();
                // Kembalikan kelenturan animasi (Glide) setelah posisi terkunci solid
                dash.style.transition = "top 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), left 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            }, 600);
        }

        // 3. MUNCULKAN UPDATE NOTES (Hanya untuk pemakaian pertama versi ini)
        showUpdateNotes();
    } // Penutup function init
    // ==============================================================
    // 🐈 ANIMASI KUCING & PERSISTENT INJECTION SYSTEM
    // ==============================================================

    // 0. 🛡️ ANTI-FLICKER SHIELD: Bunuh ikon kamera asli TRR pada milidetik ke-0
    if (!document.getElementById("qc-anti-flicker-style")) {
        const antiFlicker = document.createElement("style");
        antiFlicker.id = "qc-anti-flicker-style";
        // Sembunyikan ikon kamera dan paksa background induknya menjadi transparan
        antiFlicker.innerHTML = `
            .qc-starting-prompt__icon { display: none !important; }
            .qc-starting-prompt { background: transparent !important; box-shadow: none !important; border: none !important; }
        `;
        // Suntikkan langsung ke documentElement agar berjalan lebih dulu dari body
        document.documentElement.appendChild(antiFlicker);
    }

    // 1. FUNGSI PEMBUAT KUCING (PERBAIKAN UI & SCALING)
    function injectLandingCat() {
        const cameraIcon = document.querySelector('.qc-starting-prompt__icon');
        if (cameraIcon && !document.getElementById('qc-landing-cat')) {
            const catContainer = document.createElement('div');
            catContainer.id = 'qc-landing-cat';

            // PERBAIKAN 1: Flexbox agar kucing selalu presisi di tengah kotak loading TRR
            catContainer.style.cssText = "display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; padding-bottom: 10px;";

            const shadow = catContainer.attachShadow({ mode: 'open' });

            // PERBAIKAN 2: Warna solidBgColor disinkronkan persis dengan background Tema (Dark/Light)
            const isDarkMode = localStorage.getItem("qcDarkMode") === "true";
            const solidBgColor = isDarkMode ? "#0f172a" : "#ffffff";

            shadow.innerHTML = `
                <style>
                    :host { display: flex; justify-content: center; align-items: center; width: 100%; }
                    * { box-sizing: content-box; margin: 0; padding: 0; }

                    .cat-kandang {
                        position: relative;
                        width: 180px; /* Diperkecil agar tidak memakan tempat */
                        height: 180px;
                        background-color: ${solidBgColor};
                        border-radius: 50%;
                        /* PERBAIKAN 3: Glow halus, menghilangkan border kaku */
                        box-shadow: 0 0 30px rgba(0, 0, 0, ${isDarkMode ? '0.4' : '0.05'});
                        overflow: hidden;
                    }

                    .loading-cat {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 300px;
                        height: 300px;
                        transform: translate(-50%, -50%) scale(0.55); /* Skala disesuaikan dengan kandang 180px */
                    }

                    /* 🎨 POLA SISIK MUJAIR (TABBY STRIPES) & WARNA SLATE GREY */
                    .cat-body { position: absolute; width: 290px; height: 290px; background-color: #8c96a0; border-radius: 50%; border: 5px solid #514E51; top: 0; left: 0;}

                    .cat-body {
                        background: repeating-conic-gradient(from 0deg at 50% 50%, #8c96a0 0deg 5deg, rgba(81, 78, 81, 0.3) 5deg 10deg, #8c96a0 10deg 15deg);
                    }

                    .cat-body:before { content: ''; position: absolute; top: calc(50% - 188px/2 - 5px); left: calc(50% - 188px/2 - 5px); width: 188px; height: 188px; border: 5px solid #514E51; border-radius: 50%; background-color: ${solidBgColor}; }
                    .cat-body:after { content: ''; position: absolute; top: calc(50% - 222px/2 - 22px); left: calc(50% - 222px/2 - 22px); width: 222px; height: 222px; border: 22px solid #b4bac2; border-radius: 50%; }

                    .cat-animation-mask { position: absolute; top:0; left:0; width: 150px; height: 150px; background-color: ${solidBgColor}; transform-origin: right bottom; transform: rotate(45deg); animation: mask-animation 2.5s 1s infinite; }
                    .cat-animation-mask:before { content: ''; position: absolute; left: 150px; top:0; width: 150px; height: 150px; background-color: ${solidBgColor}; transform-origin: left bottom; animation: mask-animation-sub-right 2.5s 1s infinite; border: none; }
                    .cat-animation-mask:after { content: ''; position: absolute; top: 150px; left:0; width: 150px; height: 150px; background-color: ${solidBgColor}; transform-origin: right top; animation: mask-animation-sub-left 2.5s 1s infinite; border: none; }

                    .cat-head { position: absolute; right: 0; top: 0; width: 150px; height: 150px; background-color: ${solidBgColor}; transform-origin: left bottom; transform: rotate(70deg); animation: head-animation 2.5s 1s infinite cubic-bezier(.2,0,.09,1); }

                    .cat-face { position: absolute; bottom: 0px; right: 0; width: 50px; height: 40px; background-color: #8c96a0; border: 5px solid #514E51; border-bottom: 0; background-image: repeating-linear-gradient(180deg, transparent, transparent 8px, rgba(81, 78, 81, 0.2) 8px, rgba(81, 78, 81, 0.2) 12px); }
                    .cat-face:before { content: ''; position: absolute; left: calc(50% - 10px); bottom: -15px; width: 22px; height: 22px; background-color: #b4bac2; border-radius: 50%; border:none; }
                    .cat-ear { position: absolute; bottom: 39px; right: 0; width: 10px; height: 12px; background-color: #8c96a0; border: 5px solid #514E51; border-bottom: 0; border-radius: 20px 0 0 0; }
                    .cat-ear:before { content: ''; position: absolute; top: -5px; left: -45px; width: 10px; height: 12px; background-color: #8c96a0; border: 5px solid #514E51; border-bottom: 0; border-radius: 0 20px 0 0; }

                    .cat-hand { position: absolute; bottom: -32px; right: 0; width: 10px; height: 30px; background-color: #8c96a0; border: 5px solid #514E51; border-top: 0; border-radius: 0 0 10px 10px; }
                    .cat-hand:before { content: ''; position: absolute; top: 0; left: -45px; width: 10px; height: 30px; background-color: #8c96a0; border: 5px solid #514E51; border-top: 0; border-radius: 0 0 10px 10px; }

                    .cat-hand:after { content: ''; position: absolute; bottom: 2px; left: 1px; width: 8px; height: 4px; background: repeating-linear-gradient(90deg, #ff9eb5, #ff9eb5 2px, transparent 2px, transparent 4px); opacity: 0.8; z-index: 5;}
                    .cat-leg-beans { position: absolute; bottom: -39px; right: 2px; width: 8px; height: 4px; background: repeating-linear-gradient(90deg, #ff9eb5, #ff9eb5 2px, transparent 2px, transparent 4px); opacity: 0.8; z-index: 5;}

                    .cat-eye, .cat-eye-light { position: absolute; top: 116px; right: 12px; width: 6px; height: 6px; background-color: #514E51; border-radius: 3px; border:none; }
                    .cat-eye:before, .cat-eye-light:before { content: ''; position: absolute; top: 0px; right: 30px; width: 6px; height: 6px; background-color: #514E51; border-radius: 3px; border:none; }
                    .cat-eye-light { background-color: white; box-shadow: 0 0 10px white; opacity: 0; animation: eye-light-animation 2.5s 1s infinite; }
                    .cat-eye-light:before { background-color: white; box-shadow: 0 0 10px white; opacity: 0; animation: eye-light-animation 2.5s 1s infinite; }

                    .cat-mouth { position: absolute; bottom: 16px; right: 27px; width: 2px; height: 0px; background-color: #ff9eb5; border: 2px solid #514E51; border-top: 0; border-radius: 0 0 10px 10px; animation: mouth-animation 2.5s 1s infinite; }
                    .cat-mouth:before { content: ''; position: absolute; top: 0; right: -4px; width: 2px; height: 2px; background-color: #8c96a0; border: 2px solid #514E51; border-top: 0; border-radius: 0 0 10px 10px; }
                    .cat-mouth:after { content: ''; position: absolute; top: 0; right: 0px; width: 2px; height: 2px; background-color: #8c96a0; border: 2px solid #514E51; border-top: 0; border-radius: 0 0 10px 10px; }

                    .cat-beard { position: absolute; bottom: 18px; right: -4px; width: 12px; height: 3px; background-color: #514E51; border:none; }
                    .cat-beard:before { content: ''; position: absolute; top: -5px; right: 0; width: 12px; height: 3px; background-color: #514E51; transform: rotate(-10deg); border:none; }
                    .cat-beard:after { content: ''; position: absolute; top: 5px; right: 0; width: 12px; height: 3px; background-color: #514E51; transform: rotate(10deg); border:none; }
                    .cat-beard.right { right: 52px; }
                    .cat-beard.right:before { transform: rotate(10deg); }
                    .cat-beard.right:after { transform: rotate(-10deg); }

                    .cat-foot { position: absolute; left: 0; bottom: 0; width: 150px; height: 150px; background-color: ${solidBgColor}; transform-origin: right top; transform: rotate(25deg); animation: foot-animation 2.5s 1s infinite cubic-bezier(.2,0,.45,1); }
                    .cat-belly { position: absolute; bottom: 0; right: 0; width: 14px; height: 46px; background-color: #8c96a0; border: 5px solid #514E51; border-left: 0; border-right: 0; }
                    .cat-leg { position: absolute; bottom: 0px; right: 14px; width: 30px; height: 10px; background-color: #8c96a0; border: 5px solid #514E51; border-right: 0; border-radius: 10px 0 0 10px; }
                    .cat-leg:before { content: ''; position: absolute; top: -41px; right: 0; width: 30px; height: 10px; background-color: #8c96a0; border: 5px solid #514E51; border-right: 0; border-radius: 10px 0 0 10px; }

                    .cat-tail { position: absolute; bottom: 16px; right: 14px; width: 50px; height: 14px; background-color: #717a85; border: 5px solid #514E51; border-right: 0; border-radius: 14px 0 0 14px; background-image: repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(255, 255, 255, 0.4) 5px, rgba(255, 255, 255, 0.4) 10px); }
                    .cat-tail:after { content: ''; position: absolute; right: -28px; bottom: -4px; width: 22px; height: 22px; background-color: #b4bac2; border-radius: 50%; border: none; }
                    .cat-tail:before { content: ''; position: absolute; bottom: -7px; right: 0; width: 10px; height: 18px; background-color: #8c96a0; border: 5px solid #514E51; border-right: 0; border-radius: 12px 0 0 12px; }

                    @keyframes mask-animation { 0% { transform: rotate(45deg); } 100% { transform: rotate(-675deg); } }
                    @keyframes mask-animation-sub-left { 0% { transform: rotate(0deg); } 50% { transform: rotate(90deg); } 100% { transform: rotate(0deg); } }
                    @keyframes mask-animation-sub-right { 0% { transform: rotate(0deg); } 50% { transform: rotate(-90deg); } 100% { transform: rotate(0deg); } }
                    @keyframes head-animation { 0% { transform: rotate(70deg); } 100% { transform: rotate(-650deg); } }
                    @keyframes foot-animation { 0% { transform: rotate(25deg); } 100% { transform: rotate(-695deg); } }
                    @keyframes eye-light-animation { 0% { opacity: 0; height: 6px; } 50% { opacity: .75; height: 50px; } 80% { opacity: 1; height: 6px; } 100% { opacity: 0; } }
                    @keyframes mouth-animation { 0% { height: 0px; } 50% { height: 10px; } 100% { height: 0px; } }
                </style>

                <div class="cat-kandang">
                    <div class="loading-cat">
                        <div class="cat-body"></div>
                        <div class="cat-animation-mask"></div>
                        <div class="cat-head"><div class="cat-face"></div><div class="cat-ear"></div><div class="cat-hand"></div><div class="cat-eye"></div><div class="cat-eye-light"></div><div class="cat-mouth"></div><div class="cat-beard left"></div><div class="cat-beard right"></div></div>
                        <div class="cat-foot"><div class="cat-belly"></div><div class="cat-leg"><div class="cat-leg-beans"></div></div><div class="cat-tail"></div></div>
                    </div>
                </div>
            `;

            cameraIcon.parentNode.insertBefore(catContainer, cameraIcon);
        }
    }

    // 2. FUNGSI PEMICU UTAMA
    function forceInjectUI() {
        // Suntikkan UI Toolbar
        if (!document.getElementById("qc-counter-pro") && document.body) {
            console.log("[QC SYSTEM] Merender UI ke layar...");
            init();
        }
        // 🟢 Suntikkan Kucing secara INSTAN tanpa menunggu interval
        injectLandingCat();
    }

    // 3. OBSERVER PERTAMA KALI (Berjalan saat kerangka HTML mulai terbentuk)
    const observer = new MutationObserver((mutations, obs) => {
        if (document.body) {
            forceInjectUI();
            obs.disconnect(); // Berhenti mengawasi setelah berhasil disuntikkan sekali
        }
    });

    if (!document.body) {
        observer.observe(document.documentElement, { childList: true, subtree: true });
    } else {
        forceInjectUI();
    }

    // 4. WATCHDOG ANTI-TURBO/SPA (Menjaga UI saat berpindah halaman tanpa refresh)
    setInterval(() => {
        if (window.__qcIsLoadingNextPage) return;

        // Jika kita masih di URL admin tapi toolbar mendadak hilang
        if (window.location.href.includes("/admin") && !document.getElementById("qc-counter-pro")) {
            forceInjectUI();
        }

        // 🟢 Cek keberadaan Kucing setiap saat (untuk Single Page Application)
        injectLandingCat();

        // 💡 SENSOR PERPINDAHAN HALAMAN UNTUK POP-UP EDUKASI
        if (localStorage.getItem("qcShowTipNext") === "true") {
            const currentRow = document.querySelector(".qc-row");
            const currentSku = currentRow ? currentRow.dataset.sku : null;
            const lastSku = localStorage.getItem("qcLastSkuBeforeSubmit");

            if (currentSku && currentSku !== lastSku) {
                localStorage.removeItem("qcShowTipNext");
                if (typeof window.showEdukasiPopup === "function") {
                    setTimeout(window.showEdukasiPopup, 1000);
                }
            }
        }
    }, 1500);
})(); // Penutup IIFE
