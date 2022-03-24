import { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../admin-panel/components/Layout";
import Context from "../admin-panel/Context";
import ClusterActions from "../admin-panel/components/clusters/ClustersActions";
import Directory from "../admin-panel/components/Directory";
import "../styles/main.css";

const useLayoutProps = (pathname) => {
  if (pathname.includes("clusters")) {
    return {
      title: "ClustersXXX",
      actions: <ClusterActions />,
      aside: <Directory />,
    };
  }

  if (pathname.includes("media")) {
    return {
      title: "Media",
    };
  }

  if (pathname.includes("users")) {
    return {
      title: "Users",
    };
  }

  return {};
};

function LayoutContainer({ children }) {
  const { pathname } = useRouter();

  const props = useLayoutProps(pathname);

  if (pathname === "/" || pathname === "/domedb") {
    return <Fragment>{children}</Fragment>;
  }

  return <Layout {...props}>{children}</Layout>;
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
