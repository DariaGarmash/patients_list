import React, { ComponentProps, ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "./components/states/ErrorState";
import { Outlet } from "react-router-dom";
import Logout from "./pages/Logout";

const App = ({ children }: PropsWithChildren): JSX.Element => {
	return (
		<section className="app-wrapper">
			<header className="app-header">
				<div className="container">
					<nav></nav>
					<Logout />
				</div>
			</header>
			<main className="app-content container">
				<ErrorBoundary FallbackComponent={ErrorState}>
					{children ?? <Outlet />}
				</ErrorBoundary>
			</main>
		</section>
	);
};

export default App;