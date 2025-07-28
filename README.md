# NextJS - Product Showcase

---

### **Live Demo & Repository**

* **Live Demo (Vercel):** `[BURAYA VERCEL LİNKİNİZİ YAPIŞTIRIN]`
* **GitHub Repository:** `[BURAYA GITHUB REPO LİNKİNİZİ YAPIŞTIRIN]`

---

## ✨ Features

* **Server-Side Rendering (SSR):** Product listing and detail pages are rendered on the server for optimal performance and SEO.
* **Advanced Filtering & Sorting:** Users can search, sort by price/rating, and filter products by category and price range.
* **Persistent Global State:** User preferences and cart contents are saved across sessions:
    * **Shopping Cart:** Add, remove, and adjust item quantities.
    * **Dark/Light Theme:** A sleek, custom-built dark mode.
    * **Filter Settings:** All search, sort, and filter choices are remembered.
* **Protected Routes:** A `middleware` guards the `/checkout` and `/admin` routes, redirecting unauthenticated or unauthorized users.
* **Custom Animations:** The UI is enhanced with subtle, performant animations, including staggered loading for product cards and interactive micro-animations on buttons.
* **Robust Fallbacks:** Custom, polished pages for `loading` states (skeletons), `404 Not Found` errors, and application-level errors (`error.tsx`).
* **Unit Tested:** Core business logic within the cart state is verified with Jest unit tests.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 15 (App Router)
* **UI Library:** React 19
* **Styling:** Tailwind CSS v4 (with custom CSS in `globals.css` for theming and animations)
* **Global State:** Zustand
* **Language:** TypeScript
* **Testing:** Jest

---

## 🚀 Getting Started

To run this project locally, follow these steps:

**1. Clone the repository:**
```bash
git clone [BURAYA GITHUB REPO LİNKİNİZİ YAPIŞTIRIN]
```

**2. Navigate to the project directory:**
```bash
cd [REPO-ADINIZ]
```

**3. Install dependencies:**
```bash
npm install
```

**4. Run the development server:**
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

**5. Run tests:**
To run the unit tests for the application, use the following command:
```bash
npm test
```

---

## 🧠 Global State Management: Zustand

For global state management, I chose **Zustand** over other options like Context API or Redux.

The primary reason for this choice was its **simplicity and minimal boilerplate**. Zustand allows for the creation of centralized, hook-based stores with very little setup, making the codebase cleaner and more maintainable. Its performance is excellent, as it re-renders components only when the specific state they subscribe to changes.
