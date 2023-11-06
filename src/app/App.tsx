import { routes } from "../routes/config";
import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "./components/states/ErrorState";

const App = (): JSX.Element => {
    return (
		<section className="app-wrapper">
			<main>
				<ErrorBoundary FallbackComponent={ErrorState}>
					{routes}
				</ErrorBoundary>
			</main>
			<footer></footer>
		</section>
	);
};

export default App;