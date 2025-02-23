//react
import './wdyr'
import React from 'react'
import { render } from 'react-dom'
import { target, environment } from '~target'

//polyfills
import 'form-request-submit-polyfill'
import 'intersection-observer'

//redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { withLocalReducer } from '~data'
import localReducers from './local/reducers'

import Translate from '~modules/translate/component'
import Routes from '~routes'
import Document from './routes/_document'
import App from './routes/_app'
import Splash from './routes/_splash'

//init redux
const { store, persistor } = withLocalReducer(localReducers)

//render app
render(
	//!add other global components in co/screen/basic
		<Document>
				<Provider store={store}>
					<PersistGate loading={<Splash />} persistor={persistor}>
						<Translate loading={<Splash />}>
							<App>
								<Routes />
							</App>
						</Translate>
					</PersistGate>
				</Provider>
		</Document>,

	document.getElementById('react')
)

//load lazy scripts (ignored in firefox extension, prohibited)
if (!(target == 'extension' && environment.includes('firefox')))
	window.onload = ()=>
		window.requestAnimationFrame(()=>{
			for(const script of document.querySelectorAll('.lazy-script')){
				script.async = true
				script.src = script.getAttribute('data-src')
			}
		})