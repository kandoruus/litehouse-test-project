# Anime Media Viewer

A simple web app that displays anime media using the Kitsu API. This project demonstrates use of Web Components with TypeScript and modern frontend practices.

## Setup Instructions

1. **Clone the repository:**

```bash
   git clone https://github.com/kandoruus/litehouse-test-project.git
   cd litehouse-test-project
```

2. **Install dependencies:**

```bash
   npm install
```

3. **Run the development server:**

```bash
   npm run dev
```

4. **View in browser:**

Navigate to `http://localhost:3000` or the port indicated in your terminal.

5. **Alternatively, view the live build**

Navigate to `https://kandoruus.github.io/litehouse-test-project/`

## Design Decisions

- **Web Components:** Used to create encapsulated and reusable UI components (`MediaCard`, `MediaCardList`, `MediaModal`).
- **TypeScript:** Ensures type safety and better developer experience.
- **Shadow DOM:** Used in components for style and DOM encapsulation.
- **Single Source of Truth:** A lightweight global `AppState` singleton manages pagination and data fetching.
- **Deviation from Requirements** I made the decision to use 12 items per page instead of 10. 12 items per page work better for responsive design, since it breaks evenly into 1, 2, 3, or 4 columns. This can be easily adjusted back to 10 by changing the value of the CARDS_PER_PAGE constant in src/app/utils/constants.ts file.
- **Mobile and Desktop Friendly** Application uses a Modal to expand on the description section on large screen sizes, but in mobile view with a single column, the card's height is expanded instead.
- **Preloading Data for Smoother User Experience** When the App is initialized, API calls are made to fetch the data for the Next and Last pages immediately after the First page renders. When navigating the App, preloading occurs after each new page is loaded to ensure the data for the First, Prev, Next, and Last pages is available. This way each new page can load without requiring the user to wait on API calls.

## Features Implemented

- Fetches data from the Kitsu API
- Displays 12 anime media cards per page.
- Reusable Web Components: `MediaCard`, `MediaCardList`, `MediaModal`
- Pagination with `PaginationControlBar`
- Fully typed with TypeScript
- Responsive design and clean CSS styling
- Unit Test for the MediaCard Component
- Tested accessibility via `https://wave.webaim.org/` with 0 Errors or Alerts. However, with so many of the App's semantic elements nested in the Shadow DOM of various custom components, I think
  the tool may not be getting the full picture.

## With More Time

- Add unit tests for remaining components, the App only has 8% coverage per the vitest coverage tester. I did achieve 100% coverage for the MediaCard component.
- Add error handling for API requests.
- Support offline caching of results.
- The description text styling currently feels very generic, I would work on making it stand out more.
- Clean up the AppState by better separating concerns. For instance, potentially moving the "goToPage" methods to a separate AppController.
