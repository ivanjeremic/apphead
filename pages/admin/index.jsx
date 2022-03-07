import Layout from "../../components/Layout";
import Layout2 from "../../components/Layout2";

export default function index({ data }) {
  // handler
  const create = () => {
    const data = { username: "example" };
    fetch("/create", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return <Layout2 content={"none"} />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: "foo",
    }, // will be passed to the page component as props
  };
}
