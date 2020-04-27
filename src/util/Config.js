import { Themes } from "./Theme"

var Config = {
	standardHeight: 872.3809523809524, //640
	standardWidth: 411.42857142857144, //360
	deviceHeight: 0,
	deviceWidth: 0,
	deviceRatio : 1,
	relativeHeight: 0,
	relativeWidth: 0,
	theme: 'dark'
}

var Theme = Themes[Config.theme]

const ChangeTheme = (theme) =>{
	Config.theme = theme
	Theme = Themes[Config.theme]
}

export { Config, Theme, ChangeTheme }