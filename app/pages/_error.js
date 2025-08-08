import Head from "next/head";

function ErrorPage({ statusCode }) {
  return (
    <>
      <Head>
        <title>
          {statusCode
            ? `${statusCode} Error - Locate My City`
            : "Error - Locate My City"}
        </title>
      </Head>
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>{statusCode ? `Error ${statusCode}` : "An error occurred"}</h1>
        <p>
          {statusCode
            ? "Sorry, something went wrong."
            : "An unexpected error has occurred."}
        </p>
      </main>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
