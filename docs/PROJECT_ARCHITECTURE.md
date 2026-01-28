# MyFinishLine Frontend - Полная архитектура проекта

## Обзор

**MyFinishLine** — платформа для спортивных челленджей с интерактивной картой маршрута. Пользователи покупают челленджи (квесты), отслеживают прогресс через интеграции со Strava/Fitbit/Garmin и получают физические медали за завершение.

---

## Технологический стек

| Категория | Технология | Версия |
|-----------|------------|--------|
| Framework | Next.js | 16.0.7 |
| UI Library | React | 19.2.1 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| State | Redux Toolkit | 2.11.2 |
| Persist | Redux Persist | 6.0.0 |
| HTTP | Axios | 1.13.2 |
| Forms | Formik | 2.4.9 |
| Animation | Motion | 12.23.24 |
| Maps | Leaflet + React Leaflet | 1.9.4 / 5.0.0 |
| Carousel | Swiper | 12.0.3 |
| UI Components | Radix UI | various |
| Icons | Lucide React | 0.555.0 |
| i18n | i18next + next-intl | 25.7.2 / 4.5.8 |
| Payment | Stripe + Paddle | latest |

---

## Структура директорий

```
app/
├── (application)/              # Защищённые страницы приложения
│   └── app/
│       ├── homepage/           # Главная - интерактивная карта
│       ├── contracts/          # Контракты (all, achieved, still-to-get)
│       ├── leaderboard/        # Таблица лидеров
│       ├── integrations/       # Подключение Strava/Fitbit
│       ├── more/               # FAQ и контакты
│       ├── activities/new/     # Добавить активность вручную
│       └── profile/
│           ├── (profile)/      # Journey, Activities
│           ├── [userId]/       # Профиль другого пользователя
│           ├── redeem/         # Получение медали
│           └── settings/       # Настройки + персонализация
│
├── (with-header)/              # Публичные страницы с навигацией
│   ├── page.tsx                # Landing page
│   ├── challenges/[id]/        # Страница челленджа
│   ├── payment/                # Оплата
│   └── faq/                    # FAQ
│
├── (without-header)/           # Страницы без навигации (auth)
│   ├── login/                  # Вход
│   ├── signup/                 # Регистрация
│   ├── verify/                 # Подтверждение кода
│   ├── forgot-password/        # Сброс пароля
│   ├── auth/google|fitbit/     # OAuth callbacks
│   ├── privacy/                # Политика конфиденциальности
│   ├── terms-of-service/       # Условия использования
│   └── refund-policy/          # Политика возврата
│
├── api/                        # Next.js API Routes (49 endpoints)
│   ├── auth/                   # Аутентификация
│   ├── user/                   # Операции пользователя
│   ├── strava/                 # Strava интеграция
│   ├── fitbit/                 # Fitbit интеграция
│   ├── payment/                # Платежи
│   ├── leaderboard/            # Лидерборд
│   └── faq/                    # FAQ feedback
│
├── components/                 # React компоненты (168 файлов)
│   ├── ui/                     # Примитивы (button, input, card...)
│   ├── Shared/                 # Переиспользуемые (Avatar, Loader...)
│   ├── Application/            # Приложение (Map, Navbar, Profile...)
│   ├── Landing/                # Landing page
│   └── ...                     # Payment, FAQ, Swiper компоненты
│
├── lib/                        # Утилиты и Redux
│   ├── store.ts                # Redux store
│   ├── features/               # Redux slices
│   │   ├── user/
│   │   ├── activities/
│   │   ├── challenge/
│   │   ├── leaderboard/
│   │   ├── profile/
│   │   └── products/
│   └── utils/                  # Сервисы и хелперы
│
├── hooks/                      # Custom hooks
├── types/                      # TypeScript типы
├── data/                       # Статические данные
├── layout.tsx                  # Root layout
├── globals.css                 # Глобальные стили
└── StoreProvider.tsx           # Redux Provider
```

---

## Layouts (3 группы)

### 1. (application) - Защищённое приложение
```tsx
// app/(application)/layout.tsx
- AppHeader (верхний заголовок)
- Navbar (нижняя навигация: Home, Contracts, Leaderboard, Profile, More)
- ToastContainer (уведомления)
- Белый фон с rounded углами
```

### 2. (with-header) - Публичные страницы
```tsx
// app/(with-header)/layout.tsx
- Navbar (публичный хедер)
- Footer
- Для: Landing, Challenges, Payment, FAQ
```

