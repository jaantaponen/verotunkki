import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Frontpage } from "../src/components/Frontpage"
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";


test('renders frontpage', () => {
    const component = render(
        <BrowserRouter >
            <Frontpage />
        </BrowserRouter>
    )
    expect(component.container).toHaveTextContent(
        'VEROTUNKKI'
    )
    const component2 = render(
        <MemoryRouter initialEntries={['/broken']}>
            <Frontpage />
        </MemoryRouter>
    )
    expect(component2.container).toHaveTextContent(
        'VEROTUNKKI'
    )
    const cryptoButtons = component.getAllByText(
        'Virtuaalivaluutat'
    )
    expect(cryptoButtons).toBeDefined()
    const SecuritiesButtons = component.getAllByText(
        'Arvopaperit'
    )
    expect(SecuritiesButtons).toBeDefined()
})

test('Copyright is visible', () => {
    const component = render(
        <BrowserRouter >
            <Frontpage />
        </BrowserRouter>
    )
    expect(component.container).toHaveTextContent(
        'Oleta, että tämän sivuston tekijät eivät tiedä mitään veroista.'
    )
})