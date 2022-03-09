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

  return <h1>Dashboard</h1>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: "foo",
    }, // will be passed to the page component as props
  };
}
