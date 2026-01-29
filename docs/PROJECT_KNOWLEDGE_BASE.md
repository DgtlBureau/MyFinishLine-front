# MyFinishLine Frontend - База знаний проекта

> Полная документация проекта, включающая архитектуру, технические решения, известные проблемы и историю изменений.

**Версия проекта:** 0.1.0
**Последнее обновление:** 2026-01-27
**Tech Lead:** Claude Code

---

## Оглавление

1. [Обзор проекта](#обзор-проекта)
2. [Технологический стек](#технологический-стек)
3. [Архитектура приложения](#архитектура-приложения)
4. [Ключевые компоненты](#ключевые-компоненты)
5. [Redux State Management](#redux-state-management)
6. [API Endpoints](#api-endpoints)
7. [Интеграции](#интеграции)
8. [Известные проблемы и баги](#известные-проблемы-и-баги)
9. [История изменений из разговора](#история-изменений-из-разговора)
10. [Рекомендации по развитию](#рекомендации-по-развитию)

---

## Обзор проекта

**MyFinishLine** - это геймифицированная платформа для фитнес-челленджей с элементами RPG. Пользователи проходят виртуальные маршруты по реальным локациям, отслеживая свой прогресс через интеграции с фитнес-приложениями.

### Основной флоу пользователя:

1. **Регистрация/Вход** - Email/Password или Google OAuth
2. **Выбор челленджа** - Покупка виртуального квеста (Amazonia Quest и др.)
3. **Подключение фитнес-трекера** - Strava, Fitbit или ручной ввод
4. **Прохождение маршрута** - Интерактивная карта с шагами, наградами, историями
5. **Получение медали** - После завершения - физическая медаль по почте

### Уникальные особенности:

- **Интерактивная карта** с Fog of War эффектом
- **Сюжетные элементы** - Енот-проводник (Sage), исторические факты
- **Геймификация** - Контракты, награды, лидерборд
- **Персонализация** - Рамки, баннеры, скины маскота
- **Физические награды** - Эксклюзивная медаль за каждый челлендж

---

## Технологический стек

### Core Framework
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Next.js** | 16.0.7 | Framework с App Router |
| **React** | 19.2.1 | UI Library |
| **TypeScript** | 5.x | Типизация |

### State Management
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Redux Toolkit** | 2.11.2 | Глобальное состояние |
| **Redux Persist** | 6.0.0 | Персистентность |

### Styling & UI
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Tailwind CSS** | 4.x | Utility-first стили |
| **Radix UI** | Various | Accessible компоненты |
| **Lucide React** | 0.555.0 | Иконки |
| **Motion** | 12.23.24 | Анимации (Framer Motion) |
| **Lottie React** | 2.4.1 | JSON-анимации |

### Forms & Validation
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Formik** | 2.4.9 | Управление формами |
| **React Toastify** | 11.0.5 | Уведомления |

### Maps & Visualization
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Leaflet** | 1.9.4 | Карты |
| **React Leaflet** | 5.0.0 | React-обёртка |
| **React XArrows** | 2.0.2 | Линии между элементами |
| **React Zoom Pan Pinch** | 3.7.0 | Zoom/Pan карты |
| **@mapbox/polyline** | 1.2.1 | Декодирование маршрутов |

### HTTP & API
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Axios** | 1.13.2 | HTTP-клиент |

### Payment Integration
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Stripe** | 19.3.1 + React 5.3.0 | Основной платежный провайдер |
| **Paddle** | 1.6.1 + SDK 3.5.0 | Альтернативный провайдер |

### i18n
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **i18next** | 25.7.2 | Интернационализация |
| **next-intl** | 4.5.8 | Next.js интеграция |

### Carousel & UI Components
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **Swiper** | 12.0.3 | Карусели |
| **Embla Carousel** | 8.6.0 | Альтернативный carousel |
| **React Modal** | 3.16.3 | Модальные окна |
| **React Modal Sheet** | 5.2.1 | Bottom sheets |
| **Vaul** | 1.1.2 | Drawer компонент |

### Other Libraries
| Технология | Версия | Назначение |
|-----------|--------|------------|
| **date-fns** | 4.1.0 | Работа с датами |
| **React Day Picker** | 9.13.0 | Date picker |
| **React Confetti** | 6.4.0 | Конфетти для празднования |
| **React Use** | 17.6.0 | Хуки |
| **use-debounce** | 10.0.6 | Debounce хук |
| **bcryptjs** | 3.0.3 | Хеширование паролей |
| **jsonwebtoken** | 9.0.2 | JWT токены |

---

## Архитектура приложения

### Структура директорий

```
/Users/artiom/MyFinishLine-front/
├── app/
│   ├── (application)/              # Защищённое приложение [Auth Required]
│   │   └── app/
│   │       ├── homepage/           # Главная - Map с енотом
│   │       ├── contracts/          # Контракты (all, achieved, still-to-get)
│   │       ├── leaderboard/        # Таблица лидеров
│   │       ├── integrations/       # Подключение Strava/Fitbit
│   │       ├── more/               # FAQ, Settings, Support
│   │       ├── activities/new/     # Добавить активность вручную
│   │       └── profile/
│   │           ├── (profile)/      # Journey (активности), Activities
│   │           │   ├── journey/
│   │           │   └── activities/
│   │           ├── [userId]/       # Профиль другого пользователя
│   │           ├── redeem/         # Получение медали (3 шага)
│   │           └── settings/
│   │               ├── page.tsx            # Главная настроек
│   │               ├── edit-account/       # Редактирование профиля
│   │               └── personalization/    # Frames, Banners, Skins
│   │
│   ├── (with-header)/              # Публичные страницы с навигацией
│   │   ├── page.tsx                # Landing page (Hero + HowItWorks)
│   │   ├── challenges/
│   │   │   └── [challengeId]/      # Детальная страница челленджа
│   │   ├── payment/                # Оплата
│   │   │   └── success/            # Успешная оплата
│   │   └── faq/                    # FAQ page
│   │
│   ├── (without-header)/           # Страницы без навигации
│   │   ├── login/                  # Вход
│   │   ├── signup/                 # Регистрация
│   │   ├── verify/                 # Подтверждение email кода
│   │   ├── forgot-password/        # Восстановление пароля
│   │   ├── confirm-challenge/      # Подтверждение покупки челленджа
│   │   ├── auth/
│   │   │   ├── google/callback/    # Google OAuth callback
│   │   │   └── fitbit/callback/    # Fitbit OAuth callback
│   │   ├── privacy/                # Политика конфиденциальности
│   │   ├── terms-of-service/       # Условия использования
│   │   └── refund-policy/          # Политика возврата
│   │
│   ├── api/                        # Next.js API Routes (49 эндпоинтов)
│   │   ├── auth/                   # 8 эндпоинтов
│   │   ├── user/                   # 18 эндпоинтов
│   │   ├── strava/                 # 9 эндпоинтов
│   │   ├── fitbit/                 # 2 эндпоинта
│   │   ├── payment/                # 3 эндпоинта
│   │   ├── leaderboard/            # 2 эндпоинта
│   │   ├── profile/                # 1 эндпоинт
│   │   ├── faq/                    # 1 эндпоинт
│   │   └── ...                     # create-payment-intent, cancel-payment-intent
│   │
│   ├── components/                 # React компоненты (168+ файлов)
│   │   ├── ui/                     # Базовые UI компоненты
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── modal/              # Modal компонент #1
│   │   │   ├── errorInfo/
│   │   │   └── customSect/
│   │   │
│   │   ├── Shared/                 # Переиспользуемые компоненты
│   │   │   ├── Avatar/
│   │   │   ├── Loader/
│   │   │   ├── CustomModal/        # Modal компонент #2 (дублирование!)
│   │   │   ├── StoryList/          # Истории (Stories)
│   │   │   └── ProgressArrow/      # 476 строк!
│   │   │
│   │   ├── Application/            # Компоненты приложения
│   │   │   ├── Map/                # ⭐ Ключевой компонент (карта маршрута)
│   │   │   ├── MapHeader/
│   │   │   ├── Navbar/             # Нижняя навигация
│   │   │   ├── AppHeader/          # Верхний заголовок
│   │   │   ├── AddActivityModal/   # Modal компонент #3 (дублирование!)
│   │   │   ├── Leaderboard/        # Лидерборд #1
│   │   │   ├── Profile/
│   │   │   ├── Stats/
│   │   │   ├── Store/
│   │   │   ├── Settings/
│   │   │   ├── Integrations/
│   │   │   ├── More/
│   │   │   └── ...
│   │   │
│   │   ├── Landing/                # ⭐ Landing page компоненты
│   │   │   ├── Hero.tsx            # Hero с картой и енотом (215 строк)
│   │   │   └── HowItWorks.tsx      # ⚠️ 1386 строк! (требует рефакторинга)
│   │   │
│   │   ├── Map/                    # Компоненты карты (старые?)
│   │   │   ├── Map.tsx
│   │   │   ├── AwardModal/
│   │   │   └── Clouds/
│   │   │
│   │   ├── LeaderboardSwiper/      # Лидерборд #2 (дублирование!)
│   │   ├── ChallengesPayment/      # Оплата челленджей
│   │   ├── ChallengePage/          # Страница челленджа
│   │   ├── ChallengeContent/       # Контент челленджа
│   │   ├── CheckoutForm/           # Форма оплаты
│   │   ├── Payment/                # Компоненты оплаты
│   │   ├── Faq/                    # FAQ компоненты
│   │   ├── Footer/                 # Футер
│   │   ├── Trophies/               # Трофеи
│   │   ├── PersonalizationList/    # Персонализация
│   │   ├── SheetContainer/         # Bottom sheet
│   │   ├── PasswordValidator/      # Валидатор пароля
│   │   ├── ConfirmCode/            # Подтверждение кода
│   │   └── magicui/                # Magic UI компоненты
│   │
│   ├── lib/                        # ⭐ Утилиты и Redux
│   │   ├── store.ts                # Redux store config
│   │   ├── hooks.ts                # Redux хуки (useAppDispatch, useAppSelector)
│   │   ├── features/               # Redux slices
│   │   │   ├── user/
│   │   │   │   └── userSlice.ts    # User state + contracts + challenges + personalization
│   │   │   ├── activities/
│   │   │   │   └── activitiesSlice.ts  # ⚠️ БАГ: addActivity теряет данные
│   │   │   ├── challenge/
│   │   │   │   └── challengeSlice.ts   # Текущий активный челлендж
│   │   │   ├── products/
│   │   │   │   └── productsSlice.ts    # Продукты для покупки
│   │   │   ├── leaderboard/
│   │   │   │   └── leaderboardSlice.ts # Лидерборд
│   │   │   └── profile/
│   │   │       └── profileSlice.ts     # Профиль другого пользователя
│   │   │
│   │   └── utils/                  # Сервисы и хелперы
│   │       ├── instance.ts         # Axios инстанс (⚠️ hardcoded URL)
│   │       ├── userService.ts      # User API
│   │       ├── authService.ts      # Auth API
│   │       └── ...
│   │
│   ├── hooks/                      # Custom hooks
│   │   ├── use-toast.ts
│   │   ├── use-mobile.ts
│   │   └── ...
│   │
│   ├── types/                      # TypeScript типы
│   │   ├── index.ts                # Основные типы
│   │   ├── user.ts                 # User типы
│   │   └── ...
│   │
│   ├── data/                       # Статические данные
│   │   ├── faq.ts
│   │   ├── challenges.ts
│   │   └── ...
│   │
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Глобальные стили
│   ├── StoreProvider.tsx           # Redux Provider
│   └── page.tsx                    # Root page
│
├── public/
│   └── images/                     # ⚠️ Много новых изображений (см. git status)
│       ├── hero-map.png            # ✅ Правильное изображение карты Южной Америки
│       ├── card3-sage.png          # Енот-проводник
│       ├── amazonia-quest.png
│       ├── card1-medal.png
│       ├── card2-*.svg             # Иконки активностей
│       └── ...
│
├── docs/                           # 📚 Документация
│   ├── PROJECT_ARCHITECTURE.md     # Архитектура (уже существует)
│   ├── PROJECT_KNOWLEDGE_BASE.md   # База знаний (этот файл)
│   ├── PROJECT_MERGER_GUIDE.md     # Гайд по слиянию
│   ├── shipping-integration-business-logic.md
│   ├── shipping-uml-diagrams.md
│   ├── diagrams/                   # UML диаграммы
│   └── generate-diagrams.js
│
├── next.config.ts                  # Next.js конфигурация
├── tailwind.config.ts              # Tailwind конфигурация
├── tsconfig.json                   # TypeScript конфигурация
├── package.json                    # Dependencies
├── .env.local                      # Environment variables (не в git)
├── .env.local.example              # Пример env переменных
└── README.md                       # Базовый readme
```

### Layouts (3 группы)

#### 1. (application) - Защищённое приложение

```typescript
// app/(application)/layout.tsx
Layout для аутентифицированных пользователей:
- AppHeader (верхний заголовок с прогрессом)
- Content area (белый фон, rounded углы)
- Navbar (нижняя навигация: Home, Contracts, Leaderboard, Profile, More)
- ToastContainer (уведомления)

Требует: auth_token ИЛИ (strava_access_token + strava_athlete)
```

#### 2. (with-header) - Публичные страницы

```typescript
// app/(with-header)/layout.tsx
Layout для публичных страниц:
- Navbar (публичный хедер с логотипом)
- Content area
- Footer

Используется для: Landing, Challenges, Payment, FAQ
```

#### 3. (without-header) - Минимальный layout

```typescript
// app/(without-header)/layout.tsx
Минимальный layout без навигации:
- Только content area

Используется для: Login, Signup, Verify, OAuth callbacks, Legal pages
```

---

## Ключевые компоненты

### 1. Hero.tsx - Landing Page Hero (/app/components/Landing/Hero.tsx)

**Размер:** 215 строк
**Статус:** ✅ Исправлен (27.01.2026)

**Описание:**
Hero секция на главной странице с анимированной картой Южной Америки и енотом-проводником.

**Ключевые элементы:**
- Карта Южной Америки (`/images/hero-map.png`)
- Енот-проводник (`/images/card3-sage.png`)
- Речевой пузырь "Let's go on an adventure!"
- CTA кнопка "Start the Adventure"

**Анимационная последовательность:**
1. Preload всех изображений
2. Stage 1 (0ms): Появление карты (fade + scale)
3. Stage 2 (800ms): Появление енота (fade + slide up)
4. Stage 3 (1300ms): Появление речевого пузыря (scale + fade)
5. Stage 4 (1800ms): Появление текста в пузыре

**Проблемы решённые:**
- ❌ Было: `hero.webp` - изображение Kanban доски
- ✅ Теперь: `hero-map.png` - правильная карта Южной Америки

**Известные проблемы:**
- ⚠️ Енот имеет фиолетовый круг на изображении - требуется замена

```typescript
// Изображения
const heroMapImg = "/images/hero-map.png";      // ✅ Правильное
const raccoonImg = "/images/card3-sage.png";    // ⚠️ Требует замены (убрать круг)
```

---

### 2. HowItWorks.tsx - Секция "Как это работает"

**Размер:** ⚠️ 1386 строк (требует рефакторинга!)
**Путь:** `/app/components/Landing/HowItWorks.tsx`

**Описание:**
Интерактивная секция с 4 шагами, объясняющая как работает приложение.

**4 Шага:**

#### Card 1: Choose your adventure quest
- Выбор квеста
- Визуализация: кольцо, фото локации, превью медали
- Изображения:
  - `/images/card1-ring.png` (декоративное кольцо)
  - `/images/card1-photo-bg.jpg` (фон локации)
  - `/images/card1-medal.png` (превью медали)

#### Card 2: Connect applications
- Подключение Strava/Fitbit
- Визуализация: иконки приложений, типы активностей
- Изображения:
  - `/images/card2-strava-icon.svg`
  - `/images/card2-fitbit-icon.svg`
  - `/images/card2-garmin-g*.png`
  - `/images/card2-act-*.svg` (bike, run, walk, swim, hike, climb, treadmill)

#### Card 3: Discover engaging content
- Прогресс по маршруту
- Визуализация: карта, енот-гид, награды, задания
- Изображения:
  - `/images/card3-map-bg.jpg`
  - `/images/card3-sage.png` (енот)
  - `/images/card3-reward.png`
  - `/images/card3-route-path*.png`

#### Card 4: Receive your medal
- Получение физической медали
- Визуализация: 3D медаль с лентой
- Изображения:
  - `/images/card4-medal-with-ribbon.png`
  - `/images/card4-medal-front.png`

**Проблемы:**
- ⚠️ Файл слишком большой - 1386 строк
- Требует разбиения на подкомпоненты:
  - `Card1ChooseQuest.tsx`
  - `Card2ConnectApps.tsx`
  - `Card3DiscoverContent.tsx`
  - `Card4ReceiveMedal.tsx`
  - `HowItWorksContainer.tsx`

---

### 3. Map.tsx - Интерактивная карта маршрута

**Размер:** ~400 строк
**Путь:** `/app/components/Map/Map.tsx` или `/app/components/Application/Map/Map.tsx`

**Описание:**
Ключевой компонент приложения - интерактивная карта прохождения квеста.

**Технологии:**
- React XArrows - линии между шагами
- Leaflet - базовая карта
- Custom Fog of War - скрытие непройденной части
- Motion - анимации

**Основные фичи:**
1. **Шаги маршрута** (Step компоненты)
   - Открытые/закрытые/текущий
   - Иконки наград
   - Истории (Stories)

2. **Fog of War эффект**
   - Маска для скрытия непройденной части
   - Градиентный переход

3. **Автоскролл**
   - К активному шагу
   - К позиции пользователя (`#user-progress-icon`)

4. **RouteRenderer**
   - Отрисовка маршрута из `route_data`
   - Поддержка polyline

5. **Award Modal**
   - Модальное окно с наградами
   - Анимация конфетти

**Константы:**
```typescript
const MAP_WIDTH = 672;
const DEFAULT_MAP_HEIGHT = 5354;
const CONTENT_WIDTH = MAP_WIDTH - 64; // 608
```

**Интеграция с Redux:**
```typescript
const { user } = useAppSelector(state => state.user);
const challenge = useAppSelector(state => state.challenge);
```

---

### 4. Modal компоненты (3 варианта - дублирование!)

#### Вариант #1: ui/modal/Modal.tsx
```typescript
// app/components/ui/modal/Modal.tsx
// Базовый модальный компонент
```

#### Вариант #2: Shared/CustomModal/CustomModal.tsx
```typescript
// app/components/Shared/CustomModal/CustomModal.tsx
// Кастомный модальный компонент с дополнительными стилями
```

#### Вариант #3: Application/AddActivityModal/
```typescript
// app/components/Application/AddActivityModal/
// Специализированный модал для добавления активности
```

**Проблема:** Дублирование логики. Требуется унификация в один компонент.

---

### 5. Leaderboard компоненты (2 варианта - дублирование!)

#### Вариант #1: Application/Leaderboard/
```typescript
// app/components/Application/Leaderboard/Leaderboard.tsx
// Основной лидерборд
```

#### Вариант #2: LeaderboardSwiper/
```typescript
// app/components/LeaderboardSwiper/LeaderboardSwiper.tsx
// Лидерборд в виде свайпера
```

**Проблема:** Дублирование. Нужно оставить один вариант или чётко разделить use cases.

---

## Redux State Management

### Store Configuration

**Путь:** `/app/lib/store.ts`

```typescript
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,           // Данные пользователя + contracts + challenges + personalization
  activities: activitiesSlice, // Спортивные активности
  challenge: challengeSlice,   // Текущий активный челлендж
  products: productsSlice,     // Продукты для покупки
  leaderboard: leaderboardSlice, // Лидерборд
  profile: profileSlice        // Профиль другого пользователя
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "activities", "products", "profile"],
  // НЕ персистятся: challenge, leaderboard
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // ⚠️ ПРОБЛЕМА: Скрывает ошибки!
    }),
});
```

**⚠️ Проблема:** `serializableCheck: false` отключен - это скрывает проблемы с несериализуемыми данными в Redux.

---

### Слайсы (Slices)

#### 1. userSlice.ts

**Путь:** `/app/lib/features/user/userSlice.ts`

**Состояние:**
```typescript
interface IUserState {
  user: IUser;                      // Данные пользователя
  contracts: IContract[];           // Контракты (задания)
  challenges: IActiveChallenge[];   // Активные челленджи
  completedContracts: IContract[];  // Завершённые контракты
  personalization: {                // Персонализация
    frame: { id: number; image_url: string } | null;
    banner: { id: number; image_url: string } | null;
    mascot: { id: number; image_url: string } | null;
  };
}
```

**Actions:**
- `setUser` - установить пользователя
- `updateUser` - обновить частично
- `setUserContracts` - установить контракты
- `setUserCompletedContracts` - установить завершённые контракты
- `setUserChallenges` - установить челленджи
- `updateUserSex` - обновить пол
- `updatePersonalization` - обновить персонализацию

**IUser интерфейс:**
```typescript
interface IUser {
  id: number | null;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar_url: string | null;
  full_avatar_url: string;
  avatar_symbol: string;
  avatar_color: string;
  country: string;
  phone: string;

  // Интеграции
  strava_id: string | null;
  has_strava_connect: boolean;
  has_fitbit_connect: boolean;

  // Статистика
  total_activities_count: number;
  total_distance: number;
  total_distance_mile: number;
  total_moving_time_hours: number;

  // Персональные данные
  sex: string;  // "Male" | "Female" | "Prefer not to say"
  birth_date: {
    year: number;
    month: number;
    day: number;
  };
  measure: "km" | "mile";

  // Флаги
  has_activated_code: boolean;
  available_onboarding: boolean;

  // Метаданные
  created_at: string;
  updated_at: string;
}
```

---

#### 2. activitiesSlice.ts ⚠️ БАГ!

**Путь:** `/app/lib/features/activities/activitiesSlice.ts`

**Состояние:**
```typescript
interface IActivitiesState {
  activities: IActivity[];
  isLoaded: boolean;
}
```

**Actions:**
```typescript
setActivities: (_, action: PayloadAction<IActivity[]>) => {
  return { activities: action.payload, isLoaded: true };
},

updateActivities: (state, action: PayloadAction<IActivity>) => {
  return {
    isLoaded: true,
    activities: [action.payload, ...state.activities],  // ✅ Правильно: добавляет в начало
  };
},

// ⚠️ БАГ: Теряет предыдущие активности!
addActivity: (state, action: PayloadAction<IActivity>) => {
  return {
    isLoaded: state.isLoaded,
    activities: [action.payload],  // ❌ ПРОБЛЕМА: заменяет все активности на одну!
  };
},

clearActivities: () => initialState,
```

**Проблема:** `addActivity` заменяет весь массив активностей на одну новую активность, вместо добавления к существующим.

**Исправление:**
```typescript
addActivity: (state, action: PayloadAction<IActivity>) => {
  return {
    isLoaded: state.isLoaded,
    activities: [action.payload, ...state.activities],  // ✅ Правильно
  };
},
```

**IActivity интерфейс:**
```typescript
interface IActivity {
  id: number;
  activity_id: string;
  activity_name: string;
  user_id: number;
  activity_date: string;
  activity_time: string;
  sport_type: ActivityType;  // "run" | "bike" | "walk" | "swim" | "hike" | "climb" | "treadmill"
  from: string;  // "strava" | "fitbit" | "manual"
  progress: number;  // Дистанция в метрах
  pace: number;
  average_speed: number;
  max_speed: number;
  average_heart_rate: number;
  max_heart_rate: number;
}
```

---

#### 3. challengeSlice.ts

**Путь:** `/app/lib/features/challenge/challengeSlice.ts`

**Состояние:**
```typescript
interface IChallengeState {
  challenge: IActiveChallenge | null;
}
```

**Actions:**
- `setChallenge` - установить текущий челлендж
- `clearChallenge` - очистить

**IActiveChallenge интерфейс:**
```typescript
interface IActiveChallenge {
  id: number;
  name: string;
  description: string;
  status_id: number;
  status: {
    id: number;
    type: "active" | "completed" | "pending";
    name: string;
  };
  total_distance: number;         // Общая дистанция квеста
  user_distance: number;          // Пройдено пользователем
  activate_date: string;
  is_completed: boolean;
  completed_at: string | null;

  steps: IStep[];                 // Шаги маршрута
  background_images: IBackgroundImage[];  // Фоны для карты
  reward?: IReward;               // Награда (медаль)
  reward_ticket?: IRewardTicket;  // Билет на получение награды
  route_data?: IRouteData;        // Данные маршрута (polyline)
}

interface IStep {
  id: number;
  name: string;
  description: string;
  x_coordinate: string;
  y_coordinate: string;
  is_completed: boolean;
  order: number;
  distance_from_start: number;
  contracts: IContract[];         // Контракты на этом шаге
  stories: IStory[];              // Истории на этом шаге
}
```

**Не персистится** - загружается заново при каждом визите.

---

#### 4. productsSlice.ts

**Путь:** `/app/lib/features/products/productsSlice.ts`

**Состояние:**
```typescript
interface IProductsState {
  products: IProduct[];
}
```

**Actions:**
- `setProducts` - установить продукты
- `clearProducts` - очистить

**Персистится** в localStorage.

---

#### 5. leaderboardSlice.ts

**Путь:** `/app/lib/features/leaderboard/leaderboardSlice.ts`

**Состояние:**
```typescript
interface ILeaderboardState {
  leaderboard: ILeaderboardEntry[];
  myPosition: number | null;
}
```

**Actions:**
- `setLeaderboard` - установить лидерборд
- `setMyPosition` - установить позицию пользователя
- `clearLeaderboard` - очистить

**Не персистится** - загружается при каждом открытии страницы.

---

#### 6. profileSlice.ts

**Путь:** `/app/lib/features/profile/profileSlice.ts`

**Состояние:**
```typescript
interface IProfileState {
  profile: IUser | null;  // Профиль другого пользователя
}
```

**Actions:**
- `setProfile` - установить профиль
- `clearProfile` - очистить

**Персистится** - кеширует просмотренные профили.

---

## API Endpoints

### Базовая конфигурация

**Base URL:** `https://dev.myfinishline.io/back/api`
**Путь:** `/app/lib/utils/instance.ts`

⚠️ **Проблема:** URL захардкожен в коде! Должен быть в environment variables.

```typescript
// ❌ Сейчас
const baseURL = "https://dev.myfinishline.io/back/api";

// ✅ Должно быть
const baseURL = process.env.NEXT_PUBLIC_API_URL;
```

**Аутентификация:**
- JWT токен в cookies: `auth_token`
- Альтернатива: `strava_access_token` + `strava_athlete`

---

### Эндпоинты (49 штук)

#### Аутентификация (/api/auth/) - 8 эндпоинтов

| Endpoint | Метод | Описание | Параметры |
|----------|-------|----------|-----------|
| `/login` | POST | Вход | email, password |
| `/register` | POST | Регистрация | email, password, first_name, last_name |
| `/verify` | POST | Подтверждение email | code |
| `/send-code` | POST | Отправить код | email |
| `/resend-code` | POST | Повторить код | - |
| `/reset-password` | POST | Сброс пароля | email, code, new_password |
| `/logout` | POST | Выход | - |
| `/google` | GET | Google OAuth начало | - |
| `/google/callback` | GET | Google OAuth callback | code |

**Исправленная проблема (27.01.2026):**
- ❌ Было: Прямой запрос к `https://dev.myfinishline.io/back/api/auth/login` - CORS ошибка
- ✅ Теперь: Запрос через Next.js API Route `/api/auth/login` - работает

---

#### Пользователь (/api/user/) - 18 эндпоинтов

| Endpoint | Метод | Описание | Возвращает |
|----------|-------|----------|------------|
| `/get-current-user` | GET | Текущий пользователь | IUser |
| `/update-user` | POST | Обновить профиль | IUser |
| `/activities` | GET | Получить активности | IActivity[] |
| `/activities` | POST | Добавить активность | IActivity |
| `/update-activity` | POST | Обновить активность | IActivity |
| `/refresh-activities` | GET | Синхронизация со Strava | IActivity[] |
| `/challenges` | GET | Челленджи пользователя | IActiveChallenge[] |
| `/active-challenge` | GET | Активный челлендж | IActiveChallenge |
| `/challenge` | GET | Детали челленджа | IActiveChallenge |
| `/contracts` | GET | Контракты | IContract[] |
| `/completed-contracts` | GET | Завершённые контракты | IContract[] |
| `/rewards` | GET | Награды | IReward[] |
| `/redeem-reward` | POST | Получить награду | IRewardTicket |
| `/cosmetics` | GET | Косметика | ICosmetic[] |
| `/update-cosmetics` | POST | Обновить косметику | - |
| `/disconnect-strava` | POST | Отключить Strava | - |
| `/disconnect-fitbit` | POST | Отключить Fitbit | - |
| `/onboarding` | GET | Онбординг слайды | IStory[] |
| `/view-story` | POST | Отметить историю как просмотренную | - |
| `/activate-code` | POST | Активировать промокод | - |

---

#### Strava (/api/strava/) - 9 эндпоинтов

| Endpoint | Метод | Описание | Параметры |
|----------|-------|----------|-----------|
| `/auth` | GET | OAuth начало | - |
| `/callback` | GET | OAuth callback | code, scope |
| `/link` | POST | Связать аккаунт | code |
| `/user` | GET | Данные пользователя Strava | - |
| `/athlete` | GET | Данные атлета | - |
| `/athletes` | GET | Список атлетов | - |
| `/activities` | GET | Активности из Strava | - |
| `/activity` | GET | Одна активность | activity_id |
| `/logout` | POST | Отключить Strava | - |

**OAuth Flow:**
1. `GET /api/strava/auth` → Redirect to Strava
2. Strava callback → `GET /api/strava/callback?code=xxx&scope=xxx`
3. Сохранение токенов в cookies: `strava_access_token`, `strava_athlete`
4. `GET /api/user/refresh-activities` - синхронизация активностей

---

#### Fitbit (/api/fitbit/) - 2 эндпоинта

| Endpoint | Метод | Описание |
|----------|-------|----------|
| `/auth` | GET | OAuth начало |
| `/connect` | GET | OAuth callback |

**Client ID:** `23TW5R` (default)

---

#### Платежи (/api/payment/) - 3 эндпоинта

| Endpoint | Метод | Описание | Параметры |
|----------|-------|----------|-----------|
| `/products` | GET | Получить продукты | - |
| `/order` | POST | Создать заказ | product_id, payment_method |
| `/create-payment-intent` | POST | Stripe Payment Intent | amount, currency |
| `/cancel-payment-intent` | POST | Отменить Payment Intent | payment_intent_id |

**Провайдеры:**
- **Stripe** - основной
- **Paddle** - альтернативный

**Валюты:**
- EUR
- USD

---

#### Лидерборд (/api/leaderboard/) - 2 эндпоинта

| Endpoint | Метод | Описание | Возвращает |
|----------|-------|----------|------------|
| `/general-leaderboard` | GET | Общий лидерборд | ILeaderboardEntry[] |
| `/get-users` | GET | Пользователи лидерборда | IUser[] |

---

#### Профиль (/api/profile/) - 1 эндпоинт

| Endpoint | Метод | Описание | Параметры |
|----------|-------|----------|-----------|
| `/user` | GET | Профиль пользователя | user_id |

---

#### FAQ (/api/faq/) - 1 эндпоинт

| Endpoint | Метод | Описание | Параметры |
|----------|-------|----------|-----------|
| `/send-feedback` | POST | Отправить feedback | name, email, message |

---

## Интеграции

### 1. Strava OAuth

**Flow:**
```
1. User нажимает "Connect Strava"
2. GET /api/strava/auth
   ↓
3. Redirect to strava.com/oauth/authorize
   - client_id: NEXT_PUBLIC_STRAVA_CLIENT_ID
   - redirect_uri: /api/strava/callback
   - response_type: code
   - scope: activity:read_all
   ↓
4. User авторизуется на Strava
   ↓
5. Redirect to /api/strava/callback?code=xxx&scope=xxx
   ↓
6. Exchange code for tokens
   - POST to strava.com/oauth/token
   - Получаем: access_token, refresh_token, athlete
   ↓
7. Сохранение в cookies:
   - strava_access_token
   - strava_athlete (JSON)
   ↓
8. Redirect to /app/integrations
   ↓
9. GET /api/user/refresh-activities
   - Загружает активности из Strava
   - Сохраняет в БД
   ↓
10. Dispatch setActivities() в Redux
```

**Environment Variables:**
```bash
NEXT_PUBLIC_STRAVA_CLIENT_ID=your_client_id
STRAVA_CLIENT_SECRET=your_secret
```

**API Endpoints используемые:**
- Strava API: `https://www.strava.com/api/v3/`
- OAuth: `https://www.strava.com/oauth/authorize`
- Token Exchange: `https://www.strava.com/oauth/token`

**Scopes:**
- `activity:read_all` - чтение всех активностей

---

### 2. Fitbit OAuth

**Client ID:** `23TW5R` (по умолчанию)

**Flow:** Аналогичен Strava

**Environment Variables:**
```bash
NEXT_PUBLIC_FITBIT_CLIENT_ID=23TW5R
FITBIT_CLIENT_SECRET=your_secret
NEXT_PUBLIC_FITBIT_REDIRECT_URI=http://localhost:3000/auth/fitbit/callback
```

---

### 3. Google OAuth

**Провайдер:** Google Sign-In SDK

**Flow:**
```
1. User нажимает "Sign in with Google"
2. Google Sign-In popup
3. Получаем credential (JWT)
4. POST /api/auth/google с credential
5. Backend проверяет JWT
6. Создаёт/находит пользователя
7. Возвращает auth_token
8. Redirect to /app/homepage
```

**Environment Variables:**
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```

---

### 4. Stripe Payment

**Провайдер:** Stripe Elements + Payment Intents

**Flow:**
```
1. User выбирает челлендж
2. Redirect to /payment?challenge_id=xxx
3. Load Stripe Elements
4. POST /api/payment/create-payment-intent
   - amount, currency
   - Получаем client_secret
5. User вводит карту
6. stripe.confirmPayment()
7. Webhook от Stripe (payment_intent.succeeded)
8. Backend обновляет заказ
9. Redirect to /payment/success
10. User redirect to /confirm-challenge
```

**Environment Variables:**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
```

---

### 5. Paddle Payment

**Провайдер:** Paddle.js

**Alternative payment provider**

**Environment Variables:**
```bash
NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN=your_token
```

---

## Известные проблемы и баги

### 🔴 Критические проблемы

#### 1. Redux: addActivity теряет предыдущие данные

**Файл:** `/app/lib/features/activities/activitiesSlice.ts:22-27`

**Проблема:**
```typescript
addActivity: (state, action: PayloadAction<IActivity>) => {
  return {
    isLoaded: state.isLoaded,
    activities: [action.payload],  // ❌ Заменяет ВСЕ активности на одну!
  };
},
```

**Исправление:**
```typescript
addActivity: (state, action: PayloadAction<IActivity>) => {
  return {
    isLoaded: state.isLoaded,
    activities: [action.payload, ...state.activities],  // ✅ Добавляет в начало
  };
},
```

**Impact:** HIGH - пользователи теряют историю активностей при добавлении новой.

---

#### 2. Redux: serializableCheck отключен

**Файл:** `/app/lib/store.ts:32-34`

**Проблема:**
```typescript
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,  // ❌ Скрывает проблемы!
  }),
```

**Почему это плохо:**
- Скрывает несериализуемые данные в Redux (Date, функции, классы)
- Redux Persist может сломаться
- Сложно отлаживать проблемы

**Исправление:**
1. Найти все несериализуемые данные
2. Конвертировать Date → ISO string
3. Убрать функции/классы из state
4. Включить `serializableCheck` обратно

**Impact:** MEDIUM - потенциальные баги в production.

---

#### 3. Base URL захардкожен

**Файл:** `/app/lib/utils/instance.ts`

**Проблема:**
```typescript
const baseURL = "https://dev.myfinishline.io/back/api";  // ❌ Hardcoded!
```

**Исправление:**
```typescript
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://dev.myfinishline.io/back/api";
```

**Impact:** MEDIUM - невозможно переключаться между dev/staging/production.

---

### 🟡 Проблемы дизайна

#### 4. Дублирование Modal компонентов (3 варианта)

**Файлы:**
1. `/app/components/ui/modal/Modal.tsx`
2. `/app/components/Shared/CustomModal/CustomModal.tsx`
3. `/app/components/Application/AddActivityModal/AddActivityModal.tsx`

**Проблема:** Три разных реализации модальных окон с дублированием логики.

**Исправление:** Создать один унифицированный Modal компонент.

**Impact:** LOW - работает, но усложняет поддержку.

---

#### 5. Дублирование Leaderboard компонентов (2 варианта)

**Файлы:**
1. `/app/components/Application/Leaderboard/Leaderboard.tsx`
2. `/app/components/LeaderboardSwiper/LeaderboardSwiper.tsx`

**Проблема:** Две реализации лидерборда.

**Исправление:** Оставить одну или чётко разделить use cases.

**Impact:** LOW - работает, но усложняет поддержку.

---

#### 6. Дублирование Accordion компонентов

**Файлы:**
1. `/app/components/Faq/FaqAccordion/Accordion.tsx`
2. Возможно есть другие варианты

**Проблема:** Дублирование логики.

**Impact:** LOW

---

### 🟠 Проблемы архитектуры

#### 7. Большие файлы требуют рефакторинга

**HowItWorks.tsx - 1386 строк!**
- Файл: `/app/components/Landing/HowItWorks.tsx`
- Проблема: Слишком большой, сложно поддерживать
- Исправление: Разбить на 5 компонентов:
  - `HowItWorksContainer.tsx` (main)
  - `Card1ChooseQuest.tsx`
  - `Card2ConnectApps.tsx`
  - `Card3DiscoverContent.tsx`
  - `Card4ReceiveMedal.tsx`

**ProgressArrow.tsx - 476 строк**
- Файл: `/app/components/Shared/ProgressArrow/ProgressArrow.tsx`
- Проблема: Сложная логика в одном файле
- Исправление: Разбить на подкомпоненты

**Map.tsx - ~400 строк**
- Файл: `/app/components/Map/Map.tsx`
- Проблема: Много логики
- Исправление: Вынести логику в хуки

**Impact:** MEDIUM - усложняет разработку новых фич.

---

#### 8. Типизация: дублирование и any

**Проблема:**
- 8+ использований `any`
- 3+ `@ts-ignore`
- Дублирование: `IUser` vs `User` vs `IProfile`

**Исправление:**
1. Объединить дублированные типы
2. Убрать все `any` → строгие типы
3. Убрать `@ts-ignore` → исправить проблемы

**Impact:** LOW - TypeScript не ловит баги.

---

#### 9. reactStrictMode отключен

**Файл:** `/next.config.ts:4`

**Проблема:**
```typescript
{
  reactStrictMode: false,  // ⚠️ Отключен!
}
```

**Почему это плохо:**
- Не ловит potential проблемы (двойной рендер, deprecated API)
- React 19 требует Strict Mode для новых фич

**Исправление:**
```typescript
{
  reactStrictMode: true,  // ✅ Включить
}
```

**Impact:** LOW - но важно для будущего.

---

### 🟢 Визуальные проблемы

#### 10. Енот с фиолетовым кругом

**Файл:** `/public/images/card3-sage.png`

**Проблема:** На изображении енота есть фиолетовый круг фона.

**Исправление:** Заменить изображение на версию без круга.

**Impact:** LOW - визуальный дефект.

---

#### 11. hero.webp был неправильным (ИСПРАВЛЕНО ✅)

**Статус:** ✅ Исправлено 27.01.2026

**Проблема:** Изображение `hero.webp` было Kanban доской вместо карты Южной Америки.

**Исправление:** Заменено на `hero-map.png` с правильным изображением.

---

### ⚪ Отсутствующая инфраструктура

#### 12. Нет .env.example

**Статус:** ✅ Добавлено 27.01.2026

**Файл:** `/.env.local.example`

**Содержит:**
```bash
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Strava OAuth
NEXT_PUBLIC_STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret

# Fitbit OAuth
NEXT_PUBLIC_FITBIT_CLIENT_ID=23TW5R
FITBIT_CLIENT_SECRET=your_fitbit_client_secret

# Paddle
NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN=your_paddle_token
```

---

## История изменений из разговора

### 27.01.2026 - Сессия с Claude Code

#### Исправлено:

1. **CORS ошибка в login**
   - Проблема: Прямой запрос к бэкенду вызывал CORS ошибку
   - Решение: Использовать Next.js API Route `/api/auth/login` вместо прямого запроса
   - Файлы: `/app/(without-header)/login/page.tsx`, `/app/api/auth/login/route.ts`

2. **hero.webp - неправильное изображение**
   - Проблема: Изображение было Kanban доской
   - Решение: Заменено на `/images/hero-map.png` с картой Южной Америки
   - Файл: `/app/components/Landing/Hero.tsx`

3. **Создана документация .env.local.example**
   - Добавлен файл `.env.local.example` с примерами environment variables
   - Файл: `/.env.local.example`

#### Обнаружено проблем:

1. **Redux addActivity баг** - теряет предыдущие активности
2. **serializableCheck: false** - скрывает проблемы
3. **3 разных Modal компонента** - дублирование
4. **2 разных Leaderboard компонента** - дублирование
5. **HowItWorks.tsx - 1386 строк** - требует рефакторинга
6. **Енот с фиолетовым кругом** - требует замены изображения
7. **Hardcoded base URL** - должен быть в .env
8. **reactStrictMode: false** - должен быть включен

#### Добавлено:

1. **Документация PROJECT_KNOWLEDGE_BASE.md** (этот файл)
   - Полная база знаний проекта
   - Все проблемы и их решения
   - История изменений

---

## Рекомендации по развитию

### 🎯 Приоритет 1: Критические баги

1. **Исправить Redux addActivity** (1 час)
   ```typescript
   // app/lib/features/activities/activitiesSlice.ts:22-27
   addActivity: (state, action) => ({
     ...state,
     activities: [action.payload, ...state.activities],
   }),
   ```

2. **Включить serializableCheck и исправить ошибки** (4 часа)
   - Найти все несериализуемые данные
   - Конвертировать Date → ISO string
   - Убрать функции из state
   - Включить проверку обратно

3. **Вынести base URL в environment** (30 минут)
   ```typescript
   // app/lib/utils/instance.ts
   const baseURL = process.env.NEXT_PUBLIC_API_URL;
   ```

### 🎯 Приоритет 2: Улучшение архитектуры

4. **Рефакторинг HowItWorks.tsx** (8 часов)
   - Разбить на 5 компонентов
   - Выделить общую логику в хуки
   - Улучшить читаемость

5. **Унифицировать Modal компоненты** (4 часа)
   - Создать один базовый Modal
   - Мигрировать все использования
   - Удалить дублированные файлы

6. **Унифицировать Leaderboard** (3 часа)
   - Определить use cases
   - Оставить один вариант или чётко разделить
   - Убрать дублирование

### 🎯 Приоритет 3: Code Quality

7. **Улучшить типизацию** (6 часов)
   - Убрать все `any`
   - Убрать все `@ts-ignore`
   - Объединить дублированные типы
   - Добавить строгие типы

8. **Включить reactStrictMode** (2 часа)
   - Включить в next.config.ts
   - Исправить найденные проблемы
   - Протестировать приложение

9. **Рефакторинг больших компонентов** (12 часов)
   - ProgressArrow.tsx
   - Map.tsx
   - Другие файлы >300 строк

### 🎯 Приоритет 4: Визуальные улучшения

10. **Заменить изображение енота** (1 час)
    - Получить новую версию без круга
    - Заменить `/public/images/card3-sage.png`
    - Проверить на всех страницах

### 🎯 Приоритет 5: Инфраструктура

11. **Настроить CI/CD** (8 часов)
    - GitHub Actions
    - Автоматические тесты
    - Деплой на staging/production

12. **Добавить тесты** (40 часов)
    - Unit тесты для Redux
    - Component тесты для ключевых компонентов
    - E2E тесты для критических флоу

---

## Заключение

Проект MyFinishLine - это амбициозная платформа с хорошей архитектурной базой, но требующая серьёзного рефакторинга для масштабирования.

**Сильные стороны:**
- ✅ Современный стек (Next.js 16, React 19, TypeScript)
- ✅ Хорошая структура директорий
- ✅ Redux для состояния
- ✅ Интеграции с популярными фитнес-платформами
- ✅ Уникальный геймифицированный опыт

**Слабые стороны:**
- ❌ Критические баги в Redux
- ❌ Много дублированного кода
- ❌ Большие файлы (1386 строк)
- ❌ Проблемы с типизацией
- ❌ Отсутствие тестов

**Следующие шаги:**
1. Исправить критические баги (Приоритет 1)
2. Провести рефакторинг архитектуры (Приоритет 2)
3. Улучшить code quality (Приоритет 3)
4. Добавить тесты (Приоритет 5)

---

**Документ создан:** 2026-01-27
**Автор:** Claude Code (Tech Lead AI)
**Версия:** 1.0.0
