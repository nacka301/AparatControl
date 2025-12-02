## Aparthost Control

Next.js 14 + Supabase kontrolni panel koji pokriva owner i staff scenarije za apartmane, inventar i zadatke. Uključene su Tailwind CSS, shadcn/ui, role-based zaštita ruta, API handleri te definiran Supabase SQL u `database/schema.sql`.

### Stack
- Next.js 14 (App Router, server actions)
- TypeScript, Tailwind CSS, shadcn/ui
- Supabase auth + database + storage
- API route handlers (`/api/inventory/*`, `/api/tasks/complete`)

### Funkcionalnosti
- `/login`, `/register` forme s provjerom role (owner/staff)
- Owner dashboard: pregled apartmana, inventara, low-stock upozorenja i zadataka
- Staff dashboard: zadaci, forma "Očišćeno", unos inventara (Papir/Kava/Sapun) i prijava problema s uploadom slike
- Reusable komponenta `Navbar`, kartice `ApartmentCard`, `InventoryCard`
- SQL definicija 4 tablica (`users`, `apartments`, `inventory`, `tasks`) u Supabase

## Pokretanje

1. **Instalacija**
	```bash
	npm install
	```

2. **Env varijable** – kopiraj `.env.example` u `.env.local` i popuni:
	```env
	NEXT_PUBLIC_SUPABASE_URL=
	NEXT_PUBLIC_SUPABASE_ANON_KEY=
	SUPABASE_SERVICE_ROLE_KEY=
	SUPABASE_STORAGE_BUCKET=issues
	```
	- Kreiraj Supabase storage bucket (npr. `issues`) i dozvoli public read za uploadane slike problema.

3. **Supabase schema** – pokreni sadržaj `database/schema.sql` preko Supabase SQL editor-a (ili CLI) kako bi se kreirale sve tablice i indexi.

4. **Development server**
	```bash
	npm run dev
	```
	Posjeti `http://localhost:3000` – nakon prijave korisnik se automatski preusmjerava na dashboard prema ulozi.

## API rute

| Ruta | Metoda | Namjena |
| --- | --- | --- |
| `/api/inventory/add` | POST | Dodaje novu stavku inventara |
| `/api/inventory/update` | POST | Bulk upsert (Papir/Kava/Sapun forma) |
| `/api/inventory/get` | GET | Dohvat inventara za UI/widgets |
| `/api/tasks/complete` | POST (form-data) | Označi zadatak završenim ili prijavi problem + upload slike |

## Korisni skripte

```bash
npm run dev     # lokalni razvoj
npm run build   # production build
npm run start   # pokretanje buildu
npm run lint    # ESLint provjera
```

## Daljnji koraci
- Podesi cron/edge function za automatizirano kreiranje zadataka
- Dodaj stvarni upload do Supabase Storage bucket-a `issues`
- Proširi `InventoryQuickForm` validacijom prema stvarnim minimum pragovima
