const Gradients = {
	quepal: ['#4CB8C4', '#3CD3AD'],
	ultraviolet: ['#800080', '#ffc0cb'],
	flare: ['#6A9113', '#141517'],
	violet: ['#B24592', '#F15F79'],
	expresso: ['#00bf8f', '#001510'],
	witching: ['#c31432', '#240b36'],
	purelust: ['#333333', '#dd1818']
}

const Icons = {
	glass: 'glass',
	music: 'music',
	heart: 'heart',
	start: 'star',
	film: 'film',
	headphones: 'headphones',
	book: 'book',
	camera: 'camera',
	photo: 'photo',
	gift: 'gift',
	globe: 'globe',
	beer: 'beer',
	heartbeat: 'heartbeat'
}

const Global = {
	icons: Icons,
	gradients: Gradients
}

var Config = {
	standardHeight: 872.3809523809524, //640
	standardWidth: 411.42857142857144, //360
	deviceHeight: 0,
	deviceWidth: 0,
	deviceRatio : 1,
	relativeHeight: 0,
	relativeWidth: 0,
}

export { Config, Global }