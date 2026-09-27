# Ferdous AI News App — Full Guide (A to Z, Google Gemini version)

Ei website ta simple: home page e tomar naam/ID thakbe, ar ekta topic likhe (ba khali rekhe) button click korle AI (Google Gemini API) diye ajker top 10 news dekhabe. Gemini API completely FREE, kono card lagbe na.

---

## STEP 1: Zip file extract koro (jodi already na kore thako)

Amar deya `ferdous-ai-news-app.zip` file ta extract koro. Er ভিতরে ei file/folder gulo thakbe:
`package.json`, `server.js`, `README.md`, `.gitignore`, `.env.example`, ar `public` folder (er ভিতরে `index.html`)

---

## STEP 2: Google Gemini API key nao (FREE, card lagbe na)

1. Browser e যাও: **https://aistudio.google.com/apikey**
2. Tomar Google account (Gmail) diye login koro.
3. **"Create API key"** button e click koro.
4. "Create API key in new project" select koro (ba je option ashe).
5. Ekta lomba code (key) show korbe — copy kore Notepad e paste kore rakho.

Eituku — kono card, kono payment info, kichu lage na.

---

## STEP 3: GitHub account banao (jodi na thake)

1. https://github.com/ e giye "Sign up" koro.
2. Email, password diye account banao.

---

## STEP 4: Code file gulo GitHub e upload koro

1. GitHub e login kore, upper-right corner er "+" icon e click kore "New repository" select koro.
2. Repository name dao: `ferdous-ai-news-app`
3. "Public" select koro, "Create repository" click koro.
4. Repository page e "uploading an existing file" link ta click koro.
5. STEP 1 e extract kora folder er ভিতরের সব file/folder (package.json, server.js, README.md, .gitignore, .env.example, public folder) select kore ekhane drag-drop koro.
6. Niche "Commit changes" button e click koro.

---

## STEP 5: Render account banao

1. https://render.com/ e giye "Get Started" click koro.
2. "Sign up with GitHub" select koro, "Authorize Render" click koro.

---

## STEP 6: Render e website deploy koro

1. Render dashboard e "New +" button e click koro, তারপর "Web Service" select koro.
2. Tomar `ferdous-ai-news-app` repository ta select kore "Connect" click koro.
3. Settings eভabe fill koro:
   - **Name**: ferdous-ai-news-app
   - **Region**: Singapore
   - **Branch**: main
   - **Root Directory**: khali rakho
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
4. "Advanced" section e click kore "Add Environment Variable" e:
   - Key: `GEMINI_API_KEY`
   - Value: (STEP 2 e je key copy korechile)
5. "Create Web Service" button e click koro.

---

## STEP 7: Wait koro & live link nao

1. 2-5 minute wait koro. "Your service is live" dekhale ho gelo.
2. Upore ekta link ashbe, jemon: `https://ferdous-ai-news-app.onrender.com`
3. Oi link e click koro — homepage e naam/ID dekha jabe. Text box e kichu likhe (ba khali rekhe) "Get News" click korle 10-20 sec por news ashbe.
4. Assignment submit korar somoy oi Render link ta diye dio.

---

## Note

- Gemini API completely free (daily limit ache, kintu assignment-level use er jonno onek).
- 15 min inactive thakle Render service "sleep" hoy, next visit e 20-30 sec lagbe "wake up" korte — eta normal.
- Homepage er text box e je kono topic likhte paro (sports, Bangladesh, technology etc.), khali rakhle general world news ashbe.
