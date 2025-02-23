import en_US from '~assets/languages/en.json'
import { getLanguage } from '~target'

function normalizeLangCode(_lang='') {
	const lang = String(_lang).toLowerCase()

	if (lang == 'zh-cn' || lang.includes('hans'))
		return 'zh-Hans'
	else if (lang.startsWith('zh'))
		return 'zh-Hant'

	return lang.substr(0,2)
}

const Translate = {
	fallback: en_US,
	strings: {},
	currentLang: '',
	loaded: false,

	s: (key)=>{
		return Translate.strings[key] || Translate.fallback[key] || key || ''
	},

	has: (key)=>{
		if (Translate.strings[key] || Translate.fallback[key])
			return true
		return false
	},

	format: function(key) {
		var formatted = Translate.s(key)
		for( var arg in arguments ) {
			if (arg>0)
				formatted = formatted.replace('{' + (arg-1) + '}', arguments[arg])
		}
		return formatted
	},

	init: async (browserLang='')=>{
		if (Translate.loaded && Translate.currentLang == browserLang)
			return;

		if (!browserLang)
			browserLang = getLanguage()

		Translate.currentLang = normalizeLangCode(browserLang)

		switch (Translate.currentLang) {
			//Reset to default
			default:
				Translate.currentLang = 'en'
				Translate.strings = Translate.fallback
			break;
		}

		Translate.changeState(true)
	},

	changeState: (state)=>{
		Translate.loaded = state
	}
}

export default Translate