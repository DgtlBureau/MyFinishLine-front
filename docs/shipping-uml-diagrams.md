# UML Диаграммы: Интеграция доставки DHL

## Содержание
1. [Sequence Diagram: Полный процесс покупки](#1-sequence-diagram-полный-процесс-покупки)
2. [Sequence Diagram: Redemption и отправка](#2-sequence-diagram-redemption-и-отправка)
3. [State Diagram: Жизненный цикл заказа](#3-state-diagram-жизненный-цикл-заказа)
4. [State Diagram: Статусы доставки](#4-state-diagram-статусы-доставки)
5. [Activity Diagram: Выбор региона и расчет цены](#5-activity-diagram-выбор-региона-и-расчет-цены)
6. [Activity Diagram: Полный E2E процесс](#6-activity-diagram-полный-e2e-процесс)
7. [Class Diagram: Модели данных](#7-class-diagram-модели-данных)

---

## 1. Sequence Diagram: Полный процесс покупки

```mermaid
sequenceDiagram
    autonumber

    participant U as User (Browser)
    participant F as Frontend (Next.js)
    participant API as API Routes
    participant B as Backend
    participant S as Stripe
    participant D as DHL API

    Note over U,D: ЭТАП 1: Загрузка страницы оплаты

    U->>F: Открыть /payment
    activate F
    F->>API: GET /api/payment/products
    API->>B: GET /stripe/products
    B-->>API: products[]
    API-->>F: products[]

    F->>API: GET /api/shipping/zones
    API->>B: GET /shipping/zones
    B-->>API: zones[]
    API-->>F: zones[]
    F-->>U: Render страницы
    deactivate F

    Note over U,D: ЭТАП 2: Выбор региона доставки

    U->>F: Выбрать страну "Germany"
    activate F
    F->>API: POST /api/shipping/rate<br/>{countryCode: "DE"}
    API->>B: Calculate rate

    opt Опционально: запрос к DHL
        B->>D: GET /express/rates
        D-->>B: rate details
    end

    B-->>API: {zone: "europe", price: 9.99, days: 5-10}
    API-->>F: shipping rate
    F-->>U: Обновить UI:<br/>Challenge: $49<br/>Shipping: $9.99<br/>Total: $58.99
    deactivate F

    Note over U,D: ЭТАП 3: Оформление заказа

    U->>F: Заполнить форму + Click "Pay"
    activate F
    F->>F: Валидация формы

    F->>API: POST /api/payment/order<br/>{stripe_price_id, shipping_zone_id,<br/>delivery_country, shipping_price}
    API->>B: POST /orders

    B->>B: Создать Order<br/>status: PENDING
    B->>B: Сохранить shipping данные

    B->>S: Create Checkout Session<br/>amount: $58.99
    S-->>B: checkout_url
    B-->>API: {payment_url}
    API-->>F: payment_url
    F-->>U: Redirect to Stripe
    deactivate F

    Note over U,D: ЭТАП 4: Оплата

    U->>S: Оплата картой
    activate S
    S->>S: Process payment
    S-->>U: Success page

    S->>B: Webhook: payment_intent.succeeded
    deactivate S

    activate B
    B->>B: Update Order<br/>status: PAID
    B->>B: Activate Challenge
    B->>U: Email: "Спасибо за покупку!"
    deactivate B

    U->>F: Redirect /payment/success
    F-->>U: "Начните свой челлендж!"
```

---

## 2. Sequence Diagram: Redemption и отправка

```mermaid
sequenceDiagram
    autonumber

    participant U as User
    participant F as Frontend
    participant API as API Routes
    participant B as Backend
    participant D as DHL API
    participant W as Warehouse
    participant E as Email Service

    Note over U,E: ЭТАП 1: Завершение челленджа

    B->>B: Challenge completed
    B->>E: Send notification
    E->>U: Email + Push:<br/>"Заберите медаль!"

    Note over U,E: ЭТАП 2: Redemption - ввод адреса

    U->>F: Открыть /redeem/{challengeId}
    F->>API: GET /api/user/challenge/{id}
    API->>B: Get challenge + shipping zone
    B-->>API: challenge data
    API-->>F: {challenge, paid_zone: "europe"}
    F-->>U: Render Redemption форма

    U->>F: Step 1: Personal Details<br/>+ выбор страны

    alt Страна НЕ в оплаченной зоне
        F->>F: Проверка зоны
        F-->>U: Warning: "Страна не входит<br/>в оплаченную зону Europe.<br/>Доплата: $5.00"

        U->>F: Согласиться на доплату
        F->>API: POST /api/payment/additional
        API->>S: Create Payment Intent ($5)
        S-->>API: client_secret
        API-->>F: payment form
        U->>S: Оплата доплаты
        S-->>F: Success
    end

    U->>F: Step 2: Address Details
    F->>API: POST /api/shipping/validate-address
    API->>D: Validate address
    D-->>API: {valid: true}
    API-->>F: Address OK

    U->>F: Step 3: Confirm + "Claim Medal"
    F->>API: POST /api/user/redeem-reward
    API->>B: Create RewardTicket
    B->>B: status: CREATED
    B-->>API: {ticket_id}
    API-->>F: Success
    F-->>U: "Медаль скоро будет отправлена!"

    Note over U,E: ЭТАП 3: Обработка на складе

    B->>W: New reward ticket
    activate W
    W->>W: Подготовка медали
    W->>B: Ready to ship
    deactivate W

    B->>B: status: IN_PROGRESS

    Note over U,E: ЭТАП 4: Создание отправления DHL

    B->>D: POST /express/shipments<br/>{sender, receiver, package}
    activate D
    D->>D: Create shipment
    D-->>B: {tracking_number,<br/>shipment_id, label_pdf}
    deactivate D

    B->>B: Save tracking_number<br/>status: ON_THE_WAY

    B->>E: Send shipping notification
    E->>U: Email: "Медаль отправлена!<br/>Tracking: XXXXXXXXXX"

    Note over U,E: ЭТАП 5: Отслеживание

    loop Каждый час (или webhook)
        B->>D: GET /track/shipments?trackingNumber=XXX
        D-->>B: {status, events[], location}

        alt Статус изменился
            B->>B: Update shipment status
            B->>E: Send status update
            E->>U: Push: "Статус обновлен"
        end
    end

    D-->>B: status: DELIVERED
    B->>B: status: RECEIVED
    B->>E: Final notification
    E->>U: "Медаль доставлена!"
```

---

## 3. State Diagram: Жизненный цикл заказа

```mermaid
stateDiagram-v2
    [*] --> PENDING: Пользователь начал оформление

    PENDING --> PAID: Stripe webhook:<br/>payment succeeded
    PENDING --> CANCELLED: Пользователь отменил /<br/>Timeout 30 min

    PAID --> ACTIVE: Челлендж активирован

    ACTIVE --> COMPLETED: Дистанция пройдена
    ACTIVE --> EXPIRED: Истек срок челленджа<br/>(если есть лимит)

    COMPLETED --> REDEEMED: Пользователь запросил<br/>награду (RewardTicket создан)
    COMPLETED --> REWARD_EXPIRED: 12 месяцев без redemption

    REDEEMED --> SHIPPED: Медаль отправлена
    SHIPPED --> DELIVERED: DHL подтвердил доставку

    CANCELLED --> [*]
    EXPIRED --> [*]
    REWARD_EXPIRED --> [*]
    DELIVERED --> [*]

    note right of PENDING
        Заказ создан,
        ожидает оплаты
    end note

    note right of PAID
        Оплата получена,
        shipping данные сохранены
    end note

    note right of ACTIVE
        Пользователь проходит
        челлендж (бег, ходьба)
    end note

    note right of COMPLETED
        Челлендж завершен,
        награда доступна
    end note

    note right of REDEEMED
        Адрес введен,
        готово к отправке
    end note
```

---

## 4. State Diagram: Статусы доставки (Shipment)

```mermaid
stateDiagram-v2
    [*] --> CREATED: RewardTicket создан

    CREATED --> IN_PROGRESS: Склад начал<br/>обработку

    IN_PROGRESS --> ON_THE_WAY: DHL shipment создан,<br/>tracking получен

    ON_THE_WAY --> IN_TRANSIT: Посылка в пути<br/>(DHL: transit)

    IN_TRANSIT --> OUT_FOR_DELIVERY: Передана курьеру<br/>(DHL: out_for_delivery)
    IN_TRANSIT --> AT_PICKUP_POINT: Прибыла в пункт<br/>выдачи
    IN_TRANSIT --> CUSTOMS_HOLD: Задержана на<br/>таможне

    CUSTOMS_HOLD --> IN_TRANSIT: Таможня пройдена
    CUSTOMS_HOLD --> RETURNED: Не прошла таможню

    OUT_FOR_DELIVERY --> DELIVERED: Доставлена<br/>(DHL: delivered)
    OUT_FOR_DELIVERY --> DELIVERY_FAILED: Не удалось<br/>доставить

    AT_PICKUP_POINT --> RECEIVED: Клиент забрал
    AT_PICKUP_POINT --> RETURNED: Не забрали<br/>в течение 14 дней

    DELIVERY_FAILED --> OUT_FOR_DELIVERY: Повторная попытка
    DELIVERY_FAILED --> AT_PICKUP_POINT: Перенаправлена<br/>в пункт выдачи
    DELIVERY_FAILED --> RETURNED: 3 неудачных попытки

    DELIVERED --> RECEIVED: Подтверждено

    RETURNED --> RESEND: Повторная отправка<br/>(новый адрес)
    RETURNED --> REFUNDED: Возврат средств

    RESEND --> ON_THE_WAY: Новый shipment

    RECEIVED --> [*]
    REFUNDED --> [*]

    state ON_THE_WAY {
        [*] --> Picked_Up
        Picked_Up --> Processing_Hub
        Processing_Hub --> In_Transit_To_Destination
        In_Transit_To_Destination --> Arrived_At_Destination
        Arrived_At_Destination --> [*]
    }
```

---

## 5. Activity Diagram: Выбор региона и расчет цены

```mermaid
flowchart TD
    A[Начало: Страница оплаты] --> B[Загрузить список зон доставки]
    B --> C[Показать dropdown стран]

    C --> D{Пользователь<br/>выбрал страну?}
    D -->|Нет| C
    D -->|Да| E[Получить код страны]

    E --> F{Страна в списке<br/>поддерживаемых?}

    F -->|Нет| G[Показать ошибку:<br/>'Доставка недоступна']
    G --> H{Связаться с<br/>поддержкой?}
    H -->|Да| I[Открыть форму<br/>обратной связи]
    H -->|Нет| C

    F -->|Да| J[Найти зону по стране]
    J --> K[Рассчитать стоимость:<br/>zone.basePrice]

    K --> L{Нужен точный<br/>расчет DHL?}

    L -->|Да| M[POST DHL /express/rates]
    M --> N{DHL доступен?}
    N -->|Да| O[Использовать цену DHL]
    N -->|Нет| P[Использовать<br/>базовую цену зоны]

    L -->|Нет| P

    O --> Q[Обновить UI]
    P --> Q

    Q --> R[Показать breakdown:<br/>- Challenge price<br/>- Shipping price<br/>- Total]

    R --> S[Показать срок доставки:<br/>zone.estimatedDays]

    S --> T{Применить<br/>промокод?}
    T -->|Да| U[Валидировать промокод]
    U --> V{Промокод<br/>валиден?}
    V -->|Да| W[Применить скидку]
    V -->|Нет| X[Показать ошибку]
    X --> T
    W --> Y[Пересчитать Total]
    Y --> Z[Обновить UI]

    T -->|Нет| AA[Готов к оплате]
    Z --> AA

    AA --> AB[Конец: Proceed to Pay]

    style A fill:#e1f5fe
    style AB fill:#c8e6c9
    style G fill:#ffcdd2
    style X fill:#ffcdd2
```

---

## 6. Activity Diagram: Полный E2E процесс

```mermaid
flowchart TD
    subgraph PURCHASE["ЭТАП 1: ПОКУПКА"]
        A[Пользователь на лендинге] --> B[Выбор челленджа]
        B --> C[Выбор страны доставки]
        C --> D[Расчет стоимости]
        D --> E[Заполнение формы]
        E --> F[Оплата Stripe]
        F --> G{Оплата<br/>успешна?}
        G -->|Нет| H[Показать ошибку]
        H --> F
        G -->|Да| I[Order: PAID]
    end

    subgraph CHALLENGE["ЭТАП 2: ЧЕЛЛЕНДЖ"]
        I --> J[Подключение Strava/Fitbit]
        J --> K[Прохождение челленджа]
        K --> L{Дистанция<br/>пройдена?}
        L -->|Нет| K
        L -->|Да| M[Challenge: COMPLETED]
    end

    subgraph REDEMPTION["ЭТАП 3: ПОЛУЧЕНИЕ НАГРАДЫ"]
        M --> N[Уведомление пользователю]
        N --> O[Открыть /redeem]
        O --> P[Step 1: Personal Details]
        P --> Q{Страна в<br/>оплаченной зоне?}
        Q -->|Нет| R[Предложить доплату]
        R --> S{Согласен?}
        S -->|Нет| T[Изменить страну]
        T --> Q
        S -->|Да| U[Доплата через Stripe]
        U --> V[Step 2: Address]
        Q -->|Да| V
        V --> W[Валидация адреса]
        W --> X{Адрес<br/>валиден?}
        X -->|Нет| Y[Показать ошибки]
        Y --> V
        X -->|Да| Z[Step 3: Confirmation]
        Z --> AA[Claim Medal]
        AA --> AB[RewardTicket: CREATED]
    end

    subgraph SHIPPING["ЭТАП 4: ДОСТАВКА"]
        AB --> AC[Обработка на складе]
        AC --> AD[Упаковка медали]
        AD --> AE[Создание DHL shipment]
        AE --> AF[Получение tracking]
        AF --> AG[Email с tracking]
        AG --> AH[Shipment: ON_THE_WAY]
        AH --> AI{Статус<br/>обновился?}
        AI -->|Да| AJ[Push уведомление]
        AJ --> AI
        AI -->|Delivered| AK[Shipment: DELIVERED]
        AK --> AL[Email: Медаль доставлена!]
        AL --> AM[Конец]
    end

    style A fill:#e3f2fd
    style AM fill:#c8e6c9
    style H fill:#ffcdd2
    style Y fill:#ffcdd2
```

---

## 7. Class Diagram: Модели данных

```mermaid
classDiagram
    class Order {
        +int id
        +int user_id
        +string stripe_payment_intent_id
        +string stripe_checkout_session_id
        +OrderStatus status
        +decimal total_amount
        +string currency
        +datetime created_at
        +datetime paid_at
    }

    class OrderItem {
        +int id
        +int order_id
        +int product_id
        +decimal price
        +int quantity
    }

    class ShippingInfo {
        +int id
        +int order_id
        +string zone_id
        +string delivery_country
        +decimal shipping_price
        +int estimated_days_min
        +int estimated_days_max
    }

    class ShippingZone {
        +string id
        +string name
        +string[] countries
        +decimal base_price
        +int min_days
        +int max_days
    }

    class User {
        +int id
        +string email
        +string first_name
        +string last_name
        +string phone
        +string country
    }

    class Challenge {
        +int id
        +int user_id
        +int product_id
        +ChallengeStatus status
        +decimal total_distance
        +decimal completed_distance
        +datetime started_at
        +datetime completed_at
    }

    class RewardTicket {
        +int id
        +int user_id
        +int challenge_id
        +int reward_id
        +ShipmentStatus status
        +string first_name
        +string last_name
        +string email
        +string phone
        +string country
        +string address
        +string city
        +string state
        +string zip_code
        +string dhl_tracking_number
        +string dhl_shipment_id
        +datetime created_at
        +datetime shipped_at
        +datetime delivered_at
    }

    class Reward {
        +int id
        +int challenge_id
        +string name
        +string description
        +string image_url
        +decimal weight_kg
        +json dimensions
    }

    class Product {
        +int id
        +string name
        +string description
        +Price[] prices
        +string stripe_product_id
    }

    class Price {
        +decimal amount
        +string currency
        +string stripe_price_id
    }

    class OrderStatus {
        <<enumeration>>
        PENDING
        PAID
        ACTIVE
        COMPLETED
        CANCELLED
        EXPIRED
    }

    class ChallengeStatus {
        <<enumeration>>
        ACTIVE
        COMPLETED
        EXPIRED
    }

    class ShipmentStatus {
        <<enumeration>>
        CREATED
        IN_PROGRESS
        ON_THE_WAY
        IN_TRANSIT
        OUT_FOR_DELIVERY
        AT_PICKUP_POINT
        DELIVERED
        RECEIVED
        RETURNED
        LOST
    }

    User "1" --> "*" Order : places
    Order "1" --> "*" OrderItem : contains
    Order "1" --> "1" ShippingInfo : has
    ShippingInfo "*" --> "1" ShippingZone : belongs to
    User "1" --> "*" Challenge : participates
    Challenge "*" --> "1" Product : based on
    Challenge "1" --> "0..1" RewardTicket : earns
    RewardTicket "*" --> "1" Reward : claims
    Product "1" --> "*" Price : has
    Product "1" --> "1" Reward : includes
```

---

## Визуализация диаграмм

### Онлайн инструменты:
1. **Mermaid Live Editor**: https://mermaid.live
2. **GitHub**: Автоматически рендерит Mermaid в .md файлах
3. **VS Code**: Расширение "Markdown Preview Mermaid Support"

### Как использовать:
1. Скопируйте код между тройными бэктиками (\`\`\`mermaid ... \`\`\`)
2. Вставьте в один из инструментов выше
3. Получите визуальную диаграмму

---

## Экспорт в другие форматы

### PlantUML версия (для сложных диаграмм):

```plantuml
@startuml Shipping_Sequence

title Sequence Diagram: Purchase with Shipping

actor User
participant "Frontend\n(Next.js)" as FE
participant "API Routes" as API
participant "Backend" as BE
database "Database" as DB
participant "Stripe" as Stripe
participant "DHL API" as DHL

== Page Load ==

User -> FE: Open /payment
activate FE
FE -> API: GET /api/payment/products
API -> BE: GET /stripe/products
BE --> API: products[]
API --> FE: products[]

FE -> API: GET /api/shipping/zones
API -> BE: GET /shipping/zones
BE --> API: zones[]
API --> FE: zones[]
FE --> User: Render page
deactivate FE

== Region Selection ==

User -> FE: Select country "Germany"
activate FE
FE -> API: POST /api/shipping/rate\n{countryCode: "DE"}
API -> BE: Calculate rate

opt Optional: DHL Query
    BE -> DHL: GET /express/rates
    DHL --> BE: rate details
end

BE --> API: {zone: "europe", price: 9.99}
API --> FE: shipping rate
FE --> User: Update UI\nTotal: $58.99
deactivate FE

== Checkout ==

User -> FE: Fill form + Click "Pay"
activate FE
FE -> API: POST /api/payment/order
API -> BE: POST /orders
BE -> DB: Create Order (PENDING)
BE -> DB: Save shipping data
BE -> Stripe: Create Checkout Session
Stripe --> BE: checkout_url
BE --> API: {payment_url}
API --> FE: payment_url
FE --> User: Redirect to Stripe
deactivate FE

== Payment ==

User -> Stripe: Complete payment
activate Stripe
Stripe --> User: Success
Stripe -> BE: Webhook: payment_intent.succeeded
deactivate Stripe

activate BE
BE -> DB: Update Order (PAID)
BE -> DB: Activate Challenge
BE -> User: Email confirmation
deactivate BE

User -> FE: Redirect /payment/success

@enduml
```

---

*Документ создан: 2026-01-27*
*Версия: 1.0*
