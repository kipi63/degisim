import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import { Section } from "../Section";
export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <Section>
      <p>Error ! Page not found</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="btn">
        Home
      </Link>
    </Section>
  );
};
