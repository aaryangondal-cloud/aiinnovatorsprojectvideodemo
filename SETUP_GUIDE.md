# GemCopy by Amipi - Setup Guide
## How to build this from scratch on your own machine

---

## What you need before starting

- A Mac or Windows computer with internet access
- Node.js installed (download from nodejs.org - get the LTS version)
- A Google account (for the free Gemini API key)
- A GitHub account (free at github.com)
- A Vercel account (free at vercel.com - sign up with GitHub)

---

## Step 1 - Get your free Gemini API key

1. Go to **aistudio.google.com**
2. Sign in with your Google account
3. Click **"Get API Key"** in the left sidebar
4. Click **"Create API key"**
5. Copy the key - it starts with `AIzaSy...`
6. Save it somewhere safe - you will need it in Step 3

---

## Step 2 - Create the project

Open your terminal (Mac: press Cmd+Space, type "Terminal", press Enter) and run these commands one at a time:

```bash
# Create a new Next.js project called gemcopy
npx create-next-app@latest gemcopy --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Move into the project folder
cd gemcopy

# Install the Google Gemini AI package
npm install @google/generative-ai
```

When `create-next-app` asks you questions, press Enter to accept all defaults.

---

## Step 3 - Add your API key

In your project folder, create a file called `.env.local` and add this line (replace with your actual key from Step 1):

```
GEMINI_API_KEY=AIzaSy_YOUR_KEY_HERE
```

---

## Step 4 - Replace the default files

Replace the contents of each file below with the code provided.

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef1f7",
          100: "#d5dced",
          600: "#1A2844",
          700: "#162036",
          900: "#0a1220",
        },
        gold: {
          400: "#f9de4a",
          500: "#F7D61A",
          600: "#e0bf00",
        },
      },
      fontFamily: {
        sans: ["Lato", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&display=swap');

:root {
  --navy: #1A2844;
  --gold: #F7D61A;
  --background: #fafafa;
  --foreground: #1a2844;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Lato', system-ui, sans-serif;
}

.shimmer-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fadeUp 0.5s ease-out forwards;
}

.text-gold-gradient {
  background: linear-gradient(135deg, #F7D61A, #e0bf00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-navy-gradient {
  background: linear-gradient(135deg, #0e1628 0%, #1A2844 60%, #243980 100%);
}

.btn-gold {
  background: #F7D61A;
  color: #1A2844;
  transition: all 0.2s ease;
}

.btn-gold:hover {
  background: #e0bf00;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(247, 214, 26, 0.45);
}
```

### `src/app/api/generate/route.ts`

First create the folder:
```bash
mkdir -p src/app/api/generate
```

Then create the file with this content:

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      stoneType, caratWeight, cut, color, clarity,
      metalType, metalKarat, settingStyle,
      certificateNumber, price, tone, additionalNotes,
    } = body;

    if (!stoneType || !caratWeight || !metalType) {
      return NextResponse.json(
        { error: "Stone type, carat weight, and metal type are required." },
        { status: 400 }
      );
    }

    const toneGuide: Record<string, string> = {
      luxury: "Use elevated, aspirational language. Evoke exclusivity, craftsmanship, and timeless elegance.",
      professional: "Use precise, professional B2B language. Focus on grading credentials and investment value.",
      minimalist: "Use clean, direct language. Short, confident sentences. Let the specs speak for themselves.",
    };

    const prompt = `You are an expert jewelry copywriter. Turn this GIA certificate data into compelling, SEO-optimized product copy.

TONE: ${toneGuide[tone] || toneGuide.luxury}

GIA CERTIFICATE DATA:
- Stone: ${stoneType}
- Carat Weight: ${caratWeight}ct
- Cut: ${cut || "Not specified"}
- Color Grade: ${color || "Not specified"}
- Clarity Grade: ${clarity || "Not specified"}
- Metal: ${metalType}${metalKarat ? ` ${metalKarat}k` : ""}
- Setting Style: ${settingStyle || "Not specified"}
- GIA Certificate #: ${certificateNumber || "Not specified"}
- Price: ${price ? `$${price}` : "Not specified"}
${additionalNotes ? `- Additional Details: ${additionalNotes}` : ""}

Write a product description with these exact sections:

**HEADLINE** (8-12 words, emotionally resonant, includes key specs)

**PRODUCT DESCRIPTION** (120-160 words, 2 paragraphs)

**KEY FEATURES** (5 bullet points)

**SEO TAGS** (8-10 comma-separated keywords)`;

    const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ description: text });
  } catch (err) {
    console.error("Generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate description. Check your API key." },
      { status: 500 }
    );
  }
}
```

---

## Step 5 - Run it locally

```bash
npm run dev
```

Open your browser and go to **http://localhost:3000**

You should see the GemCopy tool. Click "Load Sample" then "Generate Description" to test it.

---

## Step 6 - Deploy it live on Vercel (free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow the prompts - say yes to everything)
vercel

# When it asks about environment variables, add:
# GEMINI_API_KEY = your key from Step 1
```

Or deploy via the Vercel website:
1. Push your code to GitHub: `git add -A && git commit -m "initial" && git push`
2. Go to vercel.com, click "New Project", import your GitHub repo
3. Add environment variable: `GEMINI_API_KEY` = your key
4. Click Deploy

Your site will be live at `your-project-name.vercel.app`

---

## How the AI prompt works

The core of this tool is a single prompt sent to Google Gemini. Here is the exact prompt structure:

```
You are an expert jewelry copywriter. Turn this GIA certificate data into
compelling, SEO-optimized product copy.

TONE: [luxury / professional / minimalist - each has specific instructions]

GIA CERTIFICATE DATA:
- Stone, Carat, Cut, Color, Clarity, Metal, Setting, Certificate #, Price

Write a product description with these sections:
**HEADLINE** - emotionally resonant, 8-12 words
**PRODUCT DESCRIPTION** - 2 paragraphs, emotion then credentials
**KEY FEATURES** - 5 bullet points
**SEO TAGS** - 8-10 search keywords
```

The AI reads the raw specs and writes copy that sells. That is the entire idea.

---

## Troubleshooting

**"Failed to generate description"** - Your Gemini API key is wrong or missing. Check `.env.local`.

**Blank page** - Run `npm run dev` again and check the terminal for errors.

**"Module not found"** - Run `npm install` to reinstall packages.

---

Built for Amipi INC - AI Innovators Class Project
Powered by Google Gemini Flash