### 3. (without-header) - Аутентификация
```tsx
// app/(without-header)/layout.tsx
- Без навигации
- Минимальный дизайн
- Для: Login, Signup, Verify, OAuth callbacks
```

---

## Redux State

### Store Configuration
```typescript
// app/lib/store.ts
const rootReducer = combineReducers({
  user: userReducer,           // Данные пользователя
  activities: activitiesSlice, // Спортивные активности
  challenge: challengeSlice,   // Текущий челлендж
  products: productsSlice,     // Продукты для покупки
  leaderboard: leaderboardSlice, // Лидерборд
  profile: profileSlice        // Профиль (чужой)
});

// Persist config
whitelist: ["user", "activities", "products", "profile"]
// НЕ персистятся: challenge, leaderboard
```

### User Slice
```typescript
interface IUserState {
  user: IUser;
  contracts: IContract[];
  challenges: IActiveChallenge[];
  completedContracts: IContract[];
  personalization: {
    frame: { id, image_url } | null;
    banner: { id, image_url } | null;
    mascot: { id, image_url } | null;
  };
}
```

---

## API Endpoints (49 штук)

### Аутентификация (/api/auth/)
| Endpoint | Метод | Описание |
|----------|-------|----------|
| /login | POST | Вход (email/password) |
| /register | POST | Регистрация |
| /verify | POST | Подтверждение кода |
| /send-code | POST | Отправить код |
| /resend-code | POST | Повторить код |
| /reset-password | POST | Сбросить пароль |
| /logout | POST | Выход |
| /google | GET | Google OAuth |
| /google/callback | GET | Google callback |

### Пользователь (/api/user/)
| Endpoint | Метод | Описание |
|----------|-------|----------|
| /get-current-user | GET | Текущий пользователь |
| /update-user | POST | Обновить профиль |
| /activities | GET/POST | Активности |
| /refresh-activities | GET | Синхронизация со Strava |
| /challenges | GET | Челленджи пользователя |
| /active-challenge | GET | Активный челлендж |
| /contracts | GET | Контракты |
| /rewards | GET | Награды |
| /redeem-reward | POST | Получить награду |
| /cosmetics/* | GET | Косметика (frames, banners, skins) |

### Strava (/api/strava/)
| Endpoint | Метод | Описание |
|----------|-------|----------|
| /auth | GET | OAuth Strava |
| /callback | GET | Callback |
| /link | POST | Связать аккаунт |
| /user | GET | Данные пользователя |
| /activities | GET | Активности |

### Платежи (/api/payment/)
| Endpoint | Метод | Описание |
|----------|-------|----------|
| /products | GET | Продукты |
| /order | POST | Создать заказ |
| /create-payment-intent | POST | Stripe intent |

---

## Ключевые компоненты

### Map (app/components/Application/Map/)
Интерактивная карта маршрута - **ключевой компонент приложения**

```
Map/
├── Map.tsx              # Главный компонент (396 строк)
├── MapHeader/           # Заголовок с прогрессом
├── Step/                # Шаг на карте
├── RouteRenderer.tsx    # Отрисовка маршрута
├── FogOfWar.tsx         # Маска непройденного
├── AwardModal/          # Модаль награды
└── Clouds/              # Декоративные облака
```

**Особенности:**
- React XArrows для линий между шагами
- Fog of War эффект для скрытия непройденной части
- Автоскролл к активному шагу
- Интеграция с Redux для прогресса

### Landing/HowItWorks (959 строк!)
Секция "Как это работает" - **требует рефакторинга**

4 шага:
1. Choose your adventure quest
2. Connect applications (Strava, Fitbit)
3. Discover engaging content
4. Receive your medal

### Leaderboard
Два варианта реализации (дублирование!):
- `app/components/Application/Leaderboard/`
- `app/components/LeaderboardSwiper/`

---

## Типы данных

### IActiveChallenge
```typescript
interface IActiveChallenge {
  id: number;
  name: string;
  description: string;
  status_id: number;
  total_distance: number;
  activate_date: string;
  user_distance: number;
  is_completed: boolean;
  completed_at: string | null;
  steps: IStep[];
  background_images: IBackgroundImage[];
  reward?: IReward;
  reward_ticket?: IRewardTicket;
  route_data?: IRouteData;
}
```

### IActivity
```typescript
interface IActivity {
  id: number;
  activity_id: string;
  activity_name: string;
  user_id: number;
  activity_date: string;
  activity_time: string;
  sport_type: ActivityType;
  from: string;
  progress: number;
  pace: number;
  average_speed: number;
  max_speed: number;
  average_heart_rate: number;
  max_heart_rate: number;
}
```

### IUser
```typescript
interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url: string | null;
  strava_id: string | null;
  has_strava_connect: boolean;
  has_fitbit_connect: boolean;
  total_activities_count: number;
  total_distance: number;
  birth_date: { year: number; month: number; day: number };
  sex: string;
  country: string;
  phone: string;
}
```

---

## Интеграции

### Strava OAuth Flow
```
1. GET /api/strava/auth
   → Redirect to strava.com/oauth/authorize
2. Strava callback → /api/strava/callback
   → Exchange code for token
   → Store in cookies (strava_access_token, strava_athlete)
3. Синхронизация активностей через /api/user/refresh-activities
```

### Fitbit OAuth
- Client ID: 23TW5R (по умолчанию)
- Аналогичный flow через /api/fitbit/*

### Google OAuth
- Через Google Sign-In SDK
- Callback: /api/auth/google/callback

### Платежи
- **Stripe** - основной провайдер
- **Paddle** - альтернативный провайдер
- Поддержка EUR/USD

---

## Environment Variables

### Public (NEXT_PUBLIC_*)
```
NEXT_PUBLIC_STRAVA_CLIENT_ID
NEXT_PUBLIC_FITBIT_CLIENT_ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID
NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN
```

### Private (Server-only)
```
STRAVA_CLIENT_SECRET
FITBIT_CLIENT_SECRET
GOOGLE_CLIENT_SECRET
STRIPE_SECRET_KEY
NEXTAUTH_URL
```

### Hard-coded (ПРОБЛЕМА!)
```typescript
// app/lib/utils/instance.ts
const baseURL = "https://dev.myfinishline.io/back/api";

// Google Analytics
const GA_ID = "G-LYKSZRTMBX";
```

---

## Конфигурация

### next.config.ts
```typescript
{
  reactStrictMode: false,  // ⚠️ Отключен!
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [/* 16 источников */]
  },
  redirects: [
    "/app" → "/app/homepage",
    "/app/profile" → "/app/profile/journey",
    "/app/contracts" → "/app/contracts/all"
  ]
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2017",
    "paths": { "@/*": ["./*"] }
  }
}
```

---

## Middleware (proxy.ts)

### Защита маршрутов
```typescript
// Public routes (без аутентификации):
["/payment", "/api/webhook", "/auth", "/login", "/signup"]

