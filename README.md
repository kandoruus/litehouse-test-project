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

4. **Build the project:**

```bash
   npm run build
```

5. **View in browser:**

Navigate to `http://localhost:3000` or the port indicated in your terminal.

6. **Alternatively, view the live build**

Navigate to `https://kandoruus.github.io/litehouse-test-project/`

## Design Decisions

- **Web Components:** Used to create encapsulated and reusable UI components (`MediaCard`, `MediaCardList`, `MediaModal`).
- **TypeScript:** Ensures type safety and better developer experience.
- **Shadow DOM:** Used in components for style and DOM encapsulation.
- **Single Source of Truth:** A lightweight global `AppState` singleton manages pagination and data fetching.
- **Deviation from Requirements** I made the decision to use 12 items per page instead of 10 because that number works better for responsive design since it breaks evenly into 1, 2, 3, or 4 columns. This can be easily adjusted back to 10 by changing the value of the CARDS_PER_PAGE constant in src/app/utils/constants.ts file.

## With More Time

- Add **unit tests** (e.g. with Vitest or Jest) for components.
- Add **loading states** and **error handling** for API requests.
- Support offline caching of results.

## Features Implemented

- Fetches data from the Kitsu API
- Displays 12 anime media cards per page.
- Reusable Web Components: `MediaCard`, `MediaCardList`, `MediaModal`
- Pagination with `PaginationControlBar`
- Fully typed with TypeScript
- Responsive and clean CSS styling

## Questions or Comments?

If you run into issues or have feedback, feel free to reach out to me at: [t.caleb.newell@gmail.com](mailto:t.caleb.newell@gmail.com)
