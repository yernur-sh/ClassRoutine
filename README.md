# ClassRoutine — 7 «А» сынып порталы

Сабақ кестесі, сынып хабарламалары, үй тапсырмасы, жетістіктер тақтасы, ата-аналар порталы және үзіліс жаттығулары. Барлық дерек **Firebase** (Auth + Firestore) арқылы нақты уақытта сақталады — демо/муляж дерек жоқ.

## Іске қосу

```bash
npm install
npm run dev
```

## Firebase баптау

1. Firebase Console → **Authentication** → Sign-in method: **Email/Password** және (қаласаңыз) **Google** қосыңыз.
2. **Firestore Database** құрыңыз.
3. `firestore.rules` файлындағы ережелерді Console → Firestore → Rules бөліміне көшіріңіз.
4. Қажет болса `.env.local` арқылы конфигті ауыстырыңыз:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Рөлдер

Рөл `lib/config.ts` файлындағы e-mail тізімімен анықталады:

```ts
export const HOMEROOM_TEACHER_EMAIL = 'ainur@school.kz'; // сынып жетекшісі
export const TEACHER_EMAILS = [HOMEROOM_TEACHER_EMAIL, 'teacher@school.kz'];
```

| Рөл | Құқықтары |
|---|---|
| **Сынып жетекшісі** | Сынып хабарламаларын жариялау (тек ол), кесте, тапсырма, жетістік, кездесулер |
| **Мұғалім** | Кесте, үй тапсырмасы + бағалау, жетістіктер, ата-ана өтініштері |
| **Оқушы** | Кесте, тапсырма тапсыру, чат, жетістіктер |
| **Ата-ана** | Кесте, хабарламалар, мұғаліммен кездесуге жазылу |

Қалған барлық тіркелген e-mail автоматты түрде оқушы/ата-ана болып тіркеледі.

## Firestore құрылымы

| Коллекция | Сипаттама |
|---|---|
| `users/{uid}` | Профиль: name, email, role, classId, isHomeroom, studentName |
| `lessons` | Сабақ кестесі (day, lessonNumber, time, subject, teacher, room, notes) |
| `announcements` | Сынып хабарламалары (тек сынып жетекшісі жазады) |
| `homework` + `homework/{id}/submissions/{uid}` | Тапсырмалар мен оқушы жауаптары, бағалары |
| `achievements` | Оқушы жетістіктері, XP ұпайлары |
| `messages` | Сынып чаты |
| `consultations` | Ата-ана ↔ мұғалім кездесулері |

## Стек

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Firebase 10 · lucide-react
