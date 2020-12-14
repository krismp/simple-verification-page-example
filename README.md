# Simple pin verification

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). A small application that allows users to input 6-digit codes as a part of user verification flow.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User can manually enter the digits and paste the code from clipboard
- Only one digit is allowed per input, entering a digit should automatically focus the browser on the next input if any are left
- After entering the code and clicking submit, the application should send a POST request to the server and handle success/error response
- If the request results in an error, display “Verification Error” message on the page
- If the request is successful, redirect the user to /success route.
- Server rules are simple: if received code is not 6 digits long OR the last digit is 7, return an error. Otherwise, treat the request as success