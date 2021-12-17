import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Frontpage } from "../src/components/Frontpage"
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { PreviewData } from "../src/components/PreviewData";


const originalWarn = console.error.bind(console.error)
beforeAll(() => {
  console.error = (msg) => 
    !msg.toString().includes('forwardRef render functions') && originalWarn(msg)
})
afterAll(() => {
  console.error = originalWarn
})

describe("compontents render", () => {
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

    test('renders Securities', () => {
        const component = render(
            <BrowserRouter >
                <PreviewData mode="SECURITY" />
            </BrowserRouter>
        )
        expect(component.container).toHaveTextContent(
            'VEROTUNKKI'
        )
        const supportedText = component.getByText(
            'Tuetut lähteet: Nordnet, Degiro'
        )
        expect(supportedText).toBeDefined()
        expect(component.container).toHaveTextContent('Tarkista tiedot aina itse virheiden varalta.')
    })

    test('renders Crypto', () => {
        const component = render(
            <BrowserRouter >
                <PreviewData mode="CRYPTO" />
            </BrowserRouter>
        )
        expect(component.container).toHaveTextContent(
            'VEROTUNKKI'
        )
        const supportedText = component.getByText(
            'Tuetut lähteet: Coinbase, Coinbase Pro'
        )
        expect(supportedText).toBeDefined()
        expect(component.container).toHaveTextContent('Tarkista tiedot aina itse virheiden varalta.')
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

})


