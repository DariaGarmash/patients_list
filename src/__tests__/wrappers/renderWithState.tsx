import React from 'react'
import { PropsWithChildren, ReactElement } from "react"
import { RenderOptions, render } from '@testing-library/react'
import { AppContextProvider, TAppContext } from "../../context/AppContext"

type TExtendedRenderOptions = Omit<RenderOptions, 'wrapper'> & {
    state: TAppContext
}

const providerWrapper = ({ children }: PropsWithChildren<{}>) => {
    return <AppContextProvider>{children}</AppContextProvider>
}

export const renderWithState = (
    ui: ReactElement,
    options?: TExtendedRenderOptions,
) => render(ui, { wrapper: providerWrapper, ...options })