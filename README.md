# Evently 📅

Evently is a modern, full-stack web application designed for managing events and reservations within various organizations (training centers, companies, associations, coworking spaces). It simplifies event lifecycle management while ensuring security, role-based access control, and a seamless user experience.

---

## 🚀 Built With

### Backend
*   **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
*   **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
*   **Security**: [Passport.js](https://www.passportjs.org/), [JWT](https://jwt.io/), and [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
*   **Utilities**: [PDFKit](https://pdfkit.org/) for ticket generation, [class-validator](https://github.com/typestack/class-validator) for DTO validation

### Frontend
*   **Framework**: [Next.js](https://nextjs.org/) (TypeScript, App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **API Client**: [Axios](https://axios-http.com/)

### Infrastructure & DevOps
*   **Containerization**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
*   **CI/CD**: GitHub Actions

---

## ✨ Key Features

- **Event Management**: Create, update, publish, and cancel events with ease.
- **Public Catalog**: Browse upcoming events with real-time capacity and availability tracking.
- **Reservation System**: Secure booking flow with status lifecycle management.
- **Automated Ticketing**: Generate PDF tickets/confirmations for confirmed reservations.
- **RBAC (Role-Based Access Control)**:
    - **Admin**: Full control over events, reservations, and system settings.
    - **Participant**: Search events and manage personal reservations.
- **Modular Architecture**: Clean, scalable codebase following industry best practices.

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/install/)

### Quick Start (Docker - Recommended)
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/dounia-elg/Evently.git
    cd Evently
    ```
2.  **Set up environment variables**:
    ```bash
    cp .env.example .env
    ```
3.  **Spin up the entire stack**:
    ```bash
    docker-compose up --build
    ```
    *   Frontend: [http://localhost:3002](http://localhost:3002)
    *   Backend API: [http://localhost:3003/api](http://localhost:3003/api)

### Manual Development Setup
#### Backend
```bash
cd backend
npm install
npm run start:dev
```
#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test      # Unit tests
npm run test:e2e  # E2E tests

# Linting
npm run lint
```

---

## 🔒 Security & Quality
- **Data Integrity**: Strict input validation using `class-validator`.
- **Protected Routes**: Middleware and Guards ensure only authorized users access sensitive endpoints.
- **Clean Code**: Consistent formatting with Prettier and ESLint.
- **Environment Safety**: Configuration management via `@nestjs/config`.

---

## 📄 License
This project is [UNLICENSED](LICENSE).
