# Problems

1. Requests to `http://localhost:3001/api/auth/session` respond with a 500 error. Server logs show `GET /api/auth/session 500 in 1020ms [TypeError: Function.prototype.apply was called on #<Object>, which is an object and not a function]`
2. The app and routing work fine locally, but when deployed to Vercel, any login attempts get redirected to `https://trip-planner-basic.vercel.app/api/auth/error` despite having the `pages` option configured in `src/app/api/auth/[...nextauth]/route.js`

# Tasks

1. Analyze and make plans on how to fix the issues, saving the plans in this file for reference
2. Fix the first problem and let me test before continuing

# Plans
