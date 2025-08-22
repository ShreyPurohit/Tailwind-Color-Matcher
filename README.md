# Tailwind Color Matcher

A modern web app built with SvelteKit and TypeScript that helps designers and developers find the closest Tailwind CSS color to any hex color code. 
Perfect for ensuring design consistency and exploring Tailwind's color palette.

## 🚀 Why This Project?

Tailwind CSS provides a comprehensive color palette, but when working with custom colors, it can be challenging to find the closest match. 
This tool simplifies that process by:

- Extracting hex color codes from user input or pasted content.
- Validating the color format (e.g., `#FF5733` or `FF5733`).
- Displaying the closest matching Tailwind color.
- Offering a list of multiple close matches for exploration.

## 🛠️ Features

- **Hex Color Validation**: Ensures the entered color code is valid.
- **Tailwind Color Matching**: Finds the closest Tailwind CSS color.
- **Multiple Matches**: Displays a list of top matches for selection.
- **Clipboard Support**: Paste color codes directly into the input field.
- **Example Colors**: Try predefined color examples with a single click.

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/tailwind-color-matcher.git
cd tailwind-color-matcher
npm install
```

## ⚙️ Usage

To run the application locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/tailwind-color-matcher.git
   cd tailwind-color-matcher
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to start using the app.

## 🧪 How It Works

The app leverages SvelteKit's reactive features to:

1. **Input Binding**: The `ColorInput` component binds the input field to a `value` state, allowing two-way data binding.

2. **Color Validation**: The `extractHexColor` utility function validates the entered color code (e.g., `\#FF5733` or `FF5733`).

3. **Tailwind Color Matching**: The `findMultipleMatches` function finds the closest Tailwind CSS color based on the validated input.

4. **Dynamic Updates**: Reactive statements (`\$: ...`) automatically update the UI when the input changes, ensuring a seamless user experience.

## 🧑‍💻 Contributing

We welcome contributions to enhance this project. To get started:

1. Fork the repository.

2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them.

4. Push to your forked repository:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request with a clear description of your changes.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
