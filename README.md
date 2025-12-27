# Serverless Employee Management API

## 🚀 Project Overview
A cloud-native CRUD application for managing employees, built with **Node.js 18**, **TypeScript**, and **Serverless Framework**. The architecture follows **Clean Architecture** and **SOLID** principles to ensure maintainability and testability.

## 🛠 Tech Stack
- **Compute:** AWS Lambda
- **API:** AWS API Gateway
- **Database:** Amazon DynamoDB
- **Validation:** Zod
- **Testing:** Jest

## 🏗 Key Decisions
- **Clean Architecture:** Decoupled business logic (Use Cases) from Infrastructure (DynamoDB) and Presentation (Handlers).
- **Native UUID:** Used Node's `crypto.randomUUID()` to reduce external dependencies and avoid Jest ESM conflicts.
- **Dynamic Updates:** Implemented a generic `UpdateExpression` in the repository to allow partial updates without overwriting unchanged fields.

## 🚦 How to Run
1. **Install dependencies:** `npm install`
2. **Run Tests:** `npm test`
3. **Deploy to AWS:** `npx serverless deploy`

## 🔗 Endpoints
- **POST** `/employees` - Create employee
- **GET** `/employees/{id}` - Get details
- **PUT** `/employees/{id}` - Update fields
- **DELETE** `/employees/{id}` - Remove employee