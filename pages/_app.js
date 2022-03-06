import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-green-500">
      <Component {...pageProps} />
    </div>
  );
}