// Protected routes:
/app/* → Требует auth_token ИЛИ (strava_access_token + strava_athlete)

// Root redirect:
/ → /app если аутентифицирован
```

---

## Известные проблемы

### 1. Дублирование компонентов
- **Modal**: 3 реализации (CustomModal, SheetContainer, ui/modal)
- **Accordion**: 2 реализации (FaqAccordion, ui/accordion)
- **Leaderboard**: 2 реализации

### 2. Типизация
- 8+ использований `any`
- 3+ `@ts-ignore`
- Дублирование: IUser vs User vs IProfile

### 3. Redux баги
```typescript
// serializableCheck отключен - скрывает проблемы
serializableCheck: false

// addActivity теряет предыдущие записи!
addActivity: (state, action) => {
  return { activities: [action.payload] };
}
```

### 4. Большие файлы
- HowItWorks.tsx - 959 строк
- ProgressArrow.tsx - 476 строк
- Map.tsx - 396 строк

### 5. Конфигурация
- reactStrictMode: false
- Hard-coded URLs
- Нет .env.example

---

## Scripts

```bash
npm run dev      # Запуск dev сервера
npm run build    # Сборка для продакшена
npm run start    # Запуск продакшен сервера
npm run lint     # Проверка ESLint
```

---

## Файлы для внимания при рефакторинге

### Критические
- `app/lib/store.ts` - исправить serializableCheck
- `app/lib/features/activities/activitiesSlice.ts` - исправить addActivity
- `app/types.ts` - объединить типы

### Требуют разбиения
- `app/components/Landing/HowItWorks.tsx` (959 строк)
- `app/components/Application/Map/Map.tsx` (396 строк)
- `app/components/Shared/ProgressArrow/ProgressArrow.tsx` (476 строк)

### Дублирование для устранения
- Модальные компоненты
- Accordion компоненты
- Leaderboard компоненты

---

*Документ создан: 2026-01-26*
*Версия проекта: 0.1.0*
