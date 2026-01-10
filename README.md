# MergeMaterial 🧩

> **Tinder for project ideas.** Find your next coding obsession. Or just scroll.

MergeMaterial is a web app designed to cure developer's block. It presents a daily-refreshed stream of unique, complex coding project ideas in a swipeable, Tinder-style interface.

## ✨ Features

- **🔥 Daily Fresh Ideas**: Project ideas are generated daily using **Google's Gemini 1.5 Flash API**.
- **👆 Swipe Interface**: Intuitive card-based interface. Swipe **Right** to Like (save), **Left** to Dislike (skip).
- **💾 Local Persistence**: Your liked projects and progress are saved automatically to your browser's local storage. No account needed.
- **📱 Responsive**: Works great on both desktop and mobile devices.

## 🛠️ Tech Stack

Built with the latest web technologies:

- **Framework:** [Svelte 5](https://svelte.dev/) (Runes) & [SvelteKit](https://kit.svelte.dev/)
- **Runtime:** [Bun](https://bun.sh/)
- **AI:** Google Gemini API
- **Deployment:** Github Pages

## 🚀 Getting Started

### Prerequisites

You need to have **[Bun](https://bun.sh/)** installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mergematerial.git
   cd mergematerial
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

### 🤖 Generating Projects (Optional)

The projects are statically stored in `src/lib/projects.json`. To regenerate them using AI:

1. Get a [Gemini API Key](https://aistudio.google.com/app/apikey).
2. Set your environment variable:
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```
3. Run the generation script:
   ```bash
   bun run scripts/generate.ts
   ```

## 🔄 Automated Updates

This repository is configured to use **GitHub Actions** to run the generation script daily at midnight. It fetches new ideas from Gemini, updates `projects.json`, and commits the changes back to the repo automatically.

## 📝 TODO / Roadmap

- [ ] Improve card swipe physics and add transition effects for a smoother feel.
- [ ] logging for likes/dislikes to better understand user preferences using github issues maybe?
- [ ] Allow users to export their liked projects list as JSON or Markdown.
- [ ] Add ability to filter ideas by tech stack or difficulty.
- [ ] Progressive web app maybe?

## 🤝 Contributing

Pull requests are welcome! If you have ideas for better prompts or UI improvements, feel free to fork and submit a PR.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

_Made with ❤️ and too much caffeine._
