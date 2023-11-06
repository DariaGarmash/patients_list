import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "./components/states/ErrorState";
import { Outlet } from "react-router-dom";

const App = (): JSX.Element => {
    return (
		<section className="app-wrapper">
			<main>
				<ErrorBoundary FallbackComponent={ErrorState}>
					<Outlet />
				</ErrorBoundary>
			</main>
			<footer></footer>
		</section>
	);
};

export default App;