import { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../admin-panel/components/Layout";
import Context from "../admin-panel/Context";
import "../styles/main.css";

function LayoutContainer({ children }) {
  const { pathname } = useRouter();

  if (pathname === "/" || pathname === "/domedb") {
    return <Fragment>{children}</Fragment>;
  }

  return <Layout>{children}</Layout>;
}

function MyApp({ Component, pageProps }) {
  return (
    <Context>
      <LayoutContainer>
        <Component {...pageProps} />
      </LayoutContainer>
    </Context>
  );
}

export default MyApp;
