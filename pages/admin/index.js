import { useState } from "react";

export default function index({ data }) {
  function create() {
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
  }

  return (
    <button className="bg-red-200 foo" onClick={create}>
      create
    </button>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      data: "foo",
    }, // will be passed to the page component as props
  };
}
