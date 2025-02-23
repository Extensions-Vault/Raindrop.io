import React from 'react'
import { target } from '~target'
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom'

import Protected from './_protected'
import NotFound from './notFound'

import Default from './default'
import Add from './add'
import Extension from './extension'

const Router = target == 'web' ? BrowserRouter : HashRouter

export default function Pages() {
    return (
        <Router>
            <Routes>
                <Route index element={<Default />} />

                <Route path='extension'>{Extension()}</Route>

                <Route element={<Protected redirect />}>
                    <Route path='add' element={<Add />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}