"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Script from "next/script";

/* ------------------------------------------------------------------ */
/*  Color tokens (matching the original poster palette)               */
/* ------------------------------------------------------------------ */
const green = "#005447";
const greenDark = "#003e35";
const cream = "#fff9e9";
const yellow = "#ffd83d";
const red = "#f42e36";
const blue = "#79bdf3";
const white = "#fffdf6";

/* ------------------------------------------------------------------ */
/*  Pixel-block decoration coordinates                                */
/* ------------------------------------------------------------------ */
const BLOCKS: [number, number, number, number, string][] = [
  [28, 95, 32, 32, red],
  [60, 127, 32, 32, red],
  [92, 159, 32, 32, red],
  [124, 191, 32, 32, blue],
  [28, 255, 32, 32, yellow],
  [60, 223, 32, 32, yellow],
  [825, 185, 28, 28, white],
  [797, 213, 28, 28, white],
  [769, 241, 28, 28, white],
  [842, 300, 28, 28, red],
  [814, 328, 28, 28, red],
  [825, 430, 28, 28, red],
  [797, 458, 28, 28, red],
  [769, 486, 28, 28, red],
  [28, 645, 26, 26, red],
  [28, 671, 26, 26, red],
  [28, 697, 26, 26, red],
  [54, 723, 26, 26, red],
  [842, 720, 28, 28, yellow],
  [842, 748, 28, 28, yellow],
  [842, 776, 28, 28, white],
];

const TAGS: [string, string][] = [
  ["CODE", red],
  ["CONTRIBUTE", blue],
  ["COLLABORATE", yellow],
  ["CELEBRATE", red],
];

/* ------------------------------------------------------------------ */
/*  Canvas helper functions                                            */
/* ------------------------------------------------------------------ */
function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string | null,
  stroke: string | null = null,
  lw = 2,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}

function textFit(
  ctx: CanvasRenderingContext2D,
  s: string,
  x: number,
  y: number,
  max: number,
  font: string,
  color: string,
  align: CanvasTextAlign = "left",
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  let t = s || "";
  while (t.length && ctx.measureText(t).width > max) t = t.slice(0, -1);
  if (t !== (s || "") && t.length > 2) t = t.slice(0, -1) + "…";
  ctx.fillText(t, x, y);
}

function wrap(
  ctx: CanvasRenderingContext2D,
  s: string,
  x: number,
  y: number,
  max: number,
  lineHeight: number,
  font: string,
  color: string,
  maxLines = 2,
) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  let lines: string[] = [];
  let line = "";
  for (const word of (s || "").split(/\s+/).filter(Boolean)) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    let last = lines[maxLines - 1];
    while (last.length && ctx.measureText(last + "…").width > max)
      last = last.slice(0, -1);
    lines[maxLines - 1] = last + "…";
  }
  lines.forEach((t, i) => ctx.fillText(t, x, y + i * lineHeight));
}

function pixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */
export default function CardMakerPage() {
  /* Form state */
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [eventDate, setEventDate] = useState("31 OCTOBER 2026");
  const [time, setTime] = useState("9:00 AM ONWARDS");
  const [venue, setVenue] = useState("RICR HQ, BHOPAL");
  const [address, setAddress] = useState("4TH FLOOR, RICR, MINAL GATE-3");
  const [qrUrl, setQrUrl] = useState("https://linktree.com/knowvy");

  /* Image state */
  const [photo, setPhoto] = useState<HTMLImageElement | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("Upload a photo to get started.");

  /* Canvas + QR refs */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastQRRef = useRef("");
  const qrLibLoaded = useRef(false);

  /* ---- caption ---- */
  const caption = `I am attending Hacktoberfest Hack Day Bhopal by Knowvy Technologies on ${eventDate.trim() || "the event date"} at ${venue.trim() || "Bhopal"}!\n\nLooking forward to learning, building, and contributing with the open-source community.\n\nThanks to Knowvy for making this event happen! @knowvy technologies`;

  /* ---- draw the card ---- */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 900,
      H = 1200;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = green;
    ctx.fillRect(0, 0, W, H);

    /* Side rails */
    ctx.fillStyle = greenDark;
    ctx.fillRect(0, 0, 22, H);
    ctx.fillRect(W - 22, 0, 22, H);
    for (let i = 0; i < 22; i++) pixel(ctx, 25 + i * 41, 0, 1, "#0a5d4e");

    /* Pixel blocks */
    BLOCKS.forEach((b) => pixel(ctx, b[0], b[1], b[2], b[4]));

    /* Header branding */
    ctx.fillStyle = white;
    ctx.font = "900 28px Arial";
    ctx.textAlign = "left";
    ctx.fillText("HACKTOBERFEST '26", 65, 64);
    ctx.fillStyle = "#d7f0e4";
    ctx.font = "bold 14px Arial";
    ctx.fillText("OPEN SOURCE FOR A BRIGHTER TOMORROW", 66, 88);
    ctx.fillStyle = yellow;
    ctx.font = "900 15px Arial";
    ctx.textAlign = "right";
    ctx.fillText("LEARN", 850, 38);
    ctx.fillText("BUILD", 850, 60);
    ctx.fillText("CONTRIBUTE", 850, 82);
    ctx.textAlign = "left";

    /* Big headline banners */
    ctx.save();
    ctx.translate(450, 165);
    ctx.rotate(-0.025);
    rr(ctx, -300, -28, 600, 91, 8, yellow);
    ctx.fillStyle = "#061a17";
    ctx.font = "1000 77px Impact,Arial Black,sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HACK DAY", 0, 39);
    ctx.restore();

    ctx.save();
    ctx.translate(450, 260);
    ctx.rotate(-0.018);
    rr(ctx, -330, -37, 660, 88, 7, cream);
    ctx.textAlign = "center";
    ctx.fillStyle = green;
    ctx.font = "1000 78px Impact,Arial Black,sans-serif";
    ctx.fillText("BHOPAL", -52, 22);
    ctx.fillStyle = red;
    ctx.fillText("2026", 205, 22);
    ctx.restore();

    rr(ctx, 210, 312, 480, 62, 9, cream);
    ctx.fillStyle = "#091b18";
    ctx.textAlign = "center";
    ctx.font = "italic 900 42px Arial";
    ctx.fillText("Attendee", 450, 354);
    ctx.strokeStyle = yellow;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(330, 366);
    ctx.lineTo(570, 366);
    ctx.stroke();

    /* Photo area */
    ctx.textAlign = "left";
    const px = 48,
      py = 407,
      pw = 355,
      ph = 390;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(px, py, pw, ph, 22);
    ctx.clip();
    if (photo) {
      const scale = Math.max(pw / photo.naturalWidth, ph / photo.naturalHeight);
      const sw = pw / scale,
        sh = ph / scale;
      ctx.drawImage(
        photo,
        (photo.naturalWidth - sw) / 2,
        (photo.naturalHeight - sh) / 2,
        sw,
        sh,
        px,
        py,
        pw,
        ph,
      );
    } else {
      ctx.fillStyle = "#164e43";
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeStyle = "#79bda5";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 8]);
      ctx.strokeRect(px + 22, py + 22, pw - 44, ph - 44);
      ctx.setLineDash([]);
      ctx.textAlign = "center";
      ctx.fillStyle = yellow;
      ctx.font = "900 28px Arial";
      ctx.fillText("YOUR PHOTO", px + pw / 2, py + ph / 2 - 8);
      ctx.fillStyle = white;
      ctx.font = "20px Arial";
      ctx.fillText("will appear here", px + pw / 2, py + ph / 2 + 25);
    }
    ctx.restore();
    rr(ctx, px, py, pw, ph, 22, null, cream, 7);

    /* Pixel sticker on photo */
    pixel(ctx, 30, 434, 24, red);
    pixel(ctx, 54, 410, 24, red);
    pixel(ctx, 78, 434, 24, yellow);
    pixel(ctx, 54, 458, 24, yellow);

    /* Event info block */
    ctx.textAlign = "left";
    ctx.fillStyle = yellow;
    ctx.font = "900 18px Arial";
    ctx.fillText("Hey, I am", 440, 426);
    textFit(ctx, name.trim() || "YOUR NAME", 440, 474, 400, "900 31px Arial", white);
    wrap(
      ctx,
      affiliation.trim() || "Your college / community / role",
      442,
      506,
      390,
      25,
      "italic 20px Georgia",
      "#d6eee3",
      2,
    );

    ctx.fillStyle = yellow;
    ctx.font = "900 14px Arial";
    ctx.fillText("DATE", 442, 565);
    textFit(ctx, eventDate.trim(), 442, 600, 390, "900 26px Arial", white);

    ctx.fillStyle = yellow;
    ctx.font = "900 14px Arial";
    ctx.fillText("TIME", 442, 634);
    textFit(ctx, time.trim(), 442, 666, 390, "900 23px Arial", white);

    ctx.fillStyle = yellow;
    ctx.font = "900 14px Arial";
    ctx.fillText("LOCATION", 442, 702);
    textFit(ctx, venue.trim(), 442, 734, 390, "900 23px Arial", white);
    wrap(ctx, address.trim(), 442, 761, 390, 19, "bold 14px Arial", "#d6eee3", 2);

    /* Pill tags */
    let tx = 50;
    TAGS.forEach(([t, c]) => {
      ctx.fillStyle = c;
      ctx.font = "900 15px Arial";
      ctx.textAlign = "center";
      ctx.fillText(t, tx + 82, 840);
      ctx.fillRect(tx + 48, 850, 68, 4);
      tx += 208;
    });

    /* Register banner */
    ctx.save();
    ctx.translate(300, 918);
    ctx.rotate(-0.035);
    rr(ctx, -245, -36, 490, 78, 10, red);
    ctx.fillStyle = white;
    ctx.textAlign = "center";
    ctx.font = "italic 1000 48px Arial";
    ctx.fillText("SEE YOU THERE!", 0, 21);
    ctx.restore();

    ctx.textAlign = "left";
    ctx.fillStyle = white;
    ctx.font = "italic 18px Arial";
    ctx.fillText("Be part of the open-source movement.", 68, 994);
    ctx.fillText("Learn, build, contribute and grow with", 58, 1020);
    ctx.fillText("a vibrant developer community!", 90, 1045);
    ctx.fillText("~ knowvy.xyz", 200, 1076);

    /* QR block */
    rr(ctx, 635, 884, 205, 205, 13, white);
    ctx.setLineDash([10, 7]);
    rr(ctx, 627, 876, 221, 221, 15, null, white, 3);
    ctx.setLineDash([]);
    if (qrCanvasRef.current) {
      ctx.drawImage(qrCanvasRef.current, 650, 899, 175, 175);
    } else {
      ctx.fillStyle = greenDark;
      ctx.textAlign = "center";
      ctx.font = "900 22px Arial";
      ctx.fillText("SCAN TO", 737, 972);
      ctx.fillText("CONNECT", 737, 1001);
    }
    rr(ctx, 642, 1094, 190, 34, 17, yellow);
    ctx.fillStyle = "#111b17";
    ctx.textAlign = "center";
    ctx.font = "900 16px Arial";
    ctx.fillText("SCAN TO CONNECT", 737, 1117);

    /* Partner footer band */
    ctx.fillStyle = cream;
    ctx.fillRect(24, 1142, 852, 48);
    ctx.fillStyle = "#132c25";
    ctx.textAlign = "center";
    ctx.font = "900 14px Arial";
    ctx.fillText(
      "KNOWVY TECHNOLOGIES  ·   MLH  ·  RICR · CODE CRATE",
      450,
      1162,
    );
    ctx.font = "bold 11px Arial";
    ctx.fillText(
      "HOSTED BY Knowvy Technologies & Code Crate  |  POWERED BY MLH  |  SPONSORED BY: .XYZ",
      450,
      1180,
    );
    ctx.textAlign = "left";
  }, [name, affiliation, eventDate, time, venue, address, photo]);

  /* ---- QR code generation ---- */
  const makeQR = useCallback(() => {
    const value = qrUrl.trim();
    qrCanvasRef.current = null;

    if (!value) {
      lastQRRef.current = "";
      return;
    }
    try {
      new URL(value);
    } catch {
      lastQRRef.current = "";
      return;
    }
    if (value === lastQRRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (window as any).QRCode === "undefined") return;
    lastQRRef.current = value;

    const holder = document.createElement("div");
    holder.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.appendChild(holder);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const QRCode = (window as any).QRCode;
    new QRCode(holder, {
      text: value,
      width: 180,
      height: 180,
      colorDark: "#071b18",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M,
    });

    setTimeout(() => {
      const c = holder.querySelector("canvas") as HTMLCanvasElement | null;
      const im = holder.querySelector("img") as HTMLImageElement | null;
      if (c) {
        qrCanvasRef.current = c;
      } else if (im && im.complete) {
        const copy = document.createElement("canvas");
        copy.width = 180;
        copy.height = 180;
        copy.getContext("2d")!.drawImage(im, 0, 0, 180, 180);
        qrCanvasRef.current = copy;
      }
      holder.remove();
      draw();
    }, 150);
  }, [qrUrl, draw]);

  /* Redraw whenever any input changes */
  useEffect(() => {
    draw();
  }, [draw]);

  /* Generate QR when URL changes or QRCode lib loads */
  useEffect(() => {
    makeQR();
  }, [makeQR]);

  /* ---- photo handler ---- */
  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus("Please choose an image file.");
      return;
    }
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    const img = new Image();
    img.onload = () => {
      setPhoto(img);
      setStatus("Photo added — your card is ready.");
    };
    img.onerror = () => {
      setStatus("Could not read this image. Try another photo.");
    };
    img.src = url;
  }

  function handleReset() {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(null);
    setPhoto(null);
    setStatus("Photo removed. Upload another photo to continue.");
  }

  async function handleCopyCaption() {
    try {
      await navigator.clipboard.writeText(caption);
      setStatus("Caption copied to your clipboard.");
    } catch {
      setStatus(
        "Could not copy automatically. Select the caption and press Ctrl+C.",
      );
    }
  }

  function handleDownload() {
    if (!photo) {
      setStatus("Please upload your photo first.");
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const safe = (name.trim() || "attendee")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const a = document.createElement("a");
    a.download = `hack-day-bhopal-${safe || "attendee"}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
    setStatus("Your personalized PNG card has been downloaded.");
  }

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      {/* QRCode.js loaded via next/script */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          qrLibLoaded.current = true;
          makeQR();
        }}
      />

      <style jsx>{`
        .cm-root {
          --green: #005447;
          --green2: #003f36;
          --cream: #fff9e9;
          --yellow: #ffd83d;
          --red: #f42e36;
          --blue: #79bdf3;
          --ink: #071b18;
          --white: #fffdf6;
        }
        .cm-header {
          background: var(--green2);
          color: var(--white);
          padding: 17px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .cm-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          font-weight: 950;
          letter-spacing: 0.08em;
          font-size: 0.85rem;
        }
        .cm-pixel-logo {
          font-size: 25px;
          color: var(--yellow);
          line-height: 1;
        }
        .cm-header-meta {
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.13em;
          text-align: right;
        }
        .cm-main {
          max-width: 1240px;
          margin: auto;
          padding: 30px 20px 54px;
        }
        .cm-hero {
          margin-bottom: 24px;
        }
        .cm-kicker {
          font-size: 0.78rem;
          font-weight: 950;
          letter-spacing: 0.16em;
          color: #087563;
          text-transform: uppercase;
        }
        .cm-title {
          font-size: clamp(2.1rem, 5vw, 3.8rem);
          line-height: 0.98;
          letter-spacing: -0.055em;
          margin: 10px 0;
          color: var(--green2);
        }
        .cm-title span {
          color: var(--red);
        }
        .cm-hero p {
          color: #4d5a54;
          line-height: 1.65;
          max-width: 760px;
          margin: 12px 0 0;
        }
        .cm-layout {
          display: grid;
          grid-template-columns: minmax(275px, 0.82fr) minmax(320px, 1fr);
          gap: 25px;
          align-items: start;
        }
        .cm-panel {
          background: #fffdf8;
          border: 1px solid #ded8c7;
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 14px 35px #20372c10;
        }
        .cm-panel h2 {
          font-size: 1rem;
          margin: 0 0 16px;
          color: var(--green2);
        }
        .cm-label {
          display: block;
          margin: 14px 0 7px;
          font-size: 0.8rem;
          font-weight: 850;
          color: #31423b;
        }
        .cm-input {
          width: 100%;
          padding: 12px 13px;
          border: 1px solid #c9c7b9;
          border-radius: 10px;
          background: #fbfaf4;
          font: inherit;
          color: #18251f;
          outline: none;
        }
        .cm-input:focus {
          border-color: #00816a;
          box-shadow: 0 0 0 3px #00816a20;
        }
        .cm-textarea {
          width: 100%;
          min-height: 110px;
          padding: 12px 13px;
          border: 1px solid #c9c7b9;
          border-radius: 10px;
          background: #fbfaf4;
          font: inherit;
          color: #18251f;
          outline: none;
          resize: vertical;
        }
        .cm-textarea:focus {
          border-color: #00816a;
          box-shadow: 0 0 0 3px #00816a20;
        }
        .cm-file {
          width: 100%;
          padding: 12px;
          border: 1px dashed #8ba99b;
          border-radius: 10px;
          background: #f7f8ef;
          color: #43534b;
        }
        .cm-hint {
          font-size: 0.76rem;
          line-height: 1.5;
          color: #6c786f;
          margin-top: 7px;
        }
        .cm-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .cm-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }
        .cm-btn {
          border: 0;
          border-radius: 999px;
          padding: 12px 17px;
          font: inherit;
          font-size: 0.85rem;
          font-weight: 950;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .cm-btn:hover {
          transform: translateY(-1px);
        }
        .cm-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }
        .cm-primary {
          background: var(--red);
          color: white;
          box-shadow: 0 4px 0 #b81d29;
        }
        .cm-secondary {
          background: #e9e6da;
          color: #21372e;
        }
        .cm-preview-panel {
          position: sticky;
          top: 14px;
        }
        .cm-preview-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }
        .cm-preview-heading h2 {
          margin: 0;
        }
        .cm-live {
          font-size: 0.68rem;
          font-weight: 950;
          letter-spacing: 0.1em;
          color: #087563;
          text-transform: uppercase;
        }
        .cm-canvas-wrap {
          max-width: 600px;
          margin: auto;
          background: var(--green);
          border: 5px solid #e4dfcf;
          box-shadow: 0 16px 38px #19382b24;
        }
        .cm-canvas-wrap canvas {
          display: block;
          width: 100%;
          height: auto;
        }
        .cm-status {
          min-height: 1.4em;
          margin-top: 12px;
          color: #126c5b;
          font-size: 0.8rem;
        }
        .cm-footer {
          background: var(--green2);
          color: #e9f3e8;
          padding: 22px;
          text-align: center;
          font-size: 0.75rem;
          line-height: 1.7;
        }
        @media (max-width: 820px) {
          .cm-layout {
            grid-template-columns: 1fr;
          }
          .cm-preview-panel {
            position: static;
            grid-row: 1;
          }
          .cm-main {
            padding: 24px 13px 40px;
          }
          .cm-panel {
            padding: 16px;
          }
        }
        @media (max-width: 420px) {
          .cm-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="cm-root">
        {/* Card-maker header */}
        <div className="cm-header">
          <div className="cm-brand">
            <span className="cm-pixel-logo">◈</span>
            <span>HACKTOBERFEST &apos;26</span>
          </div>
          <div className="cm-header-meta">BHOPAL · 31 OCTOBER 2026</div>
        </div>

        <div className="cm-main">
          {/* Hero */}
          <section className="cm-hero">
            <div className="cm-kicker">Open source for a brighter tomorrow</div>
            <h1 className="cm-title">
              Make your <span>HACK DAY</span>
              <br />
              attendee card.
            </h1>
            <p>
              Upload your photo, add your name, and generate a personalized card
              inspired by the Hacktoberfest Hack Day Bhopal poster. Download it
              and share that you&apos;re joining the open-source movement.
            </p>
          </section>

          <div className="cm-layout">
            {/* ---- Form Panel ---- */}
            <section className="cm-panel">
              <h2>Personalize your card</h2>

              <label className="cm-label" htmlFor="cm-photo">
                Upload your photo
              </label>
              <input
                id="cm-photo"
                className="cm-file"
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />
              <div className="cm-hint">
                Use a clear portrait or selfie. Your photo is processed in your
                browser and is not uploaded to a server.
              </div>

              <label className="cm-label" htmlFor="cm-name">
                Your name
              </label>
              <input
                id="cm-name"
                className="cm-input"
                type="text"
                maxLength={34}
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="cm-label" htmlFor="cm-affiliation">
                College / community / role
              </label>
              <input
                id="cm-affiliation"
                className="cm-input"
                type="text"
                maxLength={58}
                placeholder="e.g. Developer at Knowvy Technologies"
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
              />

              <div className="cm-row">
                <div>
                  <label className="cm-label" htmlFor="cm-date">
                    Date
                  </label>
                  <input
                    id="cm-date"
                    className="cm-input"
                    type="text"
                    maxLength={24}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="cm-label" htmlFor="cm-time">
                    Time
                  </label>
                  <input
                    id="cm-time"
                    className="cm-input"
                    type="text"
                    maxLength={24}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <label className="cm-label" htmlFor="cm-venue">
                Venue
              </label>
              <input
                id="cm-venue"
                className="cm-input"
                type="text"
                maxLength={60}
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />

              <label className="cm-label" htmlFor="cm-address">
                Venue address
              </label>
              <input
                id="cm-address"
                className="cm-input"
                type="text"
                maxLength={62}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label className="cm-label" htmlFor="cm-qr">
                Registration link for QR code
              </label>
              <input
                id="cm-qr"
                className="cm-input"
                type="url"
                placeholder="https://your-registration-link"
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
              />
              <div className="cm-hint">
                QR code is generated from this link. Keep it accurate so
                attendees can scan it.
              </div>

              <label className="cm-label" htmlFor="cm-caption">
                LinkedIn caption
              </label>
              <textarea
                id="cm-caption"
                className="cm-textarea"
                readOnly
                value={caption}
                aria-label="Generated LinkedIn caption"
              />
              <div className="cm-actions">
                <button
                  className="cm-btn cm-secondary"
                  type="button"
                  onClick={handleCopyCaption}
                >
                  Copy caption
                </button>
              </div>

              <div className="cm-actions">
                <button
                  className="cm-btn cm-primary"
                  disabled={!photo}
                  onClick={handleDownload}
                >
                  Download card PNG
                </button>
                <button
                  className="cm-btn cm-secondary"
                  type="button"
                  onClick={handleReset}
                >
                  Remove photo
                </button>
              </div>

              <div className="cm-status" role="status" aria-live="polite">
                {status}
              </div>
            </section>

            {/* ---- Preview Panel ---- */}
            <section className="cm-panel cm-preview-panel">
              <div className="cm-preview-heading">
                <h2>Live preview</h2>
                <span className="cm-live">● Live preview</span>
              </div>
              <div className="cm-canvas-wrap">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={1200}
                  aria-label="Personalized Hacktoberfest event card"
                />
              </div>
              <div className="cm-hint">
                The final image is exported as a high-resolution 900 × 1200 PNG.
              </div>
            </section>
          </div>
        </div>

        {/* Card-maker footer */}
        <div className="cm-footer">
          Hosted by Knowvy Technologies · Powered by MLH · Technology Partner:
          RICR
          <br />
          Hacktoberfest Hack Day Bhopal · Learn · Build · Contribute
        </div>
      </div>

      <Footer />
    </main>
  );
}

