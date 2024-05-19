import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error("WOW ERROR IS ----- " + error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-100">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
        <p className="text-red-800">Sorry, an unexpected error has occurred.</p>
        <p className="italic text-red-600">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
}
