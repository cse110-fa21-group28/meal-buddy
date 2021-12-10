# Meal Buddy
## Website: [meal-prep-web-app.web.app](https://meal-prep-web-app.web.app/)
## [Final Demo Vide](https://www.youtube.com/watch?v=Sy6tTA17hTA)

## Table of Contents
1. [Overview](#Overview)
2. [Developers](#Developers)

## Overview
**Meal Buddy** is a web application that allows users to maintain a feed explicitly for food recipes via Firebase. It allows users to create their own recipes and access many recipes through firebase's database.

- **Category:** Food, Entertainment
- **Mobile:** This app would be originally developed on the web, much like other recipe web applications (e.g., CookBook, etc). Meal Buddy is accessible from Chrome browser.
- **Story:** Food is a large part of human life. Our app will allow people to easily create, view, and track the calories of the food they eat daily. The app allows a range of users, from talented cooks to busy college students, to benefit from our web app based on their needs.
- **Market:** Anyone with a Google account can be the user of this app. Ability to create and view various recipes allows the users to organize and prepare their foods.
- **Habit:** This app can be used as often as the user would like, depending on when/how often they want to use recipes. The web app is designed to make it possible for the user to personalize and interact with their recipe app however they prefer.
- **Scope:** First we started with building the CRUD features to allow the users to interact with their own recipes on My Recipes Page, then we added more and more features to the Recipes Page and Home Page. We will update this repo as we make more improvements to the web app.

## Developers
To get to know our team more, please visit our [private planning repository](https://github.com/cse110-fa21-group28/cse110-fa21-group28), where we have documented our progress and planning along the way. Below you can view the team 28 members and become familiar with the structure of our project repo.

### Team Members (sorted alphabetically)
- Darren Cheng
- Farnia Nafarifard
- Fione Huynh
- Han Kim
- Mingyu Li
- Raymond Lu
- Thuc Nguyen
- Younghoon Kim

### Local Setup
1. Clone this repository
2. `npm ci` to install all dependencies (including firebase) of this project.
3. `sudo firebase login` to login firebase. Make sure you login with ucsd account.
4. `sudo firebase serve` to run locally.

### Workplace
- Everything we need to do is in the [public](https://github.com/cse110-fa21-group28/meal-buddy/tree/main/public) directory, the rest is the configuration files. Please look over [index.html](https://github.com/cse110-fa21-group28/meal-buddy/blob/main/public/index.html), this is the starting point of the app in this project. And here's a list of the main directories:
  + [public/assets](https://github.com/cse110-fa21-group28/meal-buddy/tree/main/public/assets)
  + [public/backend](https://github.com/cse110-fa21-group28/meal-buddy/tree/main/public/backend)
  + [public/src](https://github.com/cse110-fa21-group28/meal-buddy/tree/main/public/src)
- You can find README's in every directory to learn more about the content and the purpose of the dir.

### Pre-Implementation
- If you'd like to contribute or join the team, make sure you understand our [development practices](https://docs.google.com/document/d/1dFS2DS8PwIx1vWgwY4m3hb6lBa2rxWlP7e4EZS3B-WE/edit) and follow the guidelines there.

### Documentation
- Here is our [JSDoc documentation](https://cse110-fa21-group28.github.io/meal-buddy/) that specifies all the modules, classes, and methods we have used to built this web app so far.

Contact the team for any questions!
