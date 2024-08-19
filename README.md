# AI Flashcards App

Welcome to the AI Flashcards App! This application allows you to effortlessly create flashcards by simply inputting your text. Our AI, powered by OpenAI, intelligently breaks down your text into concise, easy-to-study flashcards. Whether you're studying for exams or just trying to retain information, this app makes learning more efficient and effective.

## Features

- **AI-Powered Flashcard Generation**: Leverages OpenAI's advanced text completion models to convert your text into useful flashcards.
- **Easy Text Input**: Just type or paste your text, and let our AI handle the rest.
- **Cross-Platform Access**: Study your flashcards anytime, anywhere, on any device.
- **User Authentication**: Secure sign-up and sign-in using Clerk.
- **Subscription Plans**: Manage your subscription through Stripe.

## Tech Stack

### 1. Next.js
Next.js is a React framework that enables functionality such as server-side rendering and static site generation. It was used to build the frontend of this app, ensuring fast performance and SEO-friendly pages.

### 2. OpenAI Completion API
The OpenAI Completion API powers the AI that generates flashcards from user input. By analyzing and breaking down text, it creates concise and informative flashcards that help users retain information more effectively.

### 3. Vercel
Vercel is the deployment platform for the app, providing continuous deployment and easy scalability. With Vercel, the app is always available, fast, and secure.

### 4. Stripe
Stripe handles the payment processing for subscription plans. It offers a secure and reliable way to manage transactions, ensuring that users can easily subscribe to the app's services.

### 5. Clerk
Clerk is used for authentication and user management. It simplifies the process of adding user accounts, sign-ups, and sign-ins, while ensuring security and scalability.

### 6. Firebase
Firebase is utilized for real-time database management and storage. It powers the backend of the app, allowing seamless data storage, retrieval, and synchronization across users and devices.

## Getting Started

### Prerequisites
- Node.js
- Yarn or npm

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ai-flashcards-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ai-flashcards-app
    ```
3. Install the dependencies:
    ```bash
    yarn install
    # or
    npm install
    ```

### Running the App

1. Create a `.env.local` file in the root of your project and add the following environment variables:
    ```env
    NEXT_PUBLIC_CLERK_FRONTEND_API=<Your Clerk Frontend API>
    FIREBASE_API_KEY=<Your Firebase API Key>
    FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
    FIREBASE_PROJECT_ID=<Your Firebase Project ID>
    STRIPE_PUBLIC_KEY=<Your Stripe Public Key>
    NEXT_PUBLIC_OPENAI_API_KEY=<Your OpenAI API Key>
    ```

2. Start the development server:
    ```bash
    yarn dev
    # or
    npm run dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

This app is deployed using Vercel. To deploy your own instance:

1. Push your code to GitHub or another Git provider.
2. Sign in to [Vercel](https://ai-generated-flashcards.vercel.app/) and import your repository.
3. Set up the environment variables in Vercel's dashboard.
4. Deploy your app with a single click.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Enjoy creating and studying with your AI-generated flashcards!
