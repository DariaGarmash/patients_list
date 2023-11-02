import { routes } from "../routes/config";

const App = (): JSX.Element => {
    return (
		<section className="app-wrapper">
			<main>
				{routes}
			</main>
			<footer></footer>
		</section>
	);
};

export default App;