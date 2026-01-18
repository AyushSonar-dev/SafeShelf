# Warranty Card Manager
## Overview

Warranty Card Manager is a SaaS web application that helps users store, manage, and track product warranties in one place.
It removes the hassle of handling physical warranty cards and missing expiry dates by offering a secure, centralized dashboard.

## Why This Product

Warranty cards get lost or damaged

Expiry dates are easy to forget

No single platform to manage multiple product warranties

Manual tracking is inefficient

Warranty Card Manager solves this with a simple, digital-first approach.

## Core Features

Secure user authentication

Add and manage warranty records

Track warranty expiry dates

Automated email notifications

Minimal and distraction-free UI

SaaS-ready architecture

## Tech Stack

Frontend: Next.js

Backend: Node.js

Authentication: Better Auth

Server Actions / Background Jobs: Inngest

Email Service: Nodemailer

Database: MongoDB

## Environment Setup

This project uses environment variables for configuration.

Create a .env file using .env.example as reference:

NODE_ENV=development

NEXT_PUBLIC_API_URL=http://localhost:3000

DATABASE_URL=your_mongodb_connection_string_here

BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

GEMINI_API_KEY=your_gemini_api_key_here

NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_email_app_password_here




## Getting Started
git clone https://github.com/AyushSonar-dev/<repo-name>.git
cd <repo-name>
npm install
npm run dev

## Product Vision

The goal is to build a lightweight SaaS that:

Scales with users

Supports reminders and notifications

Works seamlessly across devices

Can evolve into a subscription-based product



## Author

Ayush Sonar
GitHub: https://github.com/AyushSonar-dev
