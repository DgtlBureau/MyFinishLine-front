const https = require('https');
const fs = require('fs');
const path = require('path');

const diagrams = {
  // 1. Sequence Diagram: Purchase Flow
  'sequence-purchase': `sequenceDiagram
    autonumber
    participant U as User
    participant F as Frontend
    participant API as API Routes
    participant B as Backend
    participant S as Stripe

    Note over U,S: ЭТАП 1: Загрузка страницы
    U->>F: Открыть /payment
    F->>API: GET /api/payment/products
    API->>B: GET /stripe/products
    B-->>API: products[]
    API-->>F: products[]
    F->>API: GET /api/shipping/zones
    API-->>F: zones[]
    F-->>U: Render страницы

    Note over U,S: ЭТАП 2: Выбор региона
    U->>F: Выбрать страну Germany
    F->>API: POST /api/shipping/rate
    API->>B: Calculate rate
    B-->>API: zone europe price 9.99
    API-->>F: shipping rate
    F-->>U: Total 58.99

    Note over U,S: ЭТАП 3: Оплата
    U->>F: Click Pay
    F->>API: POST /api/payment/order
    API->>B: Create order
    B->>S: Create Checkout Session
    S-->>B: checkout_url
    B-->>API: payment_url
    F-->>U: Redirect to Stripe
    U->>S: Complete payment
    S->>B: Webhook payment succeeded
    B->>B: Update Order PAID`,

  // 2. Sequence Diagram: Redemption Flow
  'sequence-redemption': `sequenceDiagram
    autonumber
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as DHL API
    participant E as Email

    Note over U,E: ЭТАП 1: Завершение челленджа
    B->>E: Challenge completed
    E->>U: Email Заберите медаль

    Note over U,E: ЭТАП 2: Ввод адреса
    U->>F: Открыть /redeem
    F->>B: GET challenge data
    B-->>F: challenge + paid zone
    U->>F: Enter address
    F->>B: Validate address
    B-->>F: Address OK
    U->>F: Claim Medal
    F->>B: Create RewardTicket
    B-->>F: ticket created

    Note over U,E: ЭТАП 3: Отправка DHL
    B->>D: POST /shipments
    D-->>B: tracking number
    B->>E: Send notification
    E->>U: Медаль отправлена

    Note over U,E: ЭТАП 4: Tracking
    loop Every hour
        B->>D: GET /track
        D-->>B: status update
        B->>U: Push notification
    end
    D-->>B: DELIVERED
    E->>U: Медаль доставлена`,

  // 3. State Diagram: Order Lifecycle
  'state-order': `stateDiagram-v2
    [*] --> PENDING: Пользователь начал оформление
    PENDING --> PAID: payment succeeded
    PENDING --> CANCELLED: Отменен
    PAID --> ACTIVE: Челлендж активирован
    ACTIVE --> COMPLETED: Дистанция пройдена
    ACTIVE --> EXPIRED: Истек срок
    COMPLETED --> REDEEMED: Награда запрошена
    COMPLETED --> REWARD_EXPIRED: 12 месяцев без redemption
    REDEEMED --> SHIPPED: Медаль отправлена
    SHIPPED --> DELIVERED: DHL подтвердил
    CANCELLED --> [*]
    EXPIRED --> [*]
    REWARD_EXPIRED --> [*]
    DELIVERED --> [*]`,

  // 4. State Diagram: Shipment Status
  'state-shipment': `stateDiagram-v2
    [*] --> CREATED: RewardTicket создан
    CREATED --> IN_PROGRESS: Склад обрабатывает
    IN_PROGRESS --> ON_THE_WAY: DHL shipment создан
    ON_THE_WAY --> IN_TRANSIT: В пути
    IN_TRANSIT --> OUT_FOR_DELIVERY: У курьера
    IN_TRANSIT --> AT_PICKUP_POINT: В пункте выдачи
    IN_TRANSIT --> CUSTOMS_HOLD: На таможне
    CUSTOMS_HOLD --> IN_TRANSIT: Таможня пройдена
    CUSTOMS_HOLD --> RETURNED: Не прошла
    OUT_FOR_DELIVERY --> DELIVERED: Доставлено
    OUT_FOR_DELIVERY --> DELIVERY_FAILED: Не доставлено
    AT_PICKUP_POINT --> RECEIVED: Клиент забрал
    AT_PICKUP_POINT --> RETURNED: Не забрали
    DELIVERY_FAILED --> RETURNED: 3 попытки
    DELIVERED --> RECEIVED: Подтверждено
    RETURNED --> RESEND: Повторная отправка
    RETURNED --> REFUNDED: Возврат
    RESEND --> ON_THE_WAY: Новый shipment
    RECEIVED --> [*]
    REFUNDED --> [*]`,

  // 5. Activity Diagram: Region Selection
  'activity-region': `flowchart TD
    A[Страница оплаты] --> B[Загрузить зоны доставки]
    B --> C[Показать dropdown стран]
    C --> D{Пользователь выбрал страну?}
    D -->|Нет| C
    D -->|Да| E[Получить код страны]
    E --> F{Страна поддерживается?}
    F -->|Нет| G[Ошибка: Доставка недоступна]
    G --> C
    F -->|Да| H[Найти зону]
    H --> I[Рассчитать стоимость]
    I --> J[Обновить UI]
    J --> K[Показать Total]
    K --> L{Промокод?}
    L -->|Да| M[Применить скидку]
    M --> N[Пересчитать]
    N --> O[Готов к оплате]
    L -->|Нет| O`,

  // 6. Activity Diagram: E2E Flow
  'activity-e2e': `flowchart TD
    subgraph PURCHASE[ПОКУПКА]
        A[Лендинг] --> B[Выбор челленджа]
        B --> C[Выбор страны доставки]
        C --> D[Расчет стоимости]
        D --> E[Оплата Stripe]
        E --> F{Успех?}
        F -->|Нет| E
        F -->|Да| G[Order PAID]
    end
    subgraph CHALLENGE[ЧЕЛЛЕНДЖ]
        G --> H[Подключение Strava]
        H --> I[Прохождение]
        I --> J{Завершен?}
        J -->|Нет| I
        J -->|Да| K[COMPLETED]
    end
    subgraph REDEMPTION[НАГРАДА]
        K --> L[Уведомление]
        L --> M[Ввод адреса]
        M --> N{Зона совпадает?}
        N -->|Нет| O[Доплата]
        O --> P[Адрес]
        N -->|Да| P
        P --> Q[Claim Medal]
        Q --> R[Ticket CREATED]
    end
    subgraph SHIPPING[ДОСТАВКА]
        R --> S[Обработка склад]
        S --> T[DHL shipment]
        T --> U[Tracking]
        U --> V[DELIVERED]
    end`,

  // 7. Class Diagram: Data Models
  'class-models': `classDiagram
    class Order {
        +int id
        +int user_id
        +string stripe_session_id
        +OrderStatus status
        +decimal total_amount
        +datetime created_at
        +datetime paid_at
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
    }
    class Challenge {
        +int id
        +int user_id
        +ChallengeStatus status
        +decimal total_distance
        +decimal completed_distance
    }
    class RewardTicket {
        +int id
        +int challenge_id
        +ShipmentStatus status
        +string address
        +string dhl_tracking_number
        +datetime shipped_at
    }
    User --> Order : places
    Order --> ShippingInfo : has
    ShippingInfo --> ShippingZone : belongs to
    User --> Challenge : participates
    Challenge --> RewardTicket : earns`
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }
    }).on('error', reject);
  });
}

async function generateDiagram(name, code) {
  // Encode diagram to base64
  const encoded = Buffer.from(code).toString('base64');
  const url = `https://mermaid.ink/img/${encoded}?type=png&bgColor=white`;

  const filepath = path.join(__dirname, 'diagrams', `${name}.png`);

  console.log(`Generating ${name}.png...`);

  try {
    await downloadImage(url, filepath);
    console.log(`  ✓ Created ${filepath}`);
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
  }
}

async function main() {
  console.log('Generating UML diagrams as PNG...\n');

  for (const [name, code] of Object.entries(diagrams)) {
    await generateDiagram(name, code);
  }

  console.log('\nDone! Check docs/diagrams/ folder.');
}

main();
